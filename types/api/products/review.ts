export type ReviewApiResponseType = {
  data: ReviewApiResponseData;
  message: string;
};

export type ReviewApiResponseData = {
  review: string;
  rating: number;
  item_code: string;
};
