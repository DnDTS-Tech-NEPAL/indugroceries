import { API_ROUTES } from "@/constants";
import { FeaturedCategoryAPIResponseType } from "@/types";

export const getFeatureCatogery =
  async (): Promise<FeaturedCategoryAPIResponseType> => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.FEATURED_CATEGORY,
      {
        cache: "no-cache",
        method: "POST",
      }
    );

    const data = await response.json();
    return data;
  };
