"use client";

import { useLayoutEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { DummyProfileImage, ProductImage1 } from "@/assets/image";
import { toaster } from "@/components";
import { useCartMutation, useWishlistMutation } from "@/hooks/api";
import { useVariantStore } from "@/store";
import { IndividualProductAPIType, WishlistPayloadType } from "@/types";

export const useProductDetailReviews = () => {
  return {
    reviews: [
      {
        name: "SneakerGuru23",
        profile: DummyProfileImage,
        message:
          "The AJ1 Retro is pure nostalgia. Love the Royal Blue variant I grabbed last month. Super stylish but could use a bit more cushioning for all-day wear",
      },
      {
        name: "KicksKing_99",
        profile: ProductImage1,
        message:
          "The AJ1 Retro is pure nostalgia. Love the Royal Blue variant I grabbed last month. Super stylish but could use a bit more cushioning for all-day wear",
      },
    ],
  };
};

// hook to manage the product images
export const useProductImages = (productDetail: IndividualProductAPIType) => {
  const { activeVariant } = useVariantStore();

  let productImages: string[] = [];

  if (activeVariant) {
    const selectedVariantDetail = productDetail?.variants?.find(
      (variant) => variant.item_code === activeVariant
    );

    // only update the variant images when variant is found
    if (selectedVariantDetail) {
      productImages = [
        selectedVariantDetail?.custom_image_1_link,
        selectedVariantDetail?.custom_image_2_link,
        selectedVariantDetail?.custom_image_3_link,
        selectedVariantDetail?.custom_image_4_link,
      ];
    }
  } else {
    productImages = [
      productDetail?.custom_image_1_link,
      productDetail?.custom_image_2_link,
      productDetail?.custom_image_3_link,
      productDetail?.custom_image_4_link,
    ];
  }

  productImages = productImages.filter(Boolean).map((url) => String(url));

  const [selectedImage, setSelectedImage] = useState(productImages[0] || "");

  useLayoutEffect(() => {
    setSelectedImage(productImages[0]);
  }, [JSON.stringify(productImages)]);

  return { productImages, selectedImage, setSelectedImage };
};

// hook to handle add to cart operation inside product detail page
export const useProductDetailCartMutation = () => {
  const { mutate, isPending } = useCartMutation();
  const queryClient = useQueryClient();

  const handleAddToCart = (payload: WishlistPayloadType) => {
    mutate(payload, {
      onSuccess: (response) => {
        toaster.create({
          type: "success",
          title: response?.data?.data ?? "",
        });

        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
        queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      },
      onError: () => {},
    });
  };

  return {
    handleAddToCart,
    isPending,
  };
};

// hook to handle add to wishlist operation inside product detail page
export const useProductDetailWishlist = () => {
  const { mutate, isPending } = useWishlistMutation();
  const queryClient = useQueryClient();

  const handleAddToWishlist = (payload: WishlistPayloadType) => {
    mutate(payload, {
      onSuccess: (response) => {
        toaster.create({
          type: "success",
          title: response?.data?.data ?? "",
        });
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
      },
      onError: () => {},
    });
  };

  return {
    handleAddToWishlist,
    isPending,
  };
};
