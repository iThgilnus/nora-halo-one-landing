import { NextResponse } from "next/server";

export async function GET() {
  const fastapiUrl = process.env.FASTAPI_URL || "http://127.0.0.1:8001/chat";
  // Replace trailing /chat with /chat/init to dynamically match ports
  const initUrl = fastapiUrl.replace(/\/chat$/, "/chat/init");

  try {
    const response = await fetch(initUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("Failed to proxy chat init request to FastAPI:", err);
    return NextResponse.json({
      welcome_message: "Xin chào Sen! Mình là Trợ lý ảo của NORA. Hệ thống AI đang gặp lỗi kết nối với máy chủ backend. Sen có thể điền thông tin vào biểu mẫu bên dưới để nhận tư vấn trực tiếp nhé! 🐾",
      suggestions: []
    });
  }
}
