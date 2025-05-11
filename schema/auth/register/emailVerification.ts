import * as z from "zod";

export const emailVerificationSchema = z.object({
  otp: z.string().min(8, { message: "OTP must be 8 digits." }),
});
