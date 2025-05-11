"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedCategoryImages } from "@/hooks/app";
import { Autoplay } from "swiper/modules";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { VisibleSection } from "@/components/ui/visibleSection";
import { toTitleCase } from "@/utils"; // custom navigation

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
        maxW={"6xl"}
        mx={"auto"}
        gap={{
          base: "20px",
          md: "32px",
        }}
        py={{
          base: "40px",
          lg: "64px",
          "2xl": "120px",
        }}
      >
        <VStack align={"flex-start"} gap="0" maxW={"6xl"}>
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
            variant="subtitle1"
            fontWeight="400"
            fontSize={{
              base: "12px",
              md: "14px",
              "2xl": "16px",
            }}
            color="system.text.light.light"
          >
            {featuredCategoryData.fearued_subtitle}
          </Text>
          <Text
            variant={{
              base: "paragraphSmall",
              md: "paragraphRegular",
            }}
            color="system.text.normal.light"
          >
            {featuredCategoryData.featured_category_description}
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
              1024: { slidesPerView: 4 },
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
                  router.push(`${ROUTES.APP.PRODUCTS}?category=${item.name}`)
                }
              >
                <Box
                  transition="all 0.3s"
                  py="6"
                  px="4"
                  m={{ base: "5px", md: "8px", lg: "10px" }}
                  cursor="pointer"
                  position="relative"
                  textAlign="center"
                >
                  <Box
                    position="relative"
                    width="100%"
                    paddingTop="100%"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        objectFit="contain"
                      />
                    </Box>
                  </Box>

                  <Box
                    position="absolute"
                    bottom="10px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="gray.50"
                    shadow={"md"}
                    borderRadius="full"
                    px="4"
                    py="1"
                  >
                    <Text fontSize="sm" fontWeight="medium" color="gray.800">
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
