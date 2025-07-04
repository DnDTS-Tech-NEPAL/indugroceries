import { API_ROUTES } from "@/constants";
import { SkinTypeAPIResponseType} from "@/types";

export const getSkinTypePageData = async (): Promise<SkinTypeAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.SKIN_TYPE,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();
  return data;
};
