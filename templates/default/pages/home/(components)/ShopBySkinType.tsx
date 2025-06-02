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
    <VStack gap={8} py={16} px={4} textAlign="center" maxW="5xl" mx="auto">
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={13}>Shop By Skin Type</Heading>
      
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
              slidesPerView: shouldForceScroll ? 2 : 2,
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
                onClick={() => router.push(`/products?skin_type=${skinType.name}`)}
              >
                <Box
                  width={{ base: "150px", md: "200px" }}
                  height={{ base: "150px", md: "200px" }}
                  borderRadius="full"
                  overflow="hidden"
                  position="relative"
                >
                  <Image
                    src={skinType.image}
                    alt={skinType.name}
                    fill
                    style={{ 
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                  <Box
                  position="absolute"
                  top={{ base: "20px", md: "30px" }}
                  right={{ base: "20px", md: "40px" }}
                  bg="#FF6996"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                  width={{ base: "60px", md: "80px" }}
                  height={{ base: "60px", md: "80px" }}
                  textAlign="center"
                >
                  {skinType.name}
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
                  onClick={() => router.push(`/products?skin_type=${skinType.name}`)}
                >
                  <Box
                    width={{ base: "150px", md: "200px" }}
                    height={{ base: "150px", md: "200px" }}
                    borderRadius="full"
                    overflow="hidden"
                    position="relative"
                  >
                    <Image
                      src={skinType.image}
                      alt={skinType.name}
                      fill
                      style={{ 
                        objectFit: "cover",
                        objectPosition: "center"
                      }}
                    />
                  </Box>
                  <Box
                    position="absolute"
                    top={{ base: "20px", md: "30px" }}
                    right={{ base: "20px", md: "40px" }}
                    bg="#FF6996"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="bold"
                    width={{ base: "60px", md: "80px" }}
                    height={{ base: "60px", md: "80px" }}
                    textAlign="center"
                  >
                    {skinType.name}
                  </Box>
                </VStack>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </VStack>
  );
};