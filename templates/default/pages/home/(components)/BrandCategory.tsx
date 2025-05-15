"use client";

import Image from "next/image";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedBrandsImages } from "@/hooks/app";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { VisibleSection } from "@/components/ui/visibleSection";
import { FaArrowRightLong } from "react-icons/fa6";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export const BrandCategory = () => {
  const router = useRouter();
  const featureImages = useFeaturedBrandsImages();
  const { data: featuredBrandsData } = useHomePageQuery();
  const { data: config } = useConfigQuery();

  const shouldForceScroll = featureImages.length <= 5;
  const baseSlides = shouldForceScroll ? 4.9 : 5;

  // Safely access the data with optional chaining and fallback values
  const featuredBrandTitle =
    featuredBrandsData?.featured_brand_title;
  const featuredBrandSubtitle =
    featuredBrandsData?.featured_brand_subtitle ;
  const featuredBrandDescription =
    featuredBrandsData?.featured_brand_description ;

  return (
    <VisibleSection visibility={config?.featured_brands_visibility}>
      <VStack
        maxW="6xl"
        mx="auto"
        alignItems="stretch"
        gap={{ base: 5, md: 8 }}
        px={{ base: 4, md: 6 }}
        py={{ base: 8, md: 12, lg: 16, "2xl": 20 }}
      >
        <Flex
          justifyContent="space-between"
          w="full"
          direction={{ base: "column", sm: "row" }}
          gap={{ base: 4, md: 6 }}
        >
          <VStack align={{ base: "center", sm: "flex-start" }} gap={1}>
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
              {featuredBrandTitle}
            </Heading>

            <Text
              fontSize={{ base: "xs", sm: "sm", "2xl": "md" }}
              color="system.text.light.light"
              textAlign={{ base: "center", sm: "left" }}
            >
              {featuredBrandSubtitle}
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="system.text.normal.light"
              textAlign={{ base: "center", sm: "left" }}
              maxW={{ base: "full", md: "3xl" }}
            >
              {featuredBrandDescription}
            </Text>
          </VStack>

          <Button
            color="white"
            bg="#FF6996"
            borderRadius="3xl"
            size={{
              base: "sm",
              md: "md",
            }}
            alignSelf={{ base: "center", sm: "flex-end" }}
            // onClick={() => router.push(ROUTES.APP.ABOUT_US)}
          >
            View All Brands <FaArrowRightLong />
          </Button>
        </Flex>

        {/* Swiper Carousel with forced scrolling */}
        <Box w="full" overflow="hidden" px={{ base: 0, md: 4 }}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={baseSlides}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={800}
            grabCursor={true}
            breakpoints={{
              0: {
                slidesPerView: shouldForceScroll ? 1.7 : 2,
              },
              480: {
                slidesPerView: shouldForceScroll ? 2.7 : 3,
              },
              768: {
                slidesPerView: shouldForceScroll ? 3.7 : 4,
              },
              1024: {
                slidesPerView: baseSlides,
              },
            }}
          >
            {featureImages.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  bg="white"
                  transition="all 0.3s ease"
                  p={{ base: 2, md: 3 }}
                  m={{ base: 1, md: 2 }}
                  borderRadius="md"
                  _hover={{
                    boxShadow: "lg",
                    transform: "translateY(-4px)",
                    zIndex: 1,
                  }}
                  cursor="pointer"
                  onClick={() =>
                    router.push(`${ROUTES.APP.PRODUCTS}?brands=${item.name}`)
                  }
                >
                  <Box
                    position="relative"
                    width="100%"
                    height={{
                      base: "100px",
                      sm: "120px",
                      md: "140px",
                      lg: "160px",
                      xl: "180px",
                    }}
                    borderRadius="md"
                    overflow="hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        padding: "8px",
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Box>
                </Box>
              </SwiperSlide>
            ))}

            {/* Duplicate slides for better looping */}
            {shouldForceScroll &&
              featureImages.map((item, index) => (
                <SwiperSlide key={`duplicate-${index}`}>
                  <Box
                    bg="white"
                    transition="all 0.3s ease"
                    p={{ base: 2, md: 3 }}
                    m={{ base: 1, md: 2 }}
                    borderRadius="md"
                    _hover={{
                      boxShadow: "lg",
                      transform: "translateY(-4px)",
                      zIndex: 1,
                    }}
                    cursor="pointer"
                    onClick={() =>
                      router.push(`${ROUTES.APP.PRODUCTS}?brands=${item.name}`)
                    }
                  >
                    <Box
                      position="relative"
                      width="100%"
                      height={{
                        base: "100px",
                        sm: "120px",
                        md: "140px",
                        lg: "160px",
                        xl: "180px",
                      }}
                      borderRadius="md"
                      overflow="hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                          padding: "8px",
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
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
