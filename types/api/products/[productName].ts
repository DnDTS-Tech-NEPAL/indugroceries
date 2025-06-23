import { CategoryType } from "./category";
import { ProductPrice } from "./products";

export type ProductAttribute = {
  attribute: string;
  attribute_value: string;
  color: string;
};

export type ProductVariantType = {
  id: string;
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  brand: string;
  description: string;
  custom_key_features: string;
  custom_specifications: string;
  country_of_origin: string;
  custom_image_1_link: string;
  custom_image_2_link: string;
  custom_image_3_link: string;
  custom_image_4_link: string;
  custom_minimum_order_quantity: number;
  custom_increment_on_quantity: number;
  custom_new_arrivals: number;
  custom_maximum_order_quantity: number;
  custom_best_seller_product: number;
  attributes: ProductAttribute[];
  prices: ProductPrice[];
};

export type PriceType = {
  price_list_rate: string;
};

export type IndividualProductAPIType = {
  id: string;
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  brand: string;
  description: string;
  custom_key_features: string;
  custom_specifications: string;
  country_of_origin: string;
  custom_image_1_link: string;
  custom_image_2_link: string;
  custom_image_3_link: string;
  custom_image_4_link: string;
  custom_minimum_order_quantity: number;
  custom_increment_on_quantity: number;
  has_variants: number;
  custom_new_arrivals: number;
  custom_best_seller_product: number;
  custom_maximum_order_quantity: number;
  variant_of: string;
  item_group_hierarchy: CategoryType[];
  prices: PriceType[];
  variants: ProductVariantType[];

  error?: string;

  // remove this after api update
  discount: string;
  original_price: string;
};

export type IndividualProductAPIResponseType = {
  data: IndividualProductAPIType[];
};
