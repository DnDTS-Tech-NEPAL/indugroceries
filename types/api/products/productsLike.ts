export type ProductLikeApiResponseType = {
  data: ProductLikeApiType[];
};

export type ProductLikeApiType = {
  name: string;
  custom_image_1_link: string | null;
  custom_image_2_link: string | null;
  custom_image_3_link: string | null;
  custom_image_4: string | null;
  custom_image_4_link: string | null;
  custom_key_features: string;
  description: string;
  item_name: string;
  item_group: string;
  item_code: string;
  prices: [
    {
      price_list: string;
      price_list_rate: number;
      discounted_price: number;
      min_price?: number;
      max_price?: number;
      discount: number;
    },
  ];
};
