import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { PromoCouponResponseData, PromoCouponType } from "@/types";

export const addPromo = (data: PromoCouponType) => {
  return httpClient.post<PromoCouponResponseData>(
    API_ROUTES.APP.PROMO.POST,
    data
  );
};
