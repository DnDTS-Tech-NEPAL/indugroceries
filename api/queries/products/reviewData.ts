import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ReviewDataApiResponseType } from "@/types";

export const getReviewData = (item_code: string) => {
  return httpClient.post<ReviewDataApiResponseType>(
    API_ROUTES.APP.PRODUCTS.REVIEW_DATA,
    { item_code }
  );
};
