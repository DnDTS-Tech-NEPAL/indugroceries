import { API_ROUTES } from "@/constants";
import { FeaturedBrandsAPIResponseType } from "@/types";

export const getBrandsCatogery =
  async (): Promise<FeaturedBrandsAPIResponseType> => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.FEATURED_BRAND,
      {
        cache: "no-cache",
        method: "POST",
      }
    );

    const data = await response.json();
    return data;
  };
