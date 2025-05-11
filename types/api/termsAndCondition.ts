export type TermsAndConditionType = {
  title: string;
  subtitle: string;
  content: string;
};

export type TermsAndConditionDataType = {
  page_title: string;
  page_subtitle: string;
  page_content: TermsAndConditionType[];
};

export type TermsAndConditionApiType = {
  data: TermsAndConditionDataType;
};
