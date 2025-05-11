"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedBrandsImages } from "@/hooks/app";
import { Autoplay } from "swiper/modules";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { VisibleSection } from "@/components/ui/visibleSection";

import type { Swiper as SwiperClass } from "swiper";
import { Navigation } from "@/components";

export const BrandCategory = () => {
  const router = useRouter();
  const featureImages = useFeaturedBrandsImages();
  const { data: featuredBrandsData } = useHomePageQuery();
  const { data: config } = useConfigQuery();

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
    <VisibleSection visibility={config?.featured_brands_visibility}>
      <VStack
        alignItems="stretch"
        gap={{
          base: "20px",
          md: "32px",
        }}
        px={{
          base: "20px",
          md: "40px",
        }}
        py={{
          base: "40px",
          lg: "64px",
          "2xl": "120px",
        }}
      >
        <VStack textAlign="center" gap="0">
          <Text
            variant="subtitle1"
            fontWeight="400"
            fontSize={{
              base: "12px",
              md: "14px",
              "2xl": "16px",
            }}
            color="system.text.light.light"
          >
            {featuredBrandsData.featured_brand_subtitle}
          </Text>

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
            {featuredBrandsData.featured_brand_title}
          </Heading>

          <Text
            variant={{
              base: "paragraphSmall",
              md: "paragraphRegular",
            }}
            color="system.text.normal.light"
          >
            {featuredBrandsData.featured_brand_description}
          </Text>
        </VStack>

        {/* Swiper Slider */}
        <Box position={"relative"}>
          <Box position={"absolute"} top={-10} right={0}>
            <Navigation
              swiper={swiperInstance}
              isBeginning={isBeginning}
              isEnd={isEnd}
            />
          </Box>
          <Swiper
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 5 },
            }}
            spaceBetween={20}
            onSlideChange={handleSwiper}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
          >
            {featureImages.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() =>
                  router.push(`${ROUTES.APP.PRODUCTS}?brands=${item.name}`)
                }
              >
                <Box
                  bg="white"
                  transition="all 0.3s"
                  py={"2"}
                  m={{ base: "5px", md: "8px", lg: "10px" }}
                  _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
                  cursor="pointer"
                >
                  <Box
                    position="relative"
                    width="100%"
                    py="6"
                    height={{ base: "140px", "2xl": "100px" }}
                    borderRadius="md"
                    overflow="hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "contain", objectPosition: "top" }}
                    />
                  </Box>
                  {/* <Text
                    mt="3"
                    textAlign="center"
                    variant={{ base: "paragraphSmall", md: "paragraphRegular" }}
                    color={"system.text.normal.light"}
                  >
                    {toTitleCase(item.name)}
                  </Text> */}
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </VStack>
    </VisibleSection>
  );
};
