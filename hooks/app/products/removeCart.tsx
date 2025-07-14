"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useRemoveCartMutation } from "@/hooks/api";
import { ProductDetail } from "@/types";

export const useRemoveFromCart = ({
  items,
  selectedItems,
  setSelectedItems,
  guid,
}: {
  items: ProductDetail[];
  guid: string;
  selectedItems: Set<string>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
}) => {
  const queryClient = useQueryClient();
  const { mutate: removeFromCart, isPending } = useRemoveCartMutation();

  const handleRemoveFromCart = () => {
    removeFromCart(
      {
        item_code: [...selectedItems]
          .map((item) => items.find((it) => it.id === item))
          .map((item) => item?.title || ""),
        guid,
      },

      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"], guid });
          setSelectedItems(new Set());
          queryClient.invalidateQueries({ queryKey: ["cart-count"] });
        },
      }
    );
  };
  return { handleRemoveFromCart, isPending };
};
