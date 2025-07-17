import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ResetPasswordType } from "@/types";

export const resetPassword = (data: ResetPasswordType) => {
  return httpClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD.CHANGE_PASSWORD, data);
};
