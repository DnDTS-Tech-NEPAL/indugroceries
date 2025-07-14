import { useMutation, useQuery } from "@tanstack/react-query";

import { addToCart, addToCartNew, getCartData, removeFromCart } from "@/api";
import { toaster } from "@/components";
import { formatCartData } from "@/utils";

export const useCartMutation = () => {
  return useMutation({
    mutationFn: addToCart,
  });
};

export const useCartQuery = (guid: string) => {
  return useQuery({
    queryKey: ["cart", guid],
    queryFn: () => getCartData(guid),
    select: (response) => {
      const cart = response?.data?.data;
      return formatCartData(cart);
    },
  });
};

export const useRemoveCartMutation = () => {
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: (response) => {
      toaster.create({
        type: "success",
        title: response.data.Data ?? "",
      });
    },
  });
};

export const useCartMutationNew = () => {
  return useMutation({
    mutationFn: addToCartNew,
  });
};
