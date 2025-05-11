import { useMutation, useQuery } from "@tanstack/react-query";

import { getWishlistData, removefromwishlist, wishlist } from "@/api";
import { toaster } from "@/components";
import { formatWishlistData } from "@/utils";

export const useWishlistMutation = () => {
  return useMutation({
    mutationFn: wishlist,
  });
};

export const useRemoveWishlistMutation = () => {
  return useMutation({
    mutationFn: removefromwishlist,
    onSuccess: (response) => {
      toaster.create({
        type: "success",
        title: response.data.Data ?? "",
      });
    },
  });
};

export const useWishlistQuery = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlistData,
    select: (response) => {
      const wishlist = response?.data.data;
      return formatWishlistData(wishlist);
    },
  });
};
