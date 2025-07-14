import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { CartCountAPIResponseType } from "@/types";

export const getCartCountData = async (guid: string) => {
  return httpClient.post<CartCountAPIResponseType>(
    API_ROUTES.APP.PRODUCTS.CART.COUNT,
    { guid }
  );
};
