"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { ZodError } from "zod";
import { ButtonLink } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { accessories } from "@/lib/product-data";
import { LeadPayload, leadSchema } from "@/lib/validations/lead";

type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

function mapErrors(error: ZodError<LeadPayload>): FieldErrors {
  const fieldErrors = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]]),
  ) as FieldErrors;
}

function fieldClass(hasError?: boolean) {
  return [
    "min-h-12 w-full rounded-card border bg-panel px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-lime focus:ring-2 focus:ring-lime/20",
    hasError ? "border-orange" : "border-line",
  ].join(" ");
}

export function LeadFormSection() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState("");
  const cartKey = "default";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");
    const formElement = event.currentTarget;

    const formData = new FormData(formElement);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      catsCount: Number(formData.get("catsCount") ?? 0),
      selectedItems: formData.getAll("selectedItems").map(String),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
    };

    const parsed = leadSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(mapErrors(parsed.error));
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(result?.message ?? "Không thể gửi form lúc này.");
      }

      setStatus("success");
      trackEvent("form_submit_success", "consultation", {
        selectedItems: parsed.data.selectedItems,
      });
      formElement.reset();
    } catch (error) {
      setStatus("idle");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Không thể gửi form lúc này.",
      );
    }
  }

  return (
    <section
      id="consultation"
      className="bg-page px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange">
            <Send size={12} />
            Đăng ký tư vấn
          </div>
          <h2 className="mt-5 text-balance text-4xl font-serif font-black leading-[1.2] text-ink md:text-5xl lg:text-6xl">
            Kiến tạo không gian{" "}
            <span className="bg-gradient-to-r from-orange to-orange/80 bg-clip-text text-transparent">
              thảnh thơi.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Đội ngũ chuyên viên của NORA sẽ liên hệ và tư vấn giải pháp dọn dẹp thông minh tối ưu cho gia đình và thú cưng của bạn trong vòng 24 giờ.
          </p>
          <div className="mt-6">
            <ButtonLink href="#quote" variant="secondary">
              Xem báo giá chi tiết
            </ButtonLink>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-line bg-panel p-5 shadow-[var(--shadow-soft)] sm:p-6"
          noValidate
        >
          {status === "success" ? (
            <div className="mb-6 rounded-card border border-lime/40 bg-lime/10 p-4 text-sm leading-7 text-ink">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-lime" size={20} />
                <div>
                  <p className="font-extrabold">Cảm ơn bạn.</p>
                  <p className="text-muted">
                    Đội ngũ tư vấn sẽ liên hệ trong thời gian sớm nhất.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-ink">Họ và tên *</span>
              <input
                name="fullName"
                className={fieldClass(Boolean(errors.fullName))}
                placeholder="Nguyen Van Minh Hai"
              />
              {errors.fullName ? (
                <span className="mt-2 block text-xs font-semibold text-orange">
                  {errors.fullName}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-ink">
                Số điện thoại *
              </span>
              <input
                name="phone"
                inputMode="tel"
                className={fieldClass(Boolean(errors.phone))}
                placeholder="0900000000"
              />
              {errors.phone ? (
                <span className="mt-2 block text-xs font-semibold text-orange">
                  {errors.phone}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-ink">Email</span>
              <input
                name="email"
                type="email"
                className={fieldClass(Boolean(errors.email))}
                placeholder="name@email.com"
              />
              {errors.email ? (
                <span className="mt-2 block text-xs font-semibold text-orange">
                  {errors.email}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-ink">
                Số lượng mèo đang nuôi *
              </span>
              <input
                name="catsCount"
                type="number"
                min="1"
                max="12"
                defaultValue="1"
                className={fieldClass(Boolean(errors.catsCount))}
              />
              {errors.catsCount ? (
                <span className="mt-2 block text-xs font-semibold text-orange">
                  {errors.catsCount}
                </span>
              ) : null}
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-ink">
              Sản phẩm quan tâm *
            </legend>
            <div key={cartKey} className="mt-3 grid gap-3 sm:grid-cols-2">
              {accessories.map((item, index) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 rounded-card border border-line bg-page p-4 text-sm text-muted"
                >
                  <input
                    name="selectedItems"
                    type="checkbox"
                    value={item.name}
                    defaultChecked={index === 0}
                    className="mt-1 size-4 accent-[var(--accent-lime)]"
                  />
                  <span>
                    <span className="block font-bold text-ink">
                      {item.name}
                    </span>
                    <span className="mt-1 block leading-6">
                      {item.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {errors.selectedItems ? (
              <span className="mt-2 block text-xs font-semibold text-orange">
                {errors.selectedItems}
              </span>
            ) : null}
          </fieldset>

          <label className="mt-6 block">
            <span className="text-sm font-bold text-ink">Lời nhắn</span>
            <textarea
              name="message"
              rows={4}
              className="mt-2 w-full resize-y rounded-card border border-line bg-panel px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-muted/70 focus:border-lime focus:ring-2 focus:ring-lime/20"
              placeholder="Tôi muốn được tư vấn cấu hình phù hợp..."
            />
            {errors.message ? (
              <span className="mt-2 block text-xs font-semibold text-orange">
                {errors.message}
              </span>
            ) : null}
          </label>

          <label className="mt-5 flex items-start gap-3 text-sm leading-7 text-muted">
            <input
              name="consent"
              type="checkbox"
              className="mt-1 size-4 accent-[var(--accent-lime)]"
            />
            <span>Tôi đồng ý để NORA liên hệ tư vấn.</span>
          </label>
          {errors.consent ? (
            <span className="mt-2 block text-xs font-semibold text-orange">
              {errors.consent}
            </span>
          ) : null}

          {serverMessage ? (
            <p className="mt-4 rounded-card border border-orange/40 bg-orange/10 p-3 text-sm font-semibold text-orange">
              {serverMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-card bg-orange px-5 text-sm font-extrabold text-white transition hover:bg-orange/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "submitting" ? (
              <Loader2 className="animate-spin" size={18} aria-hidden />
            ) : (
              <Send size={18} aria-hidden />
            )}
            Gửi yêu cầu tư vấn chi tiết
          </button>
        </form>
      </div>
    </section>
  );
}
