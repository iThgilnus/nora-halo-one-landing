import { leadSchema } from "@/lib/validations/lead";
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

  const parsed = leadSchema.safeParse(body);

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

  const notes = `Số lượng mèo: ${parsed.data.catsCount} | Đăng ký mua: ${parsed.data.selectedItems.join(", ")} | Ý kiến: ${parsed.data.message || "Không có"}`;

  const lead = {
    id: crypto.randomUUID(),
    ...parsed.data,
    email: parsed.data.email || null,
    message: parsed.data.message || null,
    createdAt: new Date().toISOString(),
  };

  // Save to MySQL database
  try {
    const pool = getMysqlPool();
    await pool.query(
      `INSERT INTO leads (name, phone, email, notes, source) VALUES (?, ?, ?, ?, ?)`,
      [
        parsed.data.fullName,
        parsed.data.phone,
        parsed.data.email || null,
        notes,
        "web_form"
      ]
    );
  } catch (dbError) {
    console.error("Failed to save lead document to MySQL:", dbError);
  }

  if (process.env.WEBHOOK_URL) {
    try {
      await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "nora_lead_created",
          lead,
        }),
      });
    } catch (error) {
      console.error("Lead webhook failed", error);
    }
  }

  return Response.json({ ok: true, lead });
}
