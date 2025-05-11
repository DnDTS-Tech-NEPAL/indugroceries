import { NEXT_API_ROUTES } from "@/constants";
import { httpClientNext } from "@/lib";
import { LoginFormType } from "@/schema";

export const login = (data: LoginFormType) => {
  return httpClientNext.post(NEXT_API_ROUTES.AUTH.LOGIN, {
    usr: data.email,
    pwd: data.password,
  });
};
