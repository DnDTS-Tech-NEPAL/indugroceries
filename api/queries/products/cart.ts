import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { CartAPIResponseType } from "@/types";

export const getCartData = async () => {
  return httpClient.get<CartAPIResponseType>(API_ROUTES.APP.PRODUCTS.CART.GET);
};
