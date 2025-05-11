import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { OrderPostType } from "@/types";

export const orderPost = (data: OrderPostType) => {
  return httpClient.post(API_ROUTES.APP.ORDER.POST, {
    items: data.items,
    selectedPaymentMethod: data.selectedPaymentMethod,
  });
};
