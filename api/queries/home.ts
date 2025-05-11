import { API_ROUTES } from "@/constants";
import { HomePageAPIResponseType } from "@/types";

export const getHomePageData = async (): Promise<HomePageAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.HOMEPAGE,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
