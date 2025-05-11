import { ProductFilterAPIType } from "@/types";

export type FilterAccordionProps = {
  title: string;
  items: Array<{ value: string; title: string }>;
  isFetching: boolean;
  name: string;
};

export type ReviewAccordionProps = {
  title: string;
};

export type ProductFilterType = Pick<
  ProductFilterAPIType,
  "brand" | "item_group"
> & {
  bestseller: string;
  pricerange: string;
};
