import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { CheckOtpType } from "@/types";

export const checkOtp = (data: CheckOtpType) => {
  return httpClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD.OTP_CHECK, {
    email: data.email,
    otp: data.otp,
  });
};
