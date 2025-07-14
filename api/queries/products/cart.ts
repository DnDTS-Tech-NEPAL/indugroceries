import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { CartAPIResponseType } from "@/types";

export const getCartData = async (guid: string) => {
  return httpClient.post<CartAPIResponseType>(
    API_ROUTES.APP.PRODUCTS.CART.GET,
    { guid }
  );
};
