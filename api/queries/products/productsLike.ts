import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ProductLikeApiResponseType } from "@/types";

export const getProductsLikeData = async () => {
  return httpClient.get<ProductLikeApiResponseType>(
    API_ROUTES.APP.PRODUCTS.PRODUCTS_LIKE
  );
};
