"use client";

import { useState, useEffect, useRef, FormEvent, useCallback, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Trash2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import styles from "./Chatbot.module.scss";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const renderMessageContent = (content: string) => {
  if (!content) return null;
  // Loại bỏ hoàn toàn các biểu tượng cảm xúc để giữ tin nhắn sạch sẽ
  const clean = content.replace(/(🐾|🎉|😿)/g, "").trim();

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const lines = clean.split("\n");
  const parsedLines = lines.map((line) => {
    if (line.trim() === "") {
      return '<div style="height: 6px;"></div>';
    }

    let text = escapeHtml(line);

    // Parse Bold: **text** -> <strong>text</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Parse list item starting with bullet: • or - or *
    const bulletMatch = text.match(/^(\s*)(•|-|\*)\s+(.*)/);
    if (bulletMatch) {
      return `<li style="margin-left: 12px; list-style-type: disc; margin-bottom: 4px;">${bulletMatch[3]}</li>`;
    }

    // Parse list item starting with number: e.g. 1.
    const numMatch = text.match(/^(\s*)(\d+)\.\s+(.*)/);
    if (numMatch) {
      return `<li style="margin-left: 12px; list-style-type: decimal; margin-bottom: 4px;">${numMatch[3]}</li>`;
    }

    return `<p style="margin-bottom: 6px; line-height: 1.5;">${text}</p>`;
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: parsedLines.join("") }}
      style={{ wordBreak: "break-word" }}
    />
  );
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    const messageList = scrollRef.current;
    if (!messageList) return;

    messageList.scrollTop = messageList.scrollHeight;
  }, []);

  const syncMobileViewport = useCallback(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    const viewport = window.visualViewport;
    const viewportHeight = viewport?.height ?? window.innerHeight;
    const viewportOffsetTop = viewport?.offsetTop ?? 0;
    const keyboardInset = Math.max(0, window.innerHeight - viewportHeight - viewportOffsetTop);

    container.style.setProperty("--chat-viewport-height", `${viewportHeight}px`);
    container.style.setProperty("--chat-viewport-offset-top", `${viewportOffsetTop}px`);
    container.style.setProperty("--chat-keyboard-inset", `${keyboardInset}px`);
  }, []);

  const shouldAutoFocus = useCallback(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches;
  }, []);

  const focusInput = useCallback(() => {
    const textarea = inputRef.current;
    if (!textarea || textarea.disabled) return;

    textarea.focus({ preventScroll: true });
    const cursorPosition = textarea.value.length;
    textarea.setSelectionRange(cursorPosition, cursorPosition);
  }, []);

  const resizeInput = useCallback(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = `${nextHeight}px`;
  }, []);

  // 1. Khôi phục lịch sử chat từ sessionStorage và tải cấu hình từ backend
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("nora-chat-messages");
    
    fetch("/api/chat/init")
      .then((res) => res.json())
      .then((data) => {
        const welcomeText = data.welcome_message || "Xin chào Sen! 🐾 Mình là Trợ lý ảo của NORA. Mình có thể giúp Sen tìm hiểu thông tin sản phẩm, cách huấn luyện mèo dùng máy hay các thông số kỹ thuật của NORA Halo One. Sen cần hỗ trợ gì hôm nay ạ?";
        setSuggestions(data.suggestions || []);
        
        if (savedMessages) {
          try {
            setMessages(JSON.parse(savedMessages));
          } catch {
            setMessages([{ role: "assistant", content: welcomeText }]);
          }
        } else {
          setMessages([{ role: "assistant", content: welcomeText }]);
        }
      })
      .catch((err) => {
        console.error("Failed to initialize chatbot configuration:", err);
        const fallbackText = "Xin chào Sen! Mình là Trợ lý ảo của NORA. Kết nối với hệ thống tư vấn đang gặp lỗi, Sen vui lòng thử lại sau nhé! 🐾";
        setSuggestions([]);
        if (savedMessages) {
          try {
            setMessages(JSON.parse(savedMessages));
          } catch {
            setMessages([{ role: "assistant", content: fallbackText }]);
          }
        } else {
          setMessages([{ role: "assistant", content: fallbackText }]);
        }
      });
  }, []);

  // 2. Lưu lịch sử chat vào sessionStorage khi có thay đổi
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("nora-chat-messages", JSON.stringify(messages));
    }
  }, [messages]);

  // 3. Tự động cuộn xuống cuối khung chat khi có tin nhắn mới
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // 4. Focus vào input khi mở khung chat
  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    const handleViewportChange = () => {
      syncMobileViewport();
      window.requestAnimationFrame(scrollToBottom);
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.visualViewport?.addEventListener("resize", handleViewportChange);
    window.visualViewport?.addEventListener("scroll", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.visualViewport?.removeEventListener("resize", handleViewportChange);
      window.visualViewport?.removeEventListener("scroll", handleViewportChange);
    };
  }, [isOpen, scrollToBottom, syncMobileViewport]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (!isMobile) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => {
      syncMobileViewport();
      resizeInput();
      if (shouldAutoFocus()) {
        focusInput();
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusInput, isOpen, resizeInput, shouldAutoFocus, syncMobileViewport]);

  // 5. Tự động mở rộng chiều cao textarea khi câu dài
  useLayoutEffect(() => {
    resizeInput();
    scrollToBottom();
  }, [input, isOpen, resizeInput, scrollToBottom]);

  const settleInputViewport = () => {
    syncMobileViewport();
    window.requestAnimationFrame(() => {
      syncMobileViewport();
      scrollToBottom();
    });

    window.setTimeout(() => {
      syncMobileViewport();
      scrollToBottom();
    }, 250);
  };

  const toggleChat = () => {
    const nextOpen = !isOpen;
    if (nextOpen) {
      flushSync(() => setIsOpen(true));
      syncMobileViewport();
      resizeInput();
      if (shouldAutoFocus()) {
        focusInput();
      }
    } else {
      setIsOpen(false);
    }
    
    if (nextOpen && !hasOpenedBefore) {
      setHasOpenedBefore(true);
      trackEvent("chat_opened", "chat");
    }
  };

  const handleSendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    // Ghi nhận sự kiện gửi tin nhắn
    trackEvent("chat_message_sent", "chat", { length: trimmedText.length });

    // Thêm tin nhắn của User vào feed
    const userMessage: ChatMessage = { role: "user", content: trimmedText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedText,
          history: updatedMessages.slice(0, -1), // Gửi kèm lịch sử để giữ ngữ cảnh hội thoại
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat request or stream failed");
      }

      // Đọc luồng dữ liệu (ReadableStream)
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      // Tạo trước một bubble tin nhắn rỗng cho Trợ lý ảo
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsLoading(false); // Ẩn Typing Loader khi bắt đầu nhận chữ

      const assistantMessageParts: string[] = [];
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Phân tích các khối SSE: event: ... \n data: ...
        const parts = buffer.split("\n\n");
        // Giữ phần cuối cùng chưa hoàn chỉnh lại buffer
        buffer = parts.pop() || "";

        for (const part of parts) {
          const lines = part.split("\n");
          let dataText = "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              dataText = line.slice(6);
            }
          }

          if (dataText) {
            try {
              const parsed = JSON.parse(dataText);
              if (parsed.text) {
                assistantMessageParts.push(parsed.text);
                const assistantMessage = assistantMessageParts.join("");
                // Cập nhật ký tự nhận được vào bubble cuối cùng
                setMessages((prev) => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: "assistant", content: assistantMessage };
                  return copy;
                });
              }
            } catch {
              // Bỏ qua lỗi parse của các gói dữ liệu bị cắt dở
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch chatbot response stream:", err);
      // Xóa bubble trống cuối cùng nếu có lỗi xảy ra ngay từ đầu
      setMessages((prev) => {
        const copy = [...prev];
        if (copy.length > 0 && copy[copy.length - 1].role === "assistant" && !copy[copy.length - 1].content) {
          copy.pop();
        }
        return [
          ...copy,
          {
            role: "assistant",
            content: "Oops! 😿 Có một lỗi kỹ thuật xảy ra khi kết nối tới bộ não AI của NORA. Sen vui lòng thử gửi lại tin nhắn nhé!",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleQuickPromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleClearChat = () => {
    if (isLoading) return;
    trackEvent("chat_cleared", "chat", {});
    sessionStorage.removeItem("nora-chat-messages");
    
    fetch("/api/chat/init")
      .then((res) => res.json())
      .then((data) => {
        const welcomeText = data.welcome_message || "Xin chào Sen! Mình là Trợ lý ảo của NORA. Mình có thể giúp Sen tìm hiểu thông tin sản phẩm, cách huấn luyện mèo dùng máy hay các thông số kỹ thuật của NORA Halo One. Sen cần hỗ trợ gì hôm nay ạ?";
        setMessages([{ role: "assistant", content: welcomeText }]);
      })
      .catch(() => {
        setMessages([{ role: "assistant", content: "Xin chào Sen! Mình là Trợ lý ảo của NORA. Mình có thể giúp Sen tìm hiểu thông tin sản phẩm." }]);
      });
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.chatbotContainer} ${isOpen ? styles.chatbotContainerOpen : ""}`}
    >
      {/* Khung chat sử dụng AnimatePresence để làm mượt transition đóng/mở */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={styles.chatWindow}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>
                  <Bot />
                </div>
                <div className={styles.headerText}>
                  <span className={styles.title}>Trợ lý ảo NORA</span>
                  <span className={styles.status}>Đang online</span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button onClick={handleClearChat} className={styles.actionButton} aria-label="Xóa cuộc trò chuyện" title="Xóa trò chuyện">
                  <Trash2 />
                </button>
                <button onClick={toggleChat} className={styles.closeButton} aria-label="Đóng chat">
                  <X />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className={styles.messageList} ref={scrollRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.messageRow} ${
                    msg.role === "user" ? styles.messageUser : styles.messageAssistant
                  }`}
                >
                  <div className={styles.messageBubble}>{renderMessageContent(msg.content)}</div>
                </div>
              ))}
              
              {/* Typing Loader Indicator */}
              {isLoading && (
                <div className={`${styles.messageRow} ${styles.messageAssistant}`}>
                  <div className={styles.messageBubble}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions Pills */}
            {messages.length === 1 && !isLoading && (
              <div className={styles.suggestionsContainer}>
                {suggestions.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPromptClick(prompt)}
                    className={styles.suggestionButton}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Message Input Footer */}
            <form onSubmit={handleSubmit} className={styles.chatFooter}>
              <div className={styles.inputWrapper}>
                <textarea
                  ref={inputRef}
                  placeholder="Nhập câu hỏi của Sen..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={settleInputViewport}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  className={styles.inputField}
                  disabled={isLoading}
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={styles.sendButton}
                  aria-label="Gửi tin nhắn"
                >
                  <Send />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút tròn nổi kích hoạt đóng/mở */}
      <button
        onClick={toggleChat}
        className={`${styles.chatButton} ${isOpen ? styles.chatButtonActive : ""}`}
        aria-label="Mở chat tư vấn AI"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}
