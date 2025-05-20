import { NEXT_API_ROUTES } from "@/constants";
import { httpClientNext } from "@/lib";
import {
  EmailVerificationType,
  RegisterFormType,
  SetPasswordType,
} from "@/types";

export const register = (data: RegisterFormType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.REGISTER, {
    email: data.email,
    full_name: data.fullName,
    address: data.address,
    contact: data.contact,
  });
};

export const verifyemail = (data: EmailVerificationType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.LOGIN, {
    usr: data.email,
    pwd: data.otp,
  });
};

export const setpassword = (data: SetPasswordType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.SET_PASSWORD, {
    npwd: data.confirmPassword,
  });
};
