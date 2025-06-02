"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedCategoryImages } from "@/hooks/app";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { VisibleSection } from "@/components/ui/visibleSection";
import { toTitleCase } from "@/utils";
import type { Swiper as SwiperClass } from "swiper";

export const FeaturedCategory = () => {
  const router = useRouter();
  const featureImages = useFeaturedCategoryImages();
  const { data: featuredCategoryData } = useHomePageQuery();
  const { data: config } = useConfigQuery();

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const autoplayDelay = useBreakpointValue({ base: 5000, md: 3000 });

  const shouldForceScroll = featureImages.length > 4;

  const handleSwiper = (swiper: SwiperClass) => {
    setSwiperInstance(swiper);
  };

  return (
    <VisibleSection visibility={config?.featured_visibility}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="space-between"
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 16 }}
        gap={{ base: 8, md: 10, lg: 12 }}
      >
        {/* LEFT: Heading and Description */}
        <Box
          flex={{ lg: 1 }}
          maxW={{ base: "100%", lg: "40%" }}
          alignSelf="flex-start"
        >
          <Heading
            fontSize={{ base: "20px", md: "28px", lg: "36px" }}
            fontWeight="extrabold"
            lineHeight="short"
            mb={2}
          >
            {featuredCategoryData.featured_category_title}
          </Heading>
          <Text fontSize="md" color="gray.600" mb={2}>
            {featuredCategoryData.fearued_subtitle}
          </Text>
          <Text fontSize="sm" color="gray.500" maxW="lg">
            {featuredCategoryData.featured_category_description}
          </Text>
        </Box>

        {/* RIGHT: Swiper Slider */}
        <Box flex={{ lg: 2 }} w="full" maxW={{ base: "100%", lg: "40%" }}>
          <Swiper
            breakpoints={{
              320: { slidesPerView: 2},
              640: { slidesPerView: 3},
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 4},
            }}
            onSwiper={handleSwiper}
            modules={[Autoplay]}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={shouldForceScroll}
            grabCursor
          >
            {featureImages.map((item, index) => (
              <SwiperSlide key={index}>
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  p={2}
                  onClick={() =>
                    router.push(`${ROUTES.APP.PRODUCTS}?category=${item.name}`)
                  }
                >
                  <Box
                    w="72px"
                    h="72px"
                    borderRadius="full"
                    overflow="hidden"
                    mb={2}
                    bg="gray.100"
                    position="relative"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Text fontSize="sm" fontWeight="medium" textAlign="center">
                    {toTitleCase(item.name)}
                  </Text>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Flex>
    </VisibleSection>
  );
};
