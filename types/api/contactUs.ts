export type ContactUsTableType = {
  label: string;
  field_name: string;
  placeholder: string;
  mandatory: 0 | 1;
};

export type ContactUsPageType = {
  contact_us_table: ContactUsTableType[];
  heading_1: string;
  latitude: string;
  longitude: string;
  map: string;
  subheading: string;
};

export type ContactUsPageAPIResponseType = {
  Data: ContactUsPageType;
};
