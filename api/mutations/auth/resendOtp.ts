import { NEXT_API_ROUTES } from "@/constants";
import { httpClientNext } from "@/lib";
import { ResendOtpApiType } from "@/types";

export const resendOtp = (data: ResendOtpApiType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.RESEND_OTP, {
    email: data.email,
  });
};
