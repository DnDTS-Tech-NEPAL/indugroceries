"use client";

import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { Swiper as SwiperCore, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useSkinTypePageQuery } from "@/hooks/api";
import "swiper/css";
import "swiper/css/pagination";

export const SkinTypeCarousel = ({
  skinTypeName,
}: {
  skinTypeName: string;
}) => {
  const { data: skinTypeImageData = [] } = useSkinTypePageQuery();
  const selectedSkinType = skinTypeImageData.find(
    (skinType) => skinType?.name?.toLowerCase() === skinTypeName?.toLowerCase()
  );
  const heroImages = selectedSkinType
    ? [
        selectedSkinType.hero_image_1_link,
        selectedSkinType.hero_image_2_link,
        selectedSkinType.hero_image_3_link,
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
                    alt={`Category Hero ${index + 1}`}
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
