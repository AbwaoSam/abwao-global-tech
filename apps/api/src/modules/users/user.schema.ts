import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8).refine(
        (value) => new TextEncoder().encode(value).length <= 72,
        { message: "Password must not exceed 72 bytes" }
  ),
});

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50).optional(),
  lastName: z.string().trim().min(2).max(50).optional(),
  email: z.string().trim().email().toLowerCase().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;