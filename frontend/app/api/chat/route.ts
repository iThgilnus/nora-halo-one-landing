import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const fastapiUrl = process.env.FASTAPI_URL || "http://127.0.0.1:8001/chat";

  // Forward payload to FastAPI server with Streaming response
  try {
    const response = await fetch(fastapiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    // Pipe the response body stream directly back to the client!
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no", // prevents Nginx caching the stream
      },
    });
  } catch (err) {
    console.error("Failed to proxy chat request to FastAPI:", err);
    // Return a mock SSE stream for fallback so client parser doesn't break!
    const fallbackText = "Chào Sen! Trợ lý ảo NORA đang gặp sự cố kết nối tới bộ não AI ở backend. Sen vui lòng gửi thông tin đăng ký tư vấn trực tiếp ở biểu mẫu phía dưới nhé! 🐾";
    const sseFallback = `event: token\ndata: {"text": "${fallbackText}"}\n\nevent: done\ndata: {}\n\n`;
    
    return new Response(sseFallback, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  }
}
