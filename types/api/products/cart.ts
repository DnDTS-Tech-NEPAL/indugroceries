export type CartType = {
  item_code: string;
  quantity: number;
  item_price: number;
  image_url: string;
  item_group: string;
  custom_minimum_order_quantity: number;
  custom_maximum_order_quantity: number;
  custom_increment_on_quantity: number;
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
