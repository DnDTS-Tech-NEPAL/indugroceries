export type ItemProductLikeApiResponseType = {
  data: ItemProductLikeApiType[];
};

export type ItemProductLikeApiType = {
  name: string;
  custom_image_1_link: string;
  item_name: string;
  item_code: string;
  description: string;
  stock_qty: number;
  prices: [
    {
      price_list_rate: number;
      discounted_price: number;
      discount: number;
    },
  ];
};
