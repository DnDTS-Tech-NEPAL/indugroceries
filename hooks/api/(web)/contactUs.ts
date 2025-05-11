import { useMutation } from "@tanstack/react-query";

import { submitContactForm } from "@/api";
import { toaster } from "@/components";
import { ApiErrorResponse } from "@/types";

export const useContactMutation = () => {
  return useMutation({
    mutationFn: submitContactForm,
    onSuccess: (response) => {
      toaster.create({
        title: response?.data?.data,
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
