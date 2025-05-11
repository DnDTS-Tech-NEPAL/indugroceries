import { API_ROUTES } from "@/constants";
import { AboutUsPageAPIResponseType } from "@/types";

export const getAboutUsData = async (): Promise<AboutUsPageAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.ABOUT_US,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
