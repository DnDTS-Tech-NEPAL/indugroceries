"use client";
import { useSkinTypePageQuery } from "@/hooks/api";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { generateNextPath } from "@/utils";
import { ROUTES } from "@/constants";

export const ShopBySkinType = () => {
  const router = useRouter();
  const { data: skinTypeData } = useSkinTypePageQuery();

  const displayedSkinTypes = skinTypeData || [];
  const shouldForceScroll = displayedSkinTypes.length <= 4;

  return (
    <VStack gap={8} py={16} textAlign="center" maxW="7xl" mx="auto">
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={13}>
        Shop By Skin Type
      </Heading>

      {/* Swiper Carousel */}
      <Box w="full" overflow="hidden" px={{ base: 0, md: 4 }}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={shouldForceScroll ? 3.9 : 4}
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
              slidesPerView: shouldForceScroll ? 1 : 1,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: shouldForceScroll ? 3 : 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: shouldForceScroll ? 3 : 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: shouldForceScroll ? 3 : 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: shouldForceScroll ? 4 : 4,
              spaceBetween: 30,
            },
          }}
        >
          {displayedSkinTypes.map((skinType) => (
            <SwiperSlide key={skinType.name}>
              <VStack
                justify="center"
                align="center"
                position="relative"
                gap={4}
                cursor="pointer"
                onClick={() => {
                               router.push(
                                 generateNextPath(ROUTES.APP.INDIVIDUAL_SKIN_TYPE, {skinTypeName: skinType.name}) 

                               
                               );
                             }}
              >
                <Box
                  width={{
                    base: "180px",
                    sm: "180px",
                    md: "200px",
                    lg: "240px",
                    xl: "270px",
                  }}
                  height={{
                    base: "180px",
                    sm: "180px",
                    md: "200px",
                    lg: "240px",
                    xl: "270px",
                  }}
                  borderRadius="full"
                  overflow="hidden"
                  position="relative"
                >
                  <Image
                    src={skinType.skin_type_image_link || "/placeholder.svg"}
                    alt={skinType.name}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />

                  {/* Text overlay  */}
                  {/* <Box
                    position="absolute"
                    top={{
                      base: "25px",
                      sm: "18px",
                      md: "25px",
                      lg: "45px",
                      xl: "55px",
                      "2xl": "55px",
                    }}
                    right={{
                      base: "25px",
                      sm: "18px",
                      md: "25px",
                      lg: "45px",
                      xl: "55px",
                      "2xl": "65px",
                    }}
                    bg="#FF6996"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    fontSize={{
                      base: "xs",
                      sm: "xs",
                      md: "sm",
                      lg: "md",
                      xl: "lg",
                    }}
                    fontWeight="bold"
                    width={{
                      base: "70px",
                      sm: "70px",
                      md: "70px",
                      lg: "85px",
                      xl: "95px",
                      "2xl": "105px",
                    }}
                    height={{
                      base: "70px",
                      sm: "70 px",
                      md: "70px",
                      lg: "85px",
                      xl: "95px",
                      "2xl": "105px",
                    }}
                    textAlign="center"
                    p={2}
                    boxShadow="md"
                  >
                    <Text
                      lineHeight="1.2"
                      wordBreak="break-word"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {skinType.name}
                    </Text>
                  </Box> */}
                </Box>
              </VStack>
            </SwiperSlide>
          ))}

          {/* Duplicate slides for better looping */}
          {shouldForceScroll &&
            displayedSkinTypes.map((skinType, index) => (
              <SwiperSlide key={`duplicate-${index}`}>
                <VStack
                  justify="center"
                  align="center"
                  position="relative"
                  gap={4}
                  cursor="pointer"
                 onClick={() => {
                               router.push(
                                 generateNextPath(ROUTES.APP.INDIVIDUAL_SKIN_TYPE, {skinTypeName: skinType.name}) 

                               
                               );
                             }}
                >
                  <Box
                    width={{
                      base: "180px",
                      sm: "180px",
                      md: "200px",
                      lg: "240px",
                      xl: "270px",
                    }}
                    height={{
                      base: "180px",
                      sm: "180px",
                      md: "200px",
                      lg: "240px",
                      xl: "270px",
                    }}
                    borderRadius="full"
                    overflow="hidden"
                    position="relative"
                  >
                    <Image
                      src={skinType.skin_type_image_link || "/placeholder.svg"}
                      alt={skinType.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />

                    {/* Text overlay  */}
                    {/* <Box
                      position="absolute"
                      top={{
                        base: "25px",
                        sm: "18px",
                        md: "25px",
                        lg: "45px",
                        xl: "55px",
                        "2xl": "55px",
                      }}
                      right={{
                        base: "25px",
                        sm: "18px",
                        md: "25px",
                        lg: "45px",
                        xl: "55px",
                        "2xl": "65px",
                      }}
                      bg="#FF6996"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="full"
                      fontSize={{
                        base: "xs",
                        sm: "xs",
                        md: "sm",
                        lg: "md",
                        xl: "lg",
                      }}
                      fontWeight="bold"
                      width={{
                        base: "70px",
                        sm: "70px",
                        md: "70px",
                        lg: "85px",
                        xl: "95px",
                        "2xl": "105px",
                      }}
                      height={{
                        base: "70px",
                        sm: "70 px",
                        md: "70px",
                        lg: "85px",
                        xl: "95px",
                        "2xl": "105px",
                      }}
                      textAlign="center"
                      p={2}
                      boxShadow="md"
                    >
                      <Text
                        lineHeight="1.2"
                        wordBreak="break-word"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {skinType.name}
                      </Text>
                    </Box> */}
                  </Box>
                </VStack>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </VStack>
  );
};
