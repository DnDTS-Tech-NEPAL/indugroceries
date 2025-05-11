import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { PrivacyPolicyApiType } from "@/types";

export const getPrivacyPolicy = () => {
  return httpClient.get<PrivacyPolicyApiType>(
    API_ROUTES.APP.PRIVACY_POLICY.LIST
  );
};
