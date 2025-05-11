"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { VStack, Heading, HStack, Text, Grid, Spinner } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/navigation";

import { ProductCard, Navigation, EmptyState } from "@/components";
import { useProductSlider } from "@/hooks/app";
import { ProductSectionProps } from "@/types";

import "./swiper.css";
import { Autoplay } from "swiper/modules";

export const ProductSection = ({ type }: ProductSectionProps) => {
  const { swiper, isBeginning, isEnd, onSwiper, onSlideChange, sectionData } =
    useProductSlider(type);

  const { title, subtitle, products, isLoading } = sectionData;

  return (
    <VStack
      alignItems="stretch"
      gap="32px"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "40px", lg: "60px", "2xl": "120px" }}
    >
      <HStack justifyContent="space-between">
        <VStack alignItems="start" gap={{ base: "0", md: "8px" }}>
          <Heading fontSize={{ base: "16px", lg: "24px", xl: "28px" }}>
            {title}
          </Heading>
          <Text
            variant={{ base: "paragraphSmall", md: "paragraphRegular" }}
            color="system.text.normal.light"
          >
            {subtitle}
          </Text>
        </VStack>
        <Navigation swiper={swiper} isBeginning={isBeginning} isEnd={isEnd} />
      </HStack>

      {isLoading ? (
        <Grid placeItems="center" height="300px">
          <Spinner />
        </Grid>
      ) : products.length > 0 ? (
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          spaceBetween={20}
          className="mySwiper"
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {products.map((productInfo) => (
            <SwiperSlide key={productInfo.title}>
              <ProductCard {...productInfo} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <EmptyState />
      )}
    </VStack>
  );
};
