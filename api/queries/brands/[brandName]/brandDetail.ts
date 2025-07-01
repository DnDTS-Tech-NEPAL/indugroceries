import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import {
    BrandAPIResponseType,
} from "@/types";

export const getBrandDetailByName = async (): Promise<BrandAPIResponseType | undefined> => {
  try {
    const response = await httpClient.post(
      API_ROUTES.APP.BRANDS.LIST
    );
    const brand = response?.data?.Data;
    return brand;
  } catch (e) {}
};


