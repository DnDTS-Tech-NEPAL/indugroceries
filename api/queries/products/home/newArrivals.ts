import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ProductHomepageAPIResponseType } from "@/types";

export const getNewArrivals = async () => {
  return httpClient.get<ProductHomepageAPIResponseType>(
    API_ROUTES.APP.PRODUCTS.NEW_ARRIVALS
  );
};
