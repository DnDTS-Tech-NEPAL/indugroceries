export type ReviewDataApiResponseType = {
  data: ReviewDataApiType;
};

export type ReviewDataApiType = {
  average_rating: number;
  reviews: [
    {
      user: string;
      review: string;
      rating: number;
      item_code: string;
    },
  ];
};
