import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { SearchAPIResponseType } from "@/types";

export const getSearchList = (params?: { item_code?: string }) => {
  return httpClient.get<SearchAPIResponseType>(API_ROUTES.APP.PRODUCTS.SEARCH, {
    params,
  });
};
