import { API_ROUTES } from "@/constants";
import { NavmenuAPIResponse } from "@/types";

export const getNavMenuData = async (): Promise<NavmenuAPIResponse> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.MENU_NAV,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
