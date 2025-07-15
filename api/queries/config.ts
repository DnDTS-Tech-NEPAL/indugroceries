import { API_ROUTES } from "@/constants";
import { ConfigAPIResponse } from "@/types";

export const getConfigData = async (
  city?: string // city is optional now
): Promise<ConfigAPIResponse> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.CONFIG,
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: city ?? "" }), // send empty string if city is undefined
    }
  );

  const data = await response.json();

  return data;
};
