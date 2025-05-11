import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { CategoryAPIResponseType } from "@/types";

export const getCategoriesList = async () => {
  return httpClient.get<CategoryAPIResponseType>(
    API_ROUTES.APP.CATEGORIES.LIST
  );
};
