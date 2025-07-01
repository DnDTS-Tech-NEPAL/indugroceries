export type CartType = {
  item_code: string;
  item_name: string;
  quantity: number;
  item_price: string;
  image_url: string;
  item_group: string;
  custom_minimum_order_quantity: number;
  custom_maximum_order_quantity: number;
  custom_increment_on_quantity: number;
  discount_percentage: string;
  discounted_price: string;
  total: number;
  stock_qty: number;
};

export type CartAPIResponseType = {
  data: CartType[];
};

export type RemoveFromCartPayloadType = {
  item_code: string[];
};

export type FormattedCartItemType = {
  id: string;
  title: string;
  category: string;
  type: string;
  subType?: string;
  price: string;
  quantity: number;
  image: string;
  description: string;
};
