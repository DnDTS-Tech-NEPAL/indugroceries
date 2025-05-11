import * as z from "zod";

export const registerUserSchema = z.object({
  business_name: z
    .string()
    .trim()
    .min(1, { message: "Business Name is required." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Business Name must contain only letters and spaces.",
    }),

  business_email: z
    .string()
    .trim()
    .min(1, { message: "Business Email is required." })
    .email({ message: "Invalid Business Email." }),

  business_address: z
    .string()
    .trim()
    .min(1, { message: "Business Address is required." }),

  business_contact: z
    .string()
    .trim()
    .min(1, { message: "Contact Number is required." })
    .regex(/^\d*$/, { message: "Contact Number must be a number." })
    .length(10, { message: "Contact Number must be exactly 10 digits." }),
  business_abn: z
    .string()
    .trim()
    .min(1, { message: "Business ABN is required." })
    .regex(/^\d{11}$/, { message: "Business ABN must be exactly 11 digits." }),

  contact_person: z
    .string()
    .trim()
    .min(1, { message: "Contact Person is required." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Contact Person must contain only letters and spaces.",
    }),
});
