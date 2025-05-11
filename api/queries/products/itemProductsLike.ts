import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ItemProductLikeApiResponseType } from "@/types";

export const getItemProductsLikeData = (itemCode?: string) => {
  return httpClient.post<ItemProductLikeApiResponseType>(
    API_ROUTES.APP.PRODUCTS.ITEM_PRODUCTS_LIKE,
    { item_code: itemCode }
  );
};
