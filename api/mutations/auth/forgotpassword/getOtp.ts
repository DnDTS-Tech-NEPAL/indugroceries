import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { GetOtpType } from "@/types";

export const getOtp = (data: GetOtpType) => {
  return httpClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD.GET_OTP, {
    email: data.email,
  });
};
