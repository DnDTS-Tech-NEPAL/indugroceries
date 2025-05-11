import { API_ROUTES } from "@/constants";
import { QualityComplaincePageAPIResponseType } from "@/types";

export const getQualityCompliancePageData = async (): Promise<QualityComplaincePageAPIResponseType> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.QUALITY,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};
