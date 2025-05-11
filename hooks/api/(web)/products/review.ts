import { useMutation } from "@tanstack/react-query";

import { getReview } from "@/api";
import { toaster } from "@/components";
import { ReviewApiResponseData } from "@/types";

export const useReviewMutation = () => {
  return useMutation({
    mutationFn: (data: ReviewApiResponseData) => getReview(data),
    onSuccess: (response) => {
      toaster.create({
        type: "success",
        title: response?.data?.message,
      });
    },
  });
};
