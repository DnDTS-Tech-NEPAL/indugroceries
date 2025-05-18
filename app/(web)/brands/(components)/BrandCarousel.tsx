"use client";

import Image from "next/image";
import { Box } from "@chakra-ui/react";

import { useHomePageQuery } from "@/hooks/api";
import { VisibleSection } from "@/components/ui/visibleSection";
import { Swiper } from "@/components";

export const BrandCarousel = () => {
  const { data: summerSaleData } = useHomePageQuery();
  const fallbackImage = "/fallback.jpg";

  const brandImages = [
    summerSaleData?.sale_image_url,
    summerSaleData?.sale_image_url,
    summerSaleData?.sale_image_url,
  ];
  const slides = brandImages.map((src, index) => (
    <Box key={index} px={{ base: "0", md: "4" }}>
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
          src={src || fallbackImage}
          alt={`Brand ${index + 1}`}
          fill
          style={{
            objectFit: "cover",
          }}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
          priority={index === 0}
        />
      </Box>
    </Box>
  ));

  return (
    <VisibleSection visibility={summerSaleData?.sale_visibility}>
      <Box
        width={{ base: "100%", md: "7xl" }}
        maxWidth="100%"
        mx="auto"
        px={{ base: "0", md: "4" }}
        py={{ base: "4", md: "8", lg: "12" }}
        position="relative"
      >
        <Swiper slides={slides} direction="horizontal" />
      </Box>
    </VisibleSection>
  );
};
