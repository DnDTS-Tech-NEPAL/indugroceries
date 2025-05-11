import { API_ROUTES } from "@/constants";
import { ContactUsPageAPIResponseType } from "@/types";

export const getContactUsData =
  async (): Promise<ContactUsPageAPIResponseType> => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + API_ROUTES.APP.CONTACT_US.DETAIL,
      {
        cache: "no-cache",
        method: "POST",
      }
    );

    const data = await response.json();

    return data;
  };
