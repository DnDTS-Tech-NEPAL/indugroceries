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
              slidesPerView: shouldForceScroll ? 2 : 2,
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
                onClick={() =>
                  router.push(`/products?skin_type=${skinType.name}`)
                }
              >
                <Box
                  width={{
                    base: "120px",
                    sm: "140px",
                    md: "200px",
                    lg:"240px",
                    xl: "290px",
                  }}
                  height={{
                    base: "120px",
                    sm: "140px",
                    md: "200px",
                    lg:"240px",
                    xl: "290px",
                  }}
                
                  borderRadius="full"
                  overflow="hidden"
                  position="relative"
                >
                  <Image
                    src={skinType.image || "/placeholder.svg"}
                    alt={skinType.name}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />

                  {/* Text overlay  */}
                  <Box
                    position="absolute"
                    top={{
                      base: "15px",
                      sm: "18px",
                      md: "25px",
                      lg: "45px",
                      xl: "55px",
                      "2xl": "55px",
                    }}
                    right={{
                      base: "15px",
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
                      base: "50px",
                      sm: "55px",
                      md: "70px",
                      lg: "85px",
                      xl: "95px",
                      "2xl": "105px",
                    }}
                    height={{
                      base: "50px",
                      sm: "55px",
                      md: "70px",
                      lg: "85px",
                      xl: "95px",
                      "2xl": "105px",
                    }}
                    textAlign="center"
                    p={2}
                    boxShadow="md"                  >
                    <Text
                      lineHeight="1.2"
                      wordBreak="break-word"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {skinType.name}
                    </Text>
                  </Box>
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
                  onClick={() =>
                    router.push(`/products?skin_type=${skinType.name}`)
                  }
                >
                  <Box
                    width={{
                      base: "120px",
                      sm: "140px",
                      md: "180px",
                      lg: "248px",
                    }}
                    height={{
                      base: "120px",
                      sm: "140px",
                      md: "180px",
                      lg: "248px",
                    }}
                    borderRadius="full"
                    overflow="hidden"
                    position="relative"
                    mx="auto"
                    boxShadow="lg"
                  >
                    <Image
                      src={skinType.image || "/placeholder.svg"}
                      alt={skinType.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />

                    {/* Text overlay positioned to stay within circle */}
                    <Box
                      position="absolute"
                      top={{
                        base: "15px",
                        sm: "18px",
                        md: "25px",
                        lg: "45px",
                        xl: "55px",
                        "2xl": "65px",
                      }}
                      right={{
                        base: "15px",
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
                        base: "50px",
                        sm: "55px",
                        md: "70px",
                        lg: "85px",
                        xl: "95px",
                        "2xl": "105px",
                      }}
                      height={{
                        base: "50px",
                        sm: "55px",
                        md: "70px",
                        lg: "85px",
                        xl: "95px",
                        "2xl": "105px",
                      }}
                      textAlign="center"
                      p={2}
                    >
                      <Text
                        lineHeight="1.2"
                        wordBreak="break-word"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {skinType.name}
                      </Text>
                    </Box>
                  </Box>
                </VStack>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </VStack>
  );
};

