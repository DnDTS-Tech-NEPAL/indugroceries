import * as z from "zod";

export const emailVerificationOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email." }),
});
