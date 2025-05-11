import { API_ROUTES } from "@/constants";
import { ConfigAPIResponse } from "@/types";

export const getConfigData = async (): Promise<ConfigAPIResponse> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.CONFIG,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
