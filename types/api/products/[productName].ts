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
  stock_qty: number;
  skin_types: string[];
  skin_concerns: string[];
  custom_short_description: string;

  // custom description
  age: string[];
  core_ingredients: string;
  custom_benefits: string;
  custom_vegan: number;
  custom_cruelty_free: number;
  custom_fragnance: number;
  custom_manufactured_in: string;
  product_texture: string[];
  custom_dermatologist_tested: number;

  // custom description,how to use,ingredients
  custom_long_description: string;
  custom_ingredients: string;
  custom_how_to_use: string;
  custom_recommendation: string;
  custom_avoid_by: string;
  about_brand: string;
};

export type PriceType = {
  price_list_rate: number;
  discount: number;
  discounted_price: number;
  custom_discount_valid_upto?: string;
  custom_discount_start_from?: string;
  min_price?: number;
  max_price?: number;
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
  stock_qty: number;
  skin_types: string[];
  skin_concerns: string[];

  error?: string;

  // remove this after api update
  discount: string;
  original_price: string;
  // custom description,how to use,ingredients
  custom_short_description: string;
  custom_long_description: string;
  custom_ingredients: string;
  custom_how_to_use: string;
  custom_recommendation: string;
  custom_avoid_by: string;
  about_brand: string;

  // custom description
  age: string[];
  core_ingredients: string;
  custom_benefits: string;
  product_texture: string[];
  custom_vegan: number;
  custom_cruelty_free: number;
  custom_fragnance: number;
  custom_manufactured_in: string;
  custom_dermatologist_tested: number;
};

export type IndividualProductAPIResponseType = {
  data: IndividualProductAPIType[];
};

export type RecentlyViewedProductAPIType = {
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
  stock_qty: number;
  skin_types: string[];
  skin_concerns: string[];
};
