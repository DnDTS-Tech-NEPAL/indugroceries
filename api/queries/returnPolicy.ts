import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ReturnPolicyApiType } from "@/types";

export const getReturnPolicy = () => {
  return httpClient.get<ReturnPolicyApiType>(API_ROUTES.APP.RETURN_POLICY.LIST);
};
