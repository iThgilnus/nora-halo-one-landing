import os
import re
import json
import warnings
import sys
from openai import OpenAI
from app.core.config import settings
from app.schemas.chat import ChatMessage
from app.services.lead_service import save_lead
from typing import List

# Tắt cảnh báo Deprecation từ langchain
warnings.filterwarnings(
    "ignore",
    message="`langchain-community` is being sunset.*",
    category=DeprecationWarning,
)
warnings.filterwarnings(
    "ignore",
    message="`langchain-experimental` is being sunset.*",
    category=DeprecationWarning,
)

# Cấu hình encoding UTF-8 cho stdout/stderr
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

openai_client = None
if settings.OPENAI_API_KEY:
    openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)

_vector_store = None

def get_vector_store():
    global _vector_store
    if _vector_store is not None:
        return _vector_store
        
    if not settings.OPENAI_API_KEY:
        return None
        
    try:
        from langchain_community.vectorstores import Chroma
        from langchain_openai import OpenAIEmbeddings
        
        embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small",
            openai_api_key=settings.OPENAI_API_KEY
        )
        
        # Đường dẫn thư mục lưu trữ ChromaDB: backend/chroma_db
        app_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        persist_dir = os.path.join(app_dir, "chroma_db")
        
        _vector_store = Chroma(
            collection_name="nora_kb",
            embedding_function=embeddings,
            persist_directory=persist_dir,
            collection_metadata={"hnsw:space": "cosine"}
        )
        return _vector_store
    except Exception as e:
        print(f"LỖI: Khởi tạo ChromaDB client thất bại: {e}")
        return None

def sse_format(event_type: str, data: dict) -> str:
    json_data = json.dumps(data, ensure_ascii=False)
    return f"event: {event_type}\ndata: {json_data}\n\n"

def extract_lead_info_via_llm(message_text: str) -> tuple[str, str]:
    """
    Sử dụng LLM để trích xuất Họ tên và Số điện thoại từ tin nhắn của khách hàng.
    Trả về (họ_tên, số_điện_thoại). Nếu không tìm thấy tên, trả về "Khách hàng từ Chatbot".
    """
    global openai_client
    if not openai_client:
        return "Khách hàng từ Chatbot", None

    prompt = (
        "Bạn là trợ lý trích xuất thông tin khách hàng chuyên nghiệp từ hội thoại.\n"
        "Nhiệm vụ của bạn là đọc tin nhắn dưới đây và trích xuất ra đúng 2 thông tin:\n"
        "1. Họ tên khách hàng (Làm sạch các tiền tố xưng hô như 'anh', 'chị', 'chú', 'bác', chỉ lấy họ tên thực tế, ví dụ 'Nguyễn Văn A' hoặc 'Hải'). Nếu không có tên cụ thể, ghi là 'Khách hàng từ Chatbot'.\n"
        "2. Số điện thoại liên hệ (Chỉ lấy chuỗi số liên tục, loại bỏ khoảng trắng/dấu chấm/dấu gạch ngang, định dạng 10 chữ số).\n\n"
        "Trả về kết quả dưới dạng JSON duy nhất có dạng:\n"
        "{\"name\": \"...\", \"phone\": \"...\"}\n"
        "KHÔNG viết thêm bất kỳ từ ngữ nào ngoài JSON.\n\n"
        f"Tin nhắn: \"{message_text}\""
    )

    try:
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            response_format={"type": "json_object"}
        )
        data = json.loads(response.choices[0].message.content)
        name = data.get("name", "Khách hàng từ Chatbot").strip()
        phone = data.get("phone", "").strip()
        return name, phone
    except Exception as e:
        print(f"Lỗi trích xuất thông tin bằng LLM: {e}")
        return "Khách hàng từ Chatbot", None

