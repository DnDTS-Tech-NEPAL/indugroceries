import { ContactUsPageType } from "../api";

export type ContactUsFormType = {
  [x: string]: string;
};

export type ContactFormProps = {
  data: ContactUsPageType;
};

export type MapLocationProps = ContactFormProps;
