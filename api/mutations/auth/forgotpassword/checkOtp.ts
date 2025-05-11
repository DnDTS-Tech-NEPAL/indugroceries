import { NEXT_API_ROUTES } from "@/constants";
import { httpClientNext } from "@/lib";
import { CheckOtpType } from "@/types";

export const checkOtp = (data: CheckOtpType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.FORGOT_PASSWORD.OTP_CHECK, {
    email: data.email,
    otp: data.otp,
  });
};
