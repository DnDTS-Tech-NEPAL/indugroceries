import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ProductAPIResponseType, ProductFilterAPIType } from "@/types";

export const filterProducts = async (filter: ProductFilterAPIType) => {
  return httpClient.post<ProductAPIResponseType>(
    API_ROUTES.APP.PRODUCTS.FILTER,
    filter
  );
};
