export type ItemProductLikeApiResponseType = {
  data: ItemProductLikeApiType[];
};

export type ItemProductLikeApiType = {
  name: string;
  custom_image_1_link: string;
  item_name: string;
  description: string;
  prices: [
    {
      price_list_rate: number;
    },
  ];
};
