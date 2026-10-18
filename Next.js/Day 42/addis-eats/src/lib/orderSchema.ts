import { z } from "zod";

const TELEBIRR_PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

export const orderItemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => val.length > 0, {
      message: "Please enter your TeleBirr number.",
    })
    .refine((val) => TELEBIRR_PHONE_REGEX.test(val), {
      message: "Use 09... or +2519... for your TeleBirr number.",
    }),
  address: z
    .string()
    .trim()
    .min(3, "Please enter a delivery address or landmark."),
  notes: z
    .string()
    .trim()
    .optional()
    .default(""),
  items: z.array(orderItemSchema).optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

export type FieldErrors = {
  name?: string[];
  phone?: string[];
  address?: string[];
  notes?: string[];
  items?: string[];
};

export type ApiErrorResponse = {
  error: string;
  fieldErrors?: FieldErrors;
};
