export type ShippingPolicyItemType = {
  title: string;
  subtitle: string;
  content: string;
};

export type ShippingPolicyResponseType = {
  page_title: string;
  page_subtitle: string;
  page_content: ShippingPolicyItemType[];
  last_updated: string;
  content: string;
};

export type ShippingPolicyApiType = {
  data: ShippingPolicyResponseType;
};
