import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { BrandAPIResponseType } from "@/types";

export const getBrandsList = () => {
  return httpClient.get<BrandAPIResponseType>(API_ROUTES.APP.BRANDS.LIST);
};
