import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { CouponCalculationAPIResponseType } from "@/types";

export const getCouponCalculationData = async () => {
  return httpClient.get<CouponCalculationAPIResponseType>(
    API_ROUTES.APP.PROMO.GET
  );
};
