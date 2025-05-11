export type FAQTableItem = {
  idx: number;
  name: string;
  question: string;
  answer: string;
};

export type FAQAPIResponseType = {
  heading_1: string;
  subheading: string;
  faq_table: FAQTableItem[];
};

export type FAQContainerProps = {
  faqData: FAQAPIResponseType;
};
