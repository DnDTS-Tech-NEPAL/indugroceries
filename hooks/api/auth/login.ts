import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "@/api";
import { toaster } from "@/components";
import { ApiErrorResponse } from "@/types";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
      toaster.create({
        title: response?.data?.auth?.message,
        type: "success",
      });
      //Clear cart and wishlist count
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
    },
    onError: (error: ApiErrorResponse) => {
      toaster.create({
        title: error?.response?.data?.message,
        type: "error",
      });
    },
  });
};
