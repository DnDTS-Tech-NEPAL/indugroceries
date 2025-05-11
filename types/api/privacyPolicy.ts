export type PrivacyPolicyItemType = {
  title: string;
  subtitle: string;
  content: string;
};

export type PrivacyPolicyResponseType = {
  page_title: string;
  page_subtitle: string;
  page_content: PrivacyPolicyItemType[];
};

export type PrivacyPolicyApiType = {
  data: PrivacyPolicyResponseType;
};
