export type PaymentMethodPageType = {
  name: string;
  description: string;
  icon_link: string;
};

export type PaymentMethodAPIResponseType = {
  Data: PaymentMethodPageType[];
};
