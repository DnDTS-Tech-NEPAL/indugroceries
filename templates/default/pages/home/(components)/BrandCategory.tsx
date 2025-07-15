"use client";

import Image from "next/image";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedBrandsImages } from "@/hooks/app";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { VisibleSection } from "@/components/ui/visibleSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useRef } from "react";
import SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const BrandCategory = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperCore | null>(null);
  const featureImages = useFeaturedBrandsImages();
  const { data: featuredBrandsData } = useHomePageQuery();
  const { data: config } = useConfigQuery();

  const shouldForceScroll = featureImages.length <= 5;
  const baseSlides = shouldForceScroll ? 4.9 : 5;

  const featuredBrandTitle = featuredBrandsData?.featured_brand_title;
  const featuredBrandSubtitle = featuredBrandsData?.featured_brand_subtitle;
  const featuredBrandDescription =
    featuredBrandsData?.featured_brand_description;

  const handleNavigation = (direction: "left" | "right") => {
    if (swiperRef.current) {
      if (direction === "right") {
        swiperRef.current.slideNext();
      } else {
        swiperRef.current.slidePrev();
      }
    }
  };

  return (
    <VisibleSection visibility={config?.featured_brands_visibility}>
      <VStack
        maxW="5xl"
        mx="auto"
        alignItems="stretch"
        gap={{ base: 5, md: 8 }}
        px={{ base: 4, md: 6 }}
        py={{ base: 8, md: 8, lg: 12, "2xl": 16 }}
      >
        <VStack align={{ base: "center" }} gap={1}>
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

        {/* Swiper Carousel with new arrow navigation */}
        <Box
          w="full"
          overflow="hidden"
          position="relative"
          px={{ base: 0, md: 12 }}
        >
          {/* Left Arrow Button */}
          <Button
            aria-label="Previous brand"
            onClick={() => handleNavigation("left")}
            position="absolute"
            left={{ base: 2, md: 4 }}
            top="50%"
            transform="translateY(-50%)"
            width="20px"
            height="20px"
            zIndex={10}
            boxShadow="md"
            bg="white"
            color="black"
            rounded="full"
            _hover={{ bg: "gray.100" }}
          >
            <ChevronLeft />
          </Button>

          {/* Right Arrow Button */}
          <Button
            aria-label="Next brand"
            onClick={() => handleNavigation("right")}
            position="absolute"
            right={{ base: 2, md: 4 }}
            top="50%"
            transform="translateY(-50%)"
            width="20px"
            height="20px"
            zIndex={10}
            boxShadow="md"
            bg="white"
            color="black"
            rounded="full"
            _hover={{ bg: "gray.100" }}
          >
            <ChevronRight />
          </Button>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
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
                slidesPerView: shouldForceScroll ? 1.7 : 1,
              },
              480: {
                slidesPerView: shouldForceScroll ? 2.7 : 2,
              },
              768: {
                slidesPerView: shouldForceScroll ? 3.7 : 3,
              },
              1024: {
                slidesPerView: shouldForceScroll ? 4.7 : 4,
              },
              1440: {
                slidesPerView: shouldForceScroll ? 5.7 : 5,
              },
            }}
          >
            {featureImages.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  transition="all 0.3s ease"
                  p={{ base: 2, md: 3 }}
                  borderRadius="md"
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
