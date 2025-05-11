import {  NEXT_API_ROUTES } from "@/constants";
import {  httpClient, httpClientNext } from "@/lib";
import {
  EmailVerificationType,
  RegisterFormType,
  SetPasswordType,
} from "@/types";


export const userregistrationform = (data: RegisterFormType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.USERREGISTER, {
    business_name: data.business_name,
    business_email: data.business_email,
    business_address: data.business_address,
    business_contact: data.business_contact,
    business_abn: data.business_abn,
    contact_person: data.contact_person,
  });
};


export const verifyemail = (data: EmailVerificationType) => {
  return httpClient.post(NEXT_API_ROUTES.AUTH.LOGIN, {
    usr: data.email,
    pwd: data.otp,
  });
};

export const setpassword = (data: SetPasswordType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.SET_PASSWORD, {
    npwd: data.confirmPassword,
  });
};
