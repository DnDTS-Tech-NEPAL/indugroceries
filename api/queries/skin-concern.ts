import { API_ROUTES } from "@/constants";
import { SkinConcernAPIResponseType } from "@/types/api/skin-concern";

export const getSkinConcernPageData = async (): Promise<SkinConcernAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.SKIN_CONCERN,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();
  return data;
};
