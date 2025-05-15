"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedCategoryImages } from "@/hooks/app";
import { Autoplay } from "swiper/modules";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { VisibleSection } from "@/components/ui/visibleSection";
import { toTitleCase } from "@/utils";
import type { Swiper as SwiperClass } from "swiper";
import { Navigation } from "@/components";

export const FeaturedCategory = () => {
  const router = useRouter();
  const featureImages = useFeaturedCategoryImages();
  const { data: featuredCategoryData } = useHomePageQuery();
  const { data: config } = useConfigQuery();

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Responsive values
  const showNavigation = useBreakpointValue({ base: false, md: true });
  const autoplayDelay = useBreakpointValue({ base: 5000, md: 3000 });
  const labelPadding = useBreakpointValue({ base: 2, md: 4 });

  // Calculate if we need to force scrolling
  const shouldForceScroll = featureImages.length <= 6;

  const handleSwiper = (swiper: SwiperClass) => {
    setSwiperInstance(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    swiper.on("slideChange", () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  };

  return (
    <VisibleSection visibility={config?.featured_visibility}>
      <VStack
        alignItems="stretch"
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        gap={{ base: 5, md: 8 }}
        py={{ base: 8, md: 12, lg: 16, "2xl": 20 }}
      >
        <VStack align={{ base: "center", md: "flex-start" }} gap={2}>
          <Heading
            fontSize={{
              base: "16px",
              md: "20px",
              lg: "28px",
            }}
            marginTop={{
              base: "4px",
              md: "12px",
            }}
            marginBottom={{
              base: "0",
              md: "8px",
            }}
          >
            {featuredCategoryData.featured_category_title}
          </Heading>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="system.text.light.light"
            textAlign={{ base: "center", md: "left" }}
          >
            {featuredCategoryData.fearued_subtitle}
          </Text>

          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="system.text.normal.light"
            textAlign={{ base: "center", md: "left" }}
            maxW="3xl"
          >
            {featuredCategoryData.featured_category_description}
          </Text>
        </VStack>

        {/* Swiper Slider with forced scrolling */}
        <Box position="relative">
          {showNavigation && (
            <Box position="absolute" top={-20} right={5} zIndex={1}>
              <Navigation
                swiper={swiperInstance}
                isBeginning={isBeginning}
                isEnd={isEnd}
              />
            </Box>
          )}

          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              480: {
                slidesPerView: 2.2,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 6,
                spaceBetween: 28,
              },
            }}
            onSwiper={handleSwiper}
            modules={[Autoplay]}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            grabCursor={true}
            loopAdditionalSlides={shouldForceScroll ? 2 : 1}
          >
            {featureImages.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  transition="all 0.3s ease"
                  p={{ base: 2, md: 3 }}
                  m={{ base: 1, md: 2 }}
                  cursor="pointer"
                  onClick={() =>
                    router.push(`${ROUTES.APP.PRODUCTS}?category=${item.name}`)
                  }
                >
                  <Box
                    position="relative"
                    width="100%"
                    paddingTop="100%"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </Box>

                  <Box
                    position="absolute"
                    bottom={{ base: 1, md: 2 }}
                    left="50%"
                    transform="translateX(-50%)"
                    bg="whiteAlpha.900"
                    shadow="md"
                    borderRadius="full"
                    px={labelPadding}
                    py={1}
                    minWidth="max-content"
                  >
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      fontWeight="medium"
                      color="gray.800"
                    >
                      {toTitleCase(item.name)}
                    </Text>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}

            {/* Duplicate slides for better looping when we have few items */}
            {shouldForceScroll &&
              featureImages.map((item, index) => (
                <SwiperSlide key={`duplicate-${index}`}>
                  <Box
                    transition="all 0.3s ease"
                    p={{ base: 2, md: 3 }}
                    m={{ base: 1, md: 2 }}
                    cursor="pointer"
                    onClick={() =>
                      router.push(
                        `${ROUTES.APP.PRODUCTS}?category=${item.name}`
                      )
                    }
                  >
                    <Box
                      position="relative"
                      width="100%"
                      paddingTop="100%"
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </Box>

                    <Box
                      position="absolute"
                      bottom={{ base: 1, md: 2 }}
                      left="50%"
                      transform="translateX(-50%)"
                      bg="whiteAlpha.900"
                      shadow="md"
                      borderRadius="full"
                      px={labelPadding}
                      py={1}
                      minWidth="max-content"
                    >
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="medium"
                        color="gray.800"
                      >
                        {toTitleCase(item.name)}
                      </Text>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      </VStack>
    </VisibleSection>
  );
};
