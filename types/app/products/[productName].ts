import { StaticImageData } from "next/image";

import { IndividualProductAPIType } from "@/types/api";

export type ProductDetailPageProps = {
  params: Promise<{ productName: string }>;
};

export type ProductDetailContainerProps = {
  product: IndividualProductAPIType;
};

export type ProductDetail = {
  id: string;
  category: string;
  price: string;
  discountedPrice: string;
  discountPercentage: string;
  image: StaticImageData | string;
  title: string;
  description: string;

  type: string;
  subType: string;
  quantity: number;
  minimumQuantity?: number;
  maximumQuantity?: number;
  incrementStep?: number;
};

export type ColorVariantProps = {
  color?: string;
  backgroundColor?: string;
  name: string;
  onClick?: VoidFunction;
};
