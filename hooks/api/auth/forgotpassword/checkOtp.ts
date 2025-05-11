import { useMutation } from "@tanstack/react-query";

import { checkOtp } from "@/api";
import { toaster } from "@/components";
import { ApiErrorResponse } from "@/types";

export const useCheckOtpMutation = () => {
  return useMutation({
    mutationFn: checkOtp,
    onSuccess: (response) => {
      toaster.create({
        title: response?.data?.message,
        type: "success",
      });
    },
    onError: (error: ApiErrorResponse) => {
      toaster.create({
        title: error?.response?.data?.message,
        type: "error",
      });
    },
  });
};
