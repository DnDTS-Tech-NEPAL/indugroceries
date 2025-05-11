import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/api";
import { toaster } from "@/components";
import { ApiErrorResponse } from "@/types";

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPassword,
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
