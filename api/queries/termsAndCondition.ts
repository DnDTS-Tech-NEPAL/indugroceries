import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { TermsAndConditionApiType } from "@/types";

export const getTermsAndCondition = () => {
  return httpClient.get<TermsAndConditionApiType>(
    API_ROUTES.APP.TERMS_AND_CONDITION.LIST
  );
};
