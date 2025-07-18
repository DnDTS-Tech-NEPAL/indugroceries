export type SearchType = {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  naming_series: string;
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  disabled: number;
  allow_alternative_item: number;
  is_stock_item: number;
  has_variants: number;
  opening_stock: number;
  valuation_rate: number;
  standard_rate: number;
  is_fixed_asset: number;
  auto_create_assets: number;
  is_grouped_asset: number;
  asset_category: string | null;
  asset_naming_series: string | null;
  over_delivery_receipt_allowance: number;
  over_billing_allowance: number;
  image: string | null;
  description: string;
  brand: string | null;
  shelf_life_in_days: number;
  end_of_life: string;
  default_material_request_type: string;
  valuation_method: string;
  warranty_period: string | null;
  weight_per_unit: number;
  weight_uom: string | null;
  allow_negative_stock: number;
  has_batch_no: number;
  create_new_batch: number;
  batch_number_series: string | null;
  has_expiry_date: number;
  retain_sample: number;
  sample_quantity: number;
  has_serial_no: number;
  serial_no_series: string | null;
  variant_of: string | null;
  variant_based_on: string;
  enable_deferred_expense: number;
  no_of_months_exp: number;
  enable_deferred_revenue: number;
  no_of_months: number;
  purchase_uom: string | null;
  min_order_qty: number;
  safety_stock: number;
  is_purchase_item: number;
  lead_time_days: number;
  last_purchase_rate: number;
  is_customer_provided_item: number;
  customer: string | null;
  delivered_by_supplier: number;
  country_of_origin: string | null;
  customs_tariff_number: string | null;
  sales_uom: string | null;
  grant_commission: number;
  is_sales_item: number;
  max_discount: number;
  inspection_required_before_purchase: number;
  quality_inspection_template: string | null;
  inspection_required_before_delivery: number;
  include_item_in_manufacturing: number;
  is_sub_contracted_item: number;
  default_bom: string | null;
  customer_code: string;
  default_item_manufacturer: string | null;
  default_manufacturer_part_no: string | null;
  total_projected_qty: number;
  _user_tags: string | null;
  _comments: string | null;
  _assign: string | null;
  _liked_by: string | null;
  custom_specifications: string | null;
  custom_key_features: string | null;
  custom_image_1: string | null;
  custom_image_1_link: string | null;
  custom_image_2: string | null;
  custom_image_2_link: string | null;
  custom_image_3: string | null;
  custom_image_3_link: string | null;
  custom_image_4: string | null;
  custom_image_4_link: string | null;
  custom_minimum_order_quantity: number;
  custom_increment_on_quantity: number;
  custom_testt: string | null;
  custom_maximum_order_quantity: number;
  custom_new_arrivals: number;
  custom_best_seller_product: number;
  custom_you_may_like: number;
  prices: Price[];
  stock_qty: number;
};

export type Price = {
  price_list: string;
  price_list_rate: number;
  min_price?: number;
  max_price?: number;
  discounted_price: number;
  discount: number;
};

export type SearchAPIResponseType = {
  data: SearchType[];
};
