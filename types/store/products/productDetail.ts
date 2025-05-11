import { ProductDetail } from "@/types/app";

export type VariantState = {
  activeVariant: string;
};

export type VariantActions = {
  updateVariant: (variant: string) => void;
};

export type VariantStore = VariantState & VariantActions;

export type ItemStore = {
  items: ProductDetail[];
  setItems: (
    items: ProductDetail[] | ((prevItems: ProductDetail[]) => ProductDetail[])
  ) => void;
};

export type SummaryStore = {
  discount: number;
  setDiscount: (discount: number) => void;
};
