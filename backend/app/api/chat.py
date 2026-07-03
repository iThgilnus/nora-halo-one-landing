from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest
from app.services.rag_service import chat_stream_generator, sse_format
from app.core.config import settings

router = APIRouter(prefix="/chat", tags=["chat"])

@router.get("/init")
def get_chat_init():
    return {
        "welcome_message": "Xin chào Sen! 🐾 Mình là Trợ lý ảo của NORA. Mình có thể giúp Sen tìm hiểu thông tin sản phẩm, cách huấn luyện mèo dùng máy hay các thông số kỹ thuật của NORA Halo One. Sen cần hỗ trợ gì hôm nay ạ?",
        "suggestions": [
            "Halo One có chống kẹt an toàn không?",
            "Bao lâu cần dọn khay chứa chất thải?"
        ]
    }

@router.post("")
async def chat_endpoint(req: ChatRequest):
    if not settings.OPENAI_API_KEY:
        def err_generator():
            yield sse_format("token", {"text": "Chào bạn! API Key của OpenAI chưa được cấu hình ở backend."})
            yield sse_format("done", {})
        return StreamingResponse(err_generator(), media_type="text/event-stream")

    message_text = req.message.strip()
    
    return StreamingResponse(
        chat_stream_generator(message_text, req.history),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        }
    )
