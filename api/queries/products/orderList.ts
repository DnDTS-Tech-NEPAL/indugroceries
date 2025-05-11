import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { OrderAPIResponseType } from "@/types";

export const getOrderData = async () => {
  return httpClient.get<OrderAPIResponseType>(API_ROUTES.APP.ORDER.LIST);
};
