import { useMutation } from "@tanstack/react-query";

import { addPromo } from "@/api";
import { toaster } from "@/components";
import { PromoCouponType } from "@/types";

export const useAddPromo = () => {
  return useMutation({
    mutationFn: (data: PromoCouponType) => addPromo(data),
    onSuccess: (response) => {
      const message = response?.data?.message;

      if (message === "Invalid Promo Code.") {
        toaster.create({
          type: "error",
          title: message,
        });
      } else if (message !== "No Promo Coupon Applied.") {
        toaster.create({
          type: "success",
          title: message,
        });
      }
    },
  });
};
