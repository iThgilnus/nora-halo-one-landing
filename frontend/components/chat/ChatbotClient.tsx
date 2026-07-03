"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicChatbot = dynamic(
  () => import("./Chatbot").then((mod) => mod.Chatbot),
  { ssr: false }
);

export function ChatbotClient() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(
        () => setShouldLoad(true),
        { timeout: 3500 }
      );

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setShouldLoad(true), 2500);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <DynamicChatbot />;
}
