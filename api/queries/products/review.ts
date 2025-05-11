import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { ReviewApiResponseData, ReviewApiResponseType } from "@/types";

export const getReview = (data: ReviewApiResponseData) => {
  return httpClient.post<ReviewApiResponseType>(
    API_ROUTES.APP.PRODUCTS.REVIEW,
    data
  );
};
