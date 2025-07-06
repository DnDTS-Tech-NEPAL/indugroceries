"use client";

import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { Swiper as SwiperCore, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useBrandsListQuery } from "@/hooks/api";
import "swiper/css";
import "swiper/css/pagination";

export const SkinTypeCarousel = ({ brandName }: { brandName: string }) => {
  const { data: brandImageData = [] } = useBrandsListQuery();

  // Find the brand that matches the brandName
  const selectedBrand = brandImageData.find(
    (brand) => brand.name?.toLowerCase() === brandName.toLowerCase()
  );

  const heroImages = selectedBrand
    ? [
        selectedBrand.custom_hero_image_1_link,
        selectedBrand.custom_hero_image_2_link,
        selectedBrand.custom_hero_image_3_link,
      ].filter(Boolean)
    : [];

  return (
    <>
      {heroImages.length > 0 ? (
        <Box
          width={{ base: "100%", md: "7xl" }}
          maxWidth="100%"
          mx="auto"
          px={{ base: "0", md: "4" }}
          py={{ base: "4", md: "8", lg: "12" }}
          position="relative"
        >
          <SwiperCore
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={16}
            slidesPerView={1}
          >
            {heroImages.map((src, index) => (
              <SwiperSlide key={index}>
                <Box
                  borderRadius={{ base: "none", md: "xl" }}
                  overflow="hidden"
                  position="relative"
                  width="100%"
                  height={{
                    base: "150px",
                    sm: "200px",
                    md: "300px",
                    lg: "400px",
                    xl: "450px",
                  }}
                >
                  <Image
                    src={src}
                    alt={`${brandName} - Hero Image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                    priority={index === 0}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </SwiperCore>
        </Box>
      ) : null}
    </>
  );
};
