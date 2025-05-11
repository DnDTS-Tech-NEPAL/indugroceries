import { NEXT_API_ROUTES } from "@/constants";
import { httpClientNext } from "@/lib";
import { GetOtpType } from "@/types";

export const getOtp = (data: GetOtpType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.FORGOT_PASSWORD.GET_OTP, {
    email: data.email,
  });
};
