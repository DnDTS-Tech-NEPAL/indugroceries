import { API_ROUTES } from "@/constants";
import { CallForInfluencerAPIResponseType } from "@/types";

export const getCallForinfluencerData = async (): Promise<CallForInfluencerAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.CALL_FOR_INFLUENCER,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
