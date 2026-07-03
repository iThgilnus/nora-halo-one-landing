import { z } from "zod";

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập họ tên tối thiểu 2 ký tự.")
    .max(80, "Họ tên quá dài."),
  phone: z
    .string()
    .trim()
    .min(8, "Số điện thoại chưa đủ ký tự.")
    .max(20, "Số điện thoại quá dài.")
    .regex(/^[0-9+\-\s().]+$/, "Số điện thoại chỉ nên chứa chữ số và ký tự gọi."),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Email chưa đúng định dạng.",
    }),
  catsCount: z.coerce
    .number()
    .int("Số lượng mèo phải là số nguyên.")
    .min(1, "Vui lòng nhập ít nhất 1 bé mèo.")
    .max(12, "Nếu nhiều hơn 12 bé, hãy ghi thêm trong lời nhắn."),
  selectedItems: z
    .array(z.string())
    .min(1, "Vui lòng chọn ít nhất một sản phẩm quan tâm."),
  message: z.string().trim().max(800, "Lời nhắn tối đa 800 ký tự.").optional(),
  consent: z
    .boolean()
    .refine((value) => value, "Bạn cần đồng ý để NORA liên hệ tư vấn."),
});

export type LeadPayload = z.infer<typeof leadSchema>;
