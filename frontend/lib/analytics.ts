import type { AnalyticsEventName } from "@/lib/validations/event";

function getSessionId() {
  const key = "nora-session-id";
  const existing = localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const next = crypto.randomUUID();
  localStorage.setItem(key, next);
  return next;
}

export function trackEvent(
  eventName: AnalyticsEventName,
  section?: string,
  metadata?: Record<string, unknown>,
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    eventName,
    section,
    sessionId: getSessionId(),
    metadata,
  };

  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never block the user journey.
  });
}
