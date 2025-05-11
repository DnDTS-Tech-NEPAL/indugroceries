import { NEXT_API_ROUTES } from "@/constants";
import { httpClientNext } from "@/lib";
import { ResetPasswordType } from "@/types";

export const resetPassword = (data: ResetPasswordType) => {
  return httpClientNext.post(
    NEXT_API_ROUTES.AUTH.FORGOT_PASSWORD.CHANGE_PASSWORD,
    data
  );
};
