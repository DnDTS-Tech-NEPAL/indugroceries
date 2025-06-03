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
    <VStack gap={8} py={16}  textAlign="center" maxW="7xl" mx="auto">
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
                  width={{ base: "150px", md: "200px",lg:"290px" }}
                  height={{ base: "150px", md: "200px",lg:"290px" }}
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
                  top={{ base: "20px", md: "30px",lg:"62px" }}
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

// "use client"

// import { useSkinTypePageQuery } from "@/hooks/api"
// import { Box, Heading, Text, VStack } from "@chakra-ui/react"
// import Image from "next/image"
// import { useRouter } from "next/navigation"

// // Import Swiper components and styles
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Autoplay } from "swiper/modules"
// import "swiper/css"
// import "swiper/css/autoplay"

// export const ShopBySkinType = () => {
//   const router = useRouter()
//   const { data: skinTypeData } = useSkinTypePageQuery()

//   const displayedSkinTypes = skinTypeData || []

//   return (
//     <VStack
//       gap={{ base: 6, md: 8 }}
//       py={{ base: 12, md: 16 }}
//       textAlign="center"
//       maxW="7xl"
//       mx="auto"
//       px={{ base: 6, md: 8, lg: 12 }}
//     >
//       <Heading fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} mb={{ base: 6, md: 13 }}>
//         Shop By Skin Type
//       </Heading>

//       {/* Swiper Carousel */}
//       <Box w="full" overflow="hidden" px={{ base: 2, sm: 4, md: 6 }}>
//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={40}
//           slidesPerView="auto"
//           centeredSlides={false}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           loop={true}
//           speed={800}
//           grabCursor={true}
//           breakpoints={{
//             0: {
//               slidesPerView: 1,
//               spaceBetween: 20,
//               centeredSlides: true,
//             },
//             480: {
//               slidesPerView: 2,
//               spaceBetween: 30,
//               centeredSlides: false,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 35,
//               centeredSlides: false,
//             },
//             1024: {
//               slidesPerView: 4,
//               spaceBetween: 40,
//               centeredSlides: false,
//             },
//             1280: {
//               slidesPerView: 4,
//               spaceBetween: 50,
//               centeredSlides: false,
//             },
//           }}
//         >
//           {displayedSkinTypes.map((skinType) => (
//             <SwiperSlide key={skinType.name} style={{ width: "auto", display: "flex", justifyContent: "center" }}>
//               <VStack
//                 justify="center"
//                 align="center"
//                 position="relative"
//                 gap={6}
//                 cursor="pointer"
//                 onClick={() => router.push(`/products?skin_type=${skinType.name}`)}
//                 pb={{ base: 4, md: 6 }}
//                 w="full"
//                 maxW={{
//                   base: "200px",
//                   sm: "220px",
//                   md: "250px",
//                   lg: "280px",
//                   xl: "300px",
//                 }}
//               >
//                 <Box
//                   width={{ base: "120px", sm: "140px", md: "180px", lg: "240px", xl: "280px", "2xl": "320px" }}
//                   height={{ base: "120px", sm: "140px", md: "180px", lg: "240px", xl: "280px", "2xl": "320px" }}
//                   borderRadius="full"
//                   overflow="hidden"
//                   position="relative"
//                   mx="auto"
//                   boxShadow="lg"
//                 >
//                   <Image
//                     src={skinType.image || "/placeholder.svg"}
//                     alt={skinType.name}
//                     fill
//                     style={{
//                       objectFit: "cover",
//                       objectPosition: "center",
//                     }}
//                   />

//                   {/* Text overlay positioned to stay within circle */}
//                   <Box
//                     position="absolute"
//                     top={{ base: "15px", sm: "18px", md: "25px", lg: "45px", xl: "55px", "2xl": "65px" }}
//                     right={{ base: "15px", sm: "18px", md: "25px", lg: "45px", xl: "55px", "2xl": "65px" }}
//                     bg="#FF6996"
//                     color="white"
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     borderRadius="full"
//                     fontSize={{ base: "xs", sm: "xs", md: "sm", lg: "md", xl: "lg" }}
//                     fontWeight="bold"
//                     width={{ base: "50px", sm: "55px", md: "70px", lg: "85px", xl: "95px", "2xl": "105px" }}
//                     height={{ base: "50px", sm: "55px", md: "70px", lg: "85px", xl: "95px", "2xl": "105px" }}
//                     textAlign="center"
//                     p={2}
//                     boxShadow="md"
//                     border="3px solid white"
//                   >
//                     <Text lineHeight="1.2" wordBreak="break-word" overflow="hidden" textOverflow="ellipsis">
//                       {skinType.name}
//                     </Text>
//                   </Box>
//                 </Box>
//               </VStack>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </Box>
//     </VStack>
//   )
// }
