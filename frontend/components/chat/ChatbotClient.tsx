"use client";

import dynamic from "next/dynamic";

const DynamicChatbot = dynamic(
  () => import("./Chatbot").then((mod) => mod.Chatbot),
  { ssr: false }
);

export function ChatbotClient() {
  return <DynamicChatbot />;
}
