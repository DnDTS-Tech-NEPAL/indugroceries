import * as z from "zod";

export const setPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm Password is required." })
      .min(8, {
        message: "Confirm Password must be at least 8 characters long.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password  must match.",
    path: ["confirmPassword"],
  });
