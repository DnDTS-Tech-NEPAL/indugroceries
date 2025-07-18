export type ReturnPolicyItemType = {
  title: string;
  subtitle: string;
  content: string;
};

export type ReturnPolicyResponseType = {
  page_title: string;
  page_subtitle: string;
  page_content: ReturnPolicyItemType[];
  last_updated: string;
  content: string;
};

export type ReturnPolicyApiType = {
  data: ReturnPolicyResponseType;
};
