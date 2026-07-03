import { analyticsEventSchema } from "@/lib/validations/event";
import { getMysqlPool } from "@/lib/mysql";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const parsed = analyticsEventSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        message: "Validation failed.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const event = {
    id: crypto.randomUUID(),
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };

  // Save to MySQL database
  try {
    const pool = getMysqlPool();
    const eventMetadata = JSON.stringify({
      sessionId: parsed.data.sessionId,
      metadata: parsed.data.metadata || {},
    });

    await pool.query(
      `INSERT INTO events (eventType, category, metadata) VALUES (?, ?, ?)`,
      [
        parsed.data.eventName,
        parsed.data.section || "general",
        eventMetadata
      ]
    );
  } catch (dbError) {
    console.error("Failed to save event document to MySQL:", dbError);
  }

  if (process.env.ANALYTICS_WEBHOOK_URL) {
    try {
      await fetch(process.env.ANALYTICS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "nora_analytics_event",
          payload: event,
        }),
      });
    } catch (error) {
      console.error("Analytics webhook failed", error);
    }
  }

  return Response.json({ ok: true, event });
}
