import os
import sys
import shutil
import warnings
from dotenv import load_dotenv

# Tắt các cảnh báo Deprecation phiền hà
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

# Cấu hình encoding UTF-8 hiển thị tiếng Việt trên terminal
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from langchain_community.document_loaders import PyPDFLoader
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# 1. Tải các cấu hình biến môi trường từ thư mục dự án gốc (nếu chưa có sẵn)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env_paths = [
        os.path.join(BASE_DIR, ".env.local"),
        os.path.join(BASE_DIR, ".env")
    ]
    for path in env_paths:
        if os.path.exists(path):
            load_dotenv(dotenv_path=path)
            print(f"Đang đọc cấu hình từ file: {os.path.basename(path)}")
            break

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    print("LỖI: Chưa định nghĩa OPENAI_API_KEY trong biến môi trường hoặc file .env!")
    sys.exit(1)

def seed_database():
    pdf_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "knowledge-base.pdf")
    if not os.path.exists(pdf_path):
        print(f"LỖI: Không tìm thấy file PDF tài liệu tại {pdf_path}")
        print("Vui lòng đặt file PDF giới thiệu sản phẩm của bạn tại đường dẫn đó trước.")
        sys.exit(1)

    print("--- BẮT ĐẦU QUÁ TRÌNH NẠP DỮ LIỆU PDF (SEMANTIC CHROMADB SEED) ---")
    
    # 2. Đọc file PDF
    print("Đang đọc file PDF...")
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()
    print(f"Đã đọc {len(docs)} trang từ file PDF.")

    # 3. Phân cắt văn bản theo ngữ nghĩa (Semantic Chunker)
    print("Đang phân cắt tài liệu bằng Semantic Chunker...")
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small", 
        openai_api_key=OPENAI_API_KEY
    )
    text_splitter = SemanticChunker(
        embeddings=embeddings, 
        breakpoint_threshold_type="percentile",
        breakpoint_threshold_amount=85.0
    )
    chunks = text_splitter.split_documents(docs)
    print(f"Đã phân cắt thành {len(chunks)} đoạn tài liệu có nghĩa hội tụ.")

    # Thêm tiêu đề động vào metadata của từng chunk để dễ nhận diện nguồn khi RAG hiển thị
    for i, chunk in enumerate(chunks):
        content = chunk.page_content.strip()
        words = content.split()
        title = " ".join(words[:8]) + "..." if len(words) > 8 else content
        page_num = chunk.metadata.get("page", 0) + 1
        chunk.metadata["title"] = f"Tài liệu Trang {page_num}: {title}"
        chunk.metadata["page"] = page_num
        print(f"- Đã xử lý metadata cho đoạn {i+1}/{len(chunks)}: {title[:40]}")

    # 4. Khởi tạo và nạp dữ liệu vào ChromaDB
    print("Đang kết nối và chuẩn bị ChromaDB...")
    persist_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chroma_db")
    
    # Xóa dữ liệu cũ bên trong chroma_db mà không xóa chính Docker volume mount point.
    os.makedirs(persist_dir, exist_ok=True)
    print("Đang dọn dẹp cơ sở dữ liệu ChromaDB cũ...")
    for item_name in os.listdir(persist_dir):
        item_path = os.path.join(persist_dir, item_name)
        if os.path.isdir(item_path) and not os.path.islink(item_path):
            shutil.rmtree(item_path)
        else:
            os.remove(item_path)
        
    print("Đang sinh vector embeddings và nạp các đoạn văn bản vào ChromaDB (Quá trình này có thể mất vài giây)...")
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name="nora_kb",
        persist_directory=persist_dir,
        collection_metadata={"hnsw:space": "cosine"}
    )
    
    try:
        if hasattr(vector_store, "persist"):
            vector_store.persist()
            print("Đã xác nhận lưu dữ liệu ChromaDB xuống ổ đĩa.")
    except Exception as persist_err:
        print(f"Lưu đĩa tự động đã hoàn tất (bỏ qua lệnh gọi thủ công): {persist_err}")

    print("\n🎉 HOÀN TẤT: Đã phân đoạn ngữ nghĩa và nạp toàn bộ dữ liệu vector thành công vào ChromaDB!")

if __name__ == "__main__":
    seed_database()
