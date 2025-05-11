"use client";

import { useState } from "react";
import { Swiper as SwiperType } from "swiper";

import {
  useBestSellersQuery,
  useHomePageQuery,
  useNewArrivalsQuery,
} from "@/hooks/api";

export const useProductSlider = (type: "bestSellers" | "newArrivals") => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const onSwiper = (swiperInstance: SwiperType) => {
    setSwiper(swiperInstance);
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  const onSlideChange = (swiperInstance: SwiperType) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  const { data: homeData } = useHomePageQuery();
  const { data: bestSellerData, isLoading: isBestSellerLoading } =
    useBestSellersQuery();
  const { data: newArrivalsData, isLoading: isNewArrivalsLoading } =
    useNewArrivalsQuery();

  const sectionData = {
    bestSellers: {
      title: homeData?.best_seller_title,
      subtitle: homeData?.best_seller_subtitle,
      products: bestSellerData || [],
      isLoading: isBestSellerLoading,
    },
    newArrivals: {
      title: homeData?.new_arrival_title,
      subtitle: homeData?.new_arrival_subtitle,
      products: newArrivalsData || [],
      isLoading: isNewArrivalsLoading,
    },
  };

  return {
    swiper,
    isBeginning,
    isEnd,
    onSwiper,
    onSlideChange,
    sectionData: sectionData[type],
  };
};
