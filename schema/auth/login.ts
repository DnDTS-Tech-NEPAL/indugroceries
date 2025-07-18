import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type LoginFormType = z.infer<typeof loginSchema>;
