import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ShippingPolicyApiType } from "@/types";

export const ShippingDelivery = () => {
  return httpClient.get<ShippingPolicyApiType>(
    API_ROUTES.APP.SHIPPING_DELIVERY.LIST
  );
};
