import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ContactUsFormType } from "@/types";

export const submitContactForm = (data: ContactUsFormType) => {
  return httpClient.post(API_ROUTES.APP.CONTACT_US.SUBMIT, data);
};
