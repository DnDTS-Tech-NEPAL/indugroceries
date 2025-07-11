"use client";

import { orderPost } from "@/api";
import { toaster } from "@/components";
import { ROUTES } from "@/constants";
import { ApiErrorResponse, OrderPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useOrderMutation = (selectedPaymentMethod: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderPostType) =>
      orderPost({
        items: data.items,
        selectedPaymentMethod,
        delivery_note: data.delivery_note,
      }),
    onSuccess: (response) => {
      toaster.create({
        title: response?.data?.data?.message,
        type: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["cart-count"] });

      if (selectedPaymentMethod === "Online Payment") {
        const paymentUrl = response?.data?.data?.payment_url;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      } else {
        router.push(ROUTES.USER.PROFILE);
      }
    },
    onError: (error: ApiErrorResponse) => {
      toaster.create({
        title: error?.response?.data?.message,
        type: "error",
      });
    },
  });
};
