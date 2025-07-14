import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useRemoveWishlistMutation } from "@/hooks/api";
import { WishlistFormType } from "@/types";

export const useRemoveFromWishlist = ({
  selectedItems,
  wishlistData,
  setSelectedItems,
}: {
  wishlistData: WishlistFormType[];
  selectedItems: Set<string>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
}) => {
  const queryClient = useQueryClient();
  const { mutate: removewishlist, isPending } = useRemoveWishlistMutation();

  const handleRemoveWishlist = () => {
    removewishlist(
      {
        item_code: [...selectedItems]
          .map((item) => wishlistData.find((it) => it.id === item))
          .map((item) => item?.title || ""),
        guid: localStorage.getItem("guest_id"),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["wishlist"] });
          setSelectedItems(new Set());
          queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
        },
      }
    );
  };

  return { handleRemoveWishlist, isPending };
};