async def chat_stream_generator(message_text: str, history: List[ChatMessage]):
    global openai_client
    
    # 1. Kiểm tra số điện thoại (Auto-capture Lead)
    # Loại bỏ dấu chấm, khoảng trắng, gạch ngang để nhận diện sđt chính xác hơn
    clean_phone_text = re.sub(r"[\s\.\-\(\)]", "", message_text)
    phone_match = re.search(r"(0[1-9][0-9]{8})", clean_phone_text)
    if phone_match:
        # Sử dụng LLM trích xuất thông tin cực kỳ thông minh
        name, phone = extract_lead_info_via_llm(message_text)
        if not phone:
            phone = phone_match.group(1)
            
        save_lead(name, phone, message_text)
        
        thank_you_text = f"🎉 Tuyệt vời quá Sen ơi! NORA đã ghi nhận thông tin đăng ký tư vấn của Sen (Họ tên: {name}, SĐT: {phone}). Đội ngũ tư vấn của NORA sẽ liên hệ hỗ trợ Sen ngay trong ít phút nhé! 🐾"
        yield sse_format("token", {"text": thank_you_text})
        yield sse_format("done", {})
        return

    # 2. Xử lý RAG bằng ChromaDB
    context_text = ""
    vs = get_vector_store()
    
    # Tự động viết lại truy vấn nếu là câu hỏi nối tiếp cuộc hội thoại (Follow-up)
    search_query = message_text
    follow_up_markers = ["thì sao", "thế nào", "còn", "vậy", "được không", "có được", "như thế nào"]
    is_follow_up = any(marker in message_text.lower() for marker in follow_up_markers)
    if is_follow_up and history:
        # Tìm câu hỏi gần nhất của User để làm ngữ cảnh tìm kiếm
        last_user_msg = next((msg.content for msg in reversed(history) if msg.role == "user"), None)
        if last_user_msg:
            clipped_prev = " ".join(last_user_msg.split())[:200]
            search_query = f"{clipped_prev} {message_text}"

    if vs and openai_client:
        try:
            print(f"[RAG debug] Search Query (Original: '{message_text}'): '{search_query}'")
            results = vs.similarity_search_with_relevance_scores(search_query, k=8)
            print(f"[RAG debug] Search results:")
            for doc, score in results:
                print(f"  - Score: {score:.4f} | Title: {doc.metadata.get('title')} | Snippet: {doc.page_content[:100].replace(chr(10), ' ')}...")
            
            relevance_threshold = 0.30
            relevant_results = [
                (doc, score) for doc, score in results 
                if score >= relevance_threshold
            ]
            print(f"[RAG debug] Relevant results (threshold={relevance_threshold}): {len(relevant_results)}")
            
            if relevant_results:
                context_text = "\n\n".join([
                    f"[Nguồn: {doc.metadata.get('title', 'Tài liệu')} (Trang {doc.metadata.get('page', 1)}, Độ tin cậy: {score:.4f})]\n{doc.page_content}"
                    for doc, score in relevant_results
                ])
        except Exception as err:
            print(f"ChromaDB similarity search failed in stream: {err}")

    # 3. Prompt hệ thống
    system_prompt = f"""Bạn là Trợ lý ảo NORA, tư vấn về sản phẩm NORA Halo One (Hộp vệ sinh mèo thông minh tự động cao cấp).
Nhiệm vụ của bạn là đọc kỹ TÀI LIỆU NGỮ CẢNH dưới đây để trả lời câu hỏi của khách hàng một cách lịch sự, chính xác và trung thực bằng Tiếng Việt.

CÁC QUY TẮC BẮT BUỘC (GUARDRAILS):
1. ĐỐI VỚI CÂU HỎI VỀ SẢN PHẨM / KỸ THUẬT / CHÍNH SÁCH:
   - Bạn chỉ được trả lời dựa trên TÀI LIỆU NGỮ CẢNH được cung cấp. Tuyệt đối không tự bịa ra chính sách hoặc đưa vào thông tin ngoài tài liệu.
   - Bạn ĐƯỢC PHÉP và NÊN áp dụng suy luận logic trực tiếp và so sánh toán học cơ bản từ các số liệu có sẵn trong tài liệu (như so sánh giá trị lớn hơn/nhỏ hơn, kiểm tra dải phạm vi, tần suất) để đưa ra câu trả lời khẳng định/phủ định hoặc cảnh báo tương thích khi các thông số do khách hàng cung cấp nằm ngoài dải thông số kỹ thuật được mô tả.
   - Bạn CHỈ sử dụng nguyên văn câu từ chối mặc định dưới đây khi câu hỏi đề cập đến các chủ đề hoàn toàn không xuất hiện từ khóa hoặc không liên quan tới ngữ cảnh (ví dụ: yêu cầu viết mã lập trình, hỏi về sản phẩm đối thủ, chủ đề xã hội ngoài lề...):
     "NORA xin lỗi Sen, hiện tại sản phẩm NORA Halo One chưa có thông tin hoặc chưa hỗ trợ tính năng này. Sen vui lòng để lại thông tin ở biểu mẫu bên dưới website để nhân viên kỹ thuật liên hệ giải đáp chi tiết hơn nhé! 🐾"
2. ĐỐI VỚI CHÀO HỎI / XÃ GIAO / CẢM ƠN (GREETINGS/SMALL TALK): Bạn hãy trả lời một cách tự nhiên, thân thiện và nhiệt tình (ví dụ chào lại khách hàng, cảm ơn khách hàng) và chủ động hướng dẫn họ đặt câu hỏi tìm hiểu về máy vệ sinh NORA Halo One. Tuyệt đối KHÔNG sử dụng câu từ chối ở quy tắc số 1 cho các câu chào hỏi xã giao này.
3. ĐỐI VỚI YÊU CẦU LIÊN HỆ / ĐỂ LẠI THÔNG TIN: Nếu khách hàng có ý định muốn được liên hệ, gọi lại tư vấn, hoặc hỏi cần để lại thông tin gì, hãy lịch sự hướng dẫn họ điền Họ tên, Số điện thoại và mô tả yêu cầu hỗ trợ vào biểu mẫu liên hệ bên dưới cửa sổ chat, hoặc gõ trực tiếp Số điện thoại của họ ngay tại ô chat này để nhân viên NORA gọi lại hỗ trợ sớm nhất.
4. KHÔNG ĐƯỢC TỰ BỊA ra các thông số kỹ thuật, nguồn tham chiếu, chính sách bảo hành, hoặc các chương trình khuyến mãi không ghi trong tài liệu ngữ cảnh.
5. HỆ THỐNG LÀ READ-ONLY ASSISTANT. Bạn chỉ có nhiệm vụ tra cứu và giải thích. Tuyệt đối không tự ý quyết định hoặc hứa hẹn thay đổi các điều khoản bảo hành, đổi trả khác với chính sách chính thức đã được ghi.
6. CẤM TUYỆT ĐỐI VIẾT CODE: Tuyệt đối KHÔNG viết bất kỳ đoạn mã lập trình (Python, JS, SQL...) hay mã giả nào kể cả dưới dạng ví dụ. Hãy từ chối bằng mẫu tin nhắn ở quy tắc số 1 nếu bị yêu cầu.

TÀI LIỆU NGỮ CẢNH:
{context_text or "Không tìm thấy tài liệu chính sách nào liên quan."}"""

    # 4. Gọi OpenAI Chat Completion
    if not openai_client:
        yield sse_format("token", {"text": "Chào bạn! OpenAI API Key chưa được thiết lập."})
        yield sse_format("done", {})
        return

    try:
        messages = [{"role": "system", "content": system_prompt}]
        for msg in history[-6:]:
            role = "assistant" if msg.role == "assistant" else "user"
            messages.append({"role": role, "content": msg.content})
            
        messages.append({"role": "user", "content": message_text})

        stream = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            stream=True,
            max_completion_tokens=800,
            temperature=0.4
        )

        for chunk in stream:
            if not chunk.choices:
                continue
            token = chunk.choices[0].delta.content
            if token:
                yield sse_format("token", {"text": token})
                
        yield sse_format("done", {})
        
    except Exception as chat_err:
        print(f"OpenAI Chat Completion streaming failed: {chat_err}")
        yield sse_format("token", {"text": "Xin lỗi Sen, NORA đang gặp lỗi kết nối với OpenAI."})
        yield sse_format("done", {})
