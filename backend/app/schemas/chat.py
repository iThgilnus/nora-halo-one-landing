from pydantic import BaseModel, Field
from typing import List

class ChatMessage(BaseModel):
    role: str = Field(description="Role: user hoặc assistant")
    content: str = Field(description="Nội dung tin nhắn")

class ChatRequest(BaseModel):
    message: str = Field(description="Câu hỏi hiện tại của người dùng")
    history: List[ChatMessage] = Field(default=[], description="Lịch sử hội thoại")
