import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";

export type DeliveryChargesAPIResponseType = {
  data: {
    name1: string;
  };
};

export const getDeliveryData = async () => {
  return httpClient.get<DeliveryChargesAPIResponseType>(
    API_ROUTES.APP.ORDER.DELIVERY
  );
};
