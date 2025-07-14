import * as z from "zod";

export const registerUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Full Name is required." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Full Name must contain only letters and spaces.",
    }),

  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid Email Address." }),

  // address: z
  //   .string()
  //   .trim()
  //   .min(1, { message: "Address is required." }),

  contact: z
    .string()
    .trim()
    .min(1, { message: "Contact Number is required." })
    .regex(/^\d*$/, { message: "Contact Number must be a number." })
    .length(10, { message: "Contact Number must be exactly 10 digits." }),
});
