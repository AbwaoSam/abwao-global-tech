import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8).refine(
        (value) => new TextEncoder().encode(value).length <= 72,
        { message: "Password must not exceed 72 bytes" }
    ),
});

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8).refine(
        (value) => new TextEncoder().encode(value).length <= 72,
        { message: "Password must not exceed 72 bytes" }
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;