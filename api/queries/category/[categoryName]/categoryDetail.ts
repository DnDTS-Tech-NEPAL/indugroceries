import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import {
    CategoryAPIResponseType,
} from "@/types";

export const getCategoryDetailByName = async (): Promise<CategoryAPIResponseType | undefined> => {
  try {
    const response = await httpClient.post(
      API_ROUTES.APP.CATEGORIES.LIST
    );
    const category = response?.data?.Data;
    return category;
  } catch (e) {}
};


