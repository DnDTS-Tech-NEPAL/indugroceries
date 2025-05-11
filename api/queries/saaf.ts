import { API_ROUTES } from "@/constants";
import { SaafPageAPIResponseType } from "@/types";

export const getSaafPageData = async (): Promise<SaafPageAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.SAAF,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
