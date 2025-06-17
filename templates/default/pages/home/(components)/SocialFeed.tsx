// "use client";

// import { useConfigQuery } from "@/hooks/api";
// import { useSocialLinks } from "@/hooks/app";
// import {
//   Box,
//   Heading,
//   Text,
//   HStack,
//   Link,
//   Container,
//   Image,
//   Icon,
//   Center,
//   VStack,
//   AspectRatio,
// } from "@chakra-ui/react";
// import { FaPlay, FaRegSadCry } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";

// export const SocialFeed = () => {
//   const socialLinks = useSocialLinks();
//   const { data: config } = useConfigQuery();

//   const videoLinks = config?.ecommerce_social_links || [];

//   return (
//     <Box py={{ base: 8, md: 12 }} bg="gray.50">
//       <Box>
//         {/* Header */}
//         <Box  maxW="6xl" mx={"auto"}
//           display="flex"
//           flexDirection={{ base: "column", md: "row" }}
//           justifyContent="space-between"
//           alignItems={{ base: "flex-start", md: "center" }}
//           mb={{ base: 8, md: 12 }}
//           gap={{ base: 6, md: 0 }}
//         >
//           <Box flex="1" maxW={{ md: "60%" }}>
//             <Heading size={{ base: "lg", md:"xl", xl: "3xl" }} color="gray.800" mb={3}>
//               {config?.social_title}
//             </Heading>
//             <Text fontSize={{ base: "md", sm: "lg" }} color="gray.600">
//               {config?.social_description}
//             </Text>
//           </Box>

//           <VStack align={{ base: "flex-start", md: "flex-end" }} spaceY={2}>
//             <Text
//               fontSize={{ base: "sm", md: "md", xl:"2xl" }}
//               fontWeight="semibold"
//             >
//               Follow Us :
//             </Text>
//             <HStack
//               gap={{ base: 4, sm: 5 }}
//               flexWrap="wrap"
//               justify={{ base: "flex-start", md: "flex-end" }}
//             >
//               {socialLinks.map(({ name, href, icon }) => (
//                 <Link
//                   href={href}
//                   key={name}
//                   aria-label={name}
//                   _hover={{ color: "pink.500", transform: "scale(1.1)" }}
//                   color="#FF6996"
//                   fontSize={{ base: "xl", sm: "2xl" }}
//                   transition="all 0.2s ease"
//                 >
//                   {icon}
//                 </Link>
//               ))}
//             </HStack>
//           </VStack>
//         </Box>

//         {/* Swiper or Fallback */}
//         {videoLinks.length > 0 ? (
//           <Box position="relative" width="full" overflow="hidden">
//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={16}
//               slidesPerView={1.1}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//               loop={true}
//               breakpoints={{
//                 375: { slidesPerView: 1 },
//                 480: { slidesPerView: 1 },
//                 640: { slidesPerView: 2 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//                 1280: { slidesPerView: 4 },
//               }}
//               style={{
//                 padding: "10px 4px 20px",
//                 margin: "-10px -4px -20px",
//               }}
//             >
//               {videoLinks.map((video, index) => (
//                 <SwiperSlide key={video.idx || index}>
//                   <Box
//                     bg="white"
//                     borderRadius="lg"
//                     overflow="hidden"
//                     boxShadow="sm"
//                     transition="all 0.3s ease"
//                     _hover={{
//                       boxShadow: "xl",
//                       transform: "translateY(-5px)",
//                     }}
//                     my={10}
//                     height="100%"
//                     display="flex"
//                     flexDirection="column"
//                   >
//                     <Link
//                       href={video.social_links}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       _hover={{ textDecor: "none" }}
//                       flex="1"
//                       display="flex"
//                       flexDirection="column"
//                     >
//                       <Box
//                         position="relative"
//                         overflow="hidden"
//                         width="100%"
//                         borderRadius="lg"
//                         flex="1"
//                       >
//                         <AspectRatio ratio={7 / 10} w="full">
//                           <Image
//                             src={video.display_image_link || "/placeholder.svg"}
//                             alt={video.display_label}
//                             objectFit="cover"
//                             transition="transform 0.3s ease"
//                             display="block"
//                             borderRadius="lg"
//                           />
//                         </AspectRatio>
//                         <Center
//                           position="absolute"
//                           top="0"
//                           left="0"
//                           width="100%"
//                           height="100%"
//                           bg="rgba(0, 0, 0, 0.2)"
//                           _hover={{ bg: "rgba(0, 0, 0, 0.4)" }}
//                           borderRadius="lg"
//                         >
//                           <Box
//                             bg="rgba(255, 255, 255, 0.2)"
//                             backdropFilter="blur(4px)"
//                             p={3}
//                             borderRadius="full"
//                             boxShadow="lg"
//                           >
//                             <Icon
//                               as={FaPlay}
//                               boxSize={{ base: 5, sm: 6 }}
//                               color="white"
//                               opacity={0.9}
//                             />
//                           </Box>
//                         </Center>
//                       </Box>
//                       <Box p={4} bg="white" borderBottomRadius="lg" minH="90px">
//                         <Text
//                           fontWeight="semibold"
//                           fontSize={{ base: "sm", sm: "md" }}
//                           color="gray.800"
//                         >
//                           {video.display_label}
//                         </Text>
//                       </Box>
//                     </Link>
//                   </Box>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </Box>
//         ) : (
//           <Center
//             flexDir="column"
//             py={16}
//             color="gray.500"
//             bg="white"
//             borderRadius="lg"
//           >
//             <Icon as={FaRegSadCry} boxSize={12} mb={4} opacity={0.7} />
//             <VStack gap={2}>
//               <Text fontSize="xl" fontWeight="medium">
//                 No content available
//               </Text>
//               <Text fontSize="md" color="gray.600">
//                 Check back later for updates
//               </Text>
//             </VStack>
//           </Center>
//         )}
//       </Box>
//     </Box>
//   );
// };

// "use client";

// import { useConfigQuery } from "@/hooks/api";
// import { useSocialLinks } from "@/hooks/app";
// import {
//   Box,
//   Heading,
//   Text,
//   HStack,
//   Link,
//   Image,
//   Icon,
//   Center,
//   VStack,
//   AspectRatio,
//   Flex,
//   Button,
// } from "@chakra-ui/react";
// import { FaRegSadCry } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import { HeartIcon } from "@/assets/svg";

// export const SocialFeed = () => {
//   const socialLinks = useSocialLinks();
//   const { data: config } = useConfigQuery();

//   const videoLinks = config?.ecommerce_social_links || [];

//   return (
//     <Box py={{ base: 8, md: 12 }} bg="gray.50">
//       <Box>
//         {/* Header */}
//         <Box
//           maxW="6xl"
//           mx={"auto"}
//           display="flex"
//           flexDirection={{ base: "column", md: "row" }}
//           justifyContent="space-between"
//           alignItems={{ base: "flex-start", md: "center" }}
//           mb={{ base: 8, md: 12 }}
//           gap={{ base: 6, md: 0 }}
//         >
//           <Box flex="1" maxW={{ md: "60%" }}>
//             <Heading
//               size={{ base: "lg", md: "xl", xl: "3xl" }}
//               color="gray.800"
//               mb={3}
//             >
//               {config?.social_title}
//             </Heading>
//             <Text fontSize={{ base: "md", sm: "lg" }} color="gray.600">
//               {config?.social_description}
//             </Text>
//           </Box>

//           <VStack align={{ base: "flex-start", md: "flex-end" }} spaceY={2}>
//             <Text
//               fontSize={{ base: "sm", md: "md", xl: "2xl" }}

//             >
//               Follow Us :
//             </Text>
//             <HStack
//               gap={{ base: 4, sm: 5 }}
//               flexWrap="wrap"
//               justify={{ base: "flex-start", md: "flex-end" }}
//             >
//               {socialLinks.map(({ name, href, icon }) => (
//                 <Link
//                   href={href}
//                   key={name}
//                   aria-label={name}
//                   _hover={{ color: "pink.500", transform: "scale(1.1)" }}
//                   color="#FF6996"
//                   fontSize={{ base: "xl", sm: "2xl" }}
//                   transition="all 0.2s ease"
//                 >
//                   {icon}
//                 </Link>
//               ))}
//             </HStack>
//           </VStack>
//         </Box>

//         {/* Swiper or Fallback */}
//         {videoLinks.length > 0 ? (
//           <Box position="relative" width="full" overflow="hidden">
//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={16}
//               slidesPerView={1.1}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//               loop={true}
//               breakpoints={{
//                 375: { slidesPerView: 1 },
//                 480: { slidesPerView: 1 },
//                 640: { slidesPerView: 2 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//                 1280: { slidesPerView: 4 },
//               }}
//               style={{
//                 padding: "10px 4px 20px",
//                 margin: "-10px -4px -20px",
//               }}
//             >
//               {videoLinks.map((video, index) => (
//                 <SwiperSlide key={video.idx || index}>
//                   <Box
//                     bg="white"
//                     borderRadius="lg"
//                     overflow="hidden"
//                     boxShadow="sm"
//                     transition="all 0.3s ease"
//                     _hover={{
//                       boxShadow: "xl",
//                       transform: "translateY(-5px)",
//                     }}
//                     my={10}
//                     height="100%"
//                     display="flex"
//                     flexDirection="column"
//                   >
//                     <Link
//                       href={video.social_links}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       _hover={{ textDecor: "none" }}
//                       flex="1"
//                       display="flex"
//                       flexDirection="column"
//                     >
//                       <Box
//                         position="relative"
//                         overflow="hidden"
//                         width="100%"
//                         borderRadius="lg"
//                         flex="1"
//                         bg="black"
//                       >
//                         <AspectRatio ratio={4 / 5} w="full">
//                           <video
//                             src="https://v.ftcdn.net/08/72/78/19/700_F_872781967_oeCwAo2GHj5WbsALmkrYTqUG2lj3phKx_ST.mp4"
//                             autoPlay
//                             muted
//                             loop
//                             playsInline
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                               borderRadius: "12px",
//                               display: "block",
//                             }}
//                           />
//                         </AspectRatio>
//                       </Box>

//                       <Box
//                         p={4}
//                         bg="white"
//                         borderBottomRadius="lg"
//                         minH="180px"
//                         maxW="300px"
//                       >
//                         {/* Top Section: Image and Product Info */}
//                         <Flex gap={4} mb={4}>
//                           <Image
//                             src="https://anua.global/cdn/shop/files/anua-us-bundle-glass-skin-full-routine-set-1170826212.png?v=1748645372&width=700"
//                             alt="Medicube Zero Pore Pad"
//                             boxSize="70px"
//                             objectFit="cover"
//                             borderRadius="md"
//                           />
//                           <Box>
//                             <Text
//                               fontWeight="semibold"
//                               fontSize="md"
//                               color="gray.800"
//                             >
//                               Medicube Zero Pore Pad
//                             </Text>
//                             <Text fontSize="md" color="#FF6996">
//                               Rs 1000
//                             </Text>
//                           </Box>
//                         </Flex>

//                         {/* Bottom Section: Add to Cart and Wishlist */}

//                         <HStack gap="20px" width="100%">
//                           <Button rounded="xl" bg="#FF6996" flex={1}>
//                             Add to Bag
//                           </Button>
//                           <Button
//                             borderRadius="xl"
//                             h="10px"
//                             w="10px"
//                             bg={"white"}
//                             border={"1px solid #FF6996"}
//                           >
//                             <HeartIcon style={{ color: "#FF6996" }} />
//                           </Button>
//                         </HStack>
//                       </Box>
//                     </Link>
//                   </Box>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </Box>
//         ) : (
//           <Center
//             flexDir="column"
//             py={16}
//             color="gray.500"
//             bg="white"
//             borderRadius="lg"
//           >
//             <Icon as={FaRegSadCry} boxSize={12} mb={4} opacity={0.7} />
//             <VStack gap={2}>
//               <Text fontSize="xl" fontWeight="medium">
//                 No content available
//               </Text>
//               <Text fontSize="md" color="gray.600">
//                 Check back later for updates
//               </Text>
//             </VStack>
//           </Center>
//         )}
//       </Box>
//     </Box>
//   );
// };

"use client";

import { useConfigQuery } from "@/hooks/api";
import { useSocialLinks } from "@/hooks/app";
import {
  Box,
  Heading,
  Text,
  HStack,
  Link,
  Image,
  Icon,
  Center,
  VStack,
  AspectRatio,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaRegSadCry } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { HeartIcon } from "@/assets/svg";
import { useEffect, useState } from "react";
import { ProductModal } from "./ProductModal";
import { getProductDetailByName } from "@/api";
import { IndividualProductAPIType } from "@/types";
type VideoProductType = {
  products: (IndividualProductAPIType | undefined)[];
  videoInfo?: { social_links: string; video_link: string };
};

export const SocialFeed = () => {
  const socialLinks = useSocialLinks();
  const { data: config } = useConfigQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cardDetails, setCardDetails] = useState<VideoProductType[]>([]);

  const videoLinks = config?.ecommerce_social_links || [];

  useEffect(() => {
    if (videoLinks.length === 0) return;

    const fetchAllProducts = async () => {
      try {
        const videoProductsPromises = videoLinks.map(async (videoLink) => {
          const items = [
            videoLink.item_1,
            videoLink.item_2,
            videoLink.item_3,
          ].filter(Boolean);

          const itemDetails = await Promise.all(
            items.map((itemName) => getProductDetailByName(itemName))
          );

          return {
            videoInfo: {
              social_links: videoLink.social_links,
              video_link: videoLink.video_link,
            },
            products: itemDetails.filter(Boolean),
          };
        });

        const videoProducts = await Promise.all(videoProductsPromises);
        console.log("videoProducts:", videoProducts);
        setCardDetails(videoProducts);
      } catch (error) {
        console.error("Error in fetchAllProducts:", error);
      }
    };
    fetchAllProducts();
  }, [videoLinks]);

  interface Product {
    id: number | string;
    name: string;
    price: number;
    originalPrice: number;
    discount: string;
    rating: number;
    reviews: number;
    image: string;
    description: string;
    videoSrc?: string;
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box py={{ base: 8, md: 12 }} bg="gray.50">
        <Box>
          {/* Header */}
          <Box
            maxW="6xl"
            mx={"auto"}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            mb={{ base: 8, md: 12 }}
            gap={{ base: 6, md: 0 }}
          >
            <Box flex="1" maxW={{ md: "60%" }}>
              <Heading
                size={{ base: "lg", md: "xl", xl: "3xl" }}
                color="gray.800"
                mb={3}
              >
                {config?.social_title}
              </Heading>
              <Text fontSize={{ base: "md", sm: "lg" }} color="gray.600">
                {config?.social_description}
              </Text>
            </Box>

            <VStack align={{ base: "flex-start", md: "flex-end" }} spaceY={2}>
              <Text fontSize={{ base: "sm", md: "md", xl: "2xl" }}>
                Follow Us :
              </Text>
              <HStack
                gap={{ base: 4, sm: 5 }}
                flexWrap="wrap"
                justify={{ base: "flex-start", md: "flex-end" }}
              >
                {socialLinks.map(({ name, href, icon }) => (
                  <Link
                    href={href}
                    key={name}
                    aria-label={name}
                    _hover={{ color: "pink.500", transform: "scale(1.1)" }}
                    color="#FF6996"
                    fontSize={{ base: "xl", sm: "2xl" }}
                    transition="all 0.2s ease"
                  >
                    {icon}
                  </Link>
                ))}
              </HStack>
            </VStack>
          </Box>

          {/* Swiper or Fallback */}
          {videoLinks.length > 0 ? (
            <Box
              position="relative"
              maxW={"8xl"}
              mx={"auto"}
              px={3}
              width="full"
              overflow="hidden"
              zIndex={0}
            >
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={1.1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                breakpoints={{
                  375: { slidesPerView: 2 },
                  480: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                style={{
                  padding: "10px 4px 20px",
                  margin: "-10px -4px -20px",
                }}
              >
                {videoLinks.map((video, index) => (
                  <SwiperSlide key={video.idx || index}>
                    <Box
                      bg="white"
                      className="group"
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="sm"
                      transition="all 0.3s ease"
                      _hover={{
                        boxShadow: "xl",
                        transform: "translateY(-5px)",
                      }}
                      my={10}
                      height="100%"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box
                        position="relative"
                        overflow="hidden"
                        width="100%"
                        borderRadius="lg"
                        flex="1"
                        bg="black"
                      >
                        <Box
                          onClick={() =>
                            handleProductClick({
                              id: video.idx || index,
                              name: "Celimax - The Vita-A Retinol Shot Tightening Serum",
                              price: 2800,
                              originalPrice: 3200,
                              discount: "10% Off",
                              rating: 4.5,
                              reviews: 420,
                              image:
                                "https://anua.global/cdn/shop/files/anua-us-bundle-glass-skin-full-routine-set-1170826212.png?v=1748645372&width=700",
                              description:
                                "A serum formulated with 10% Niacinamide and 4% TXA, designed to look more radiant and balanced.",
                              videoSrc:
                                video.social_links !== ""
                                  ? video.social_links
                                  : video.video_link,
                            })
                          }
                          cursor="pointer"
                          _hover={{ textDecor: "none" }}
                          flex="1"
                          display="flex"
                          flexDirection="column"
                        >
                          <AspectRatio ratio={5 / 9} w="full">
                            <video
                              src={video.video_link}
                              autoPlay
                              muted
                              loop
                              playsInline
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "12px",
                                display: "block",
                              }}
                            />
                          </AspectRatio>
                        </Box>
                        <Box
                          p={2}
                          bg="white"
                          display={"none"}
                          borderBottomRadius="lg"
                          minH="152px"
                          maxW="300px"
                          _groupHover={{
                            display: "block",
                            transform: "translateY(5px)",
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                          }}
                          transition="all 0.3s ease"
                        >
                          {/* Top Section: Image and Product Info */}
                          {/* {cardDetails[index]?.products.map(
                            (product, index) => (
                              <Box key={index} my={4}>
                                <Flex key={index} gap={2} my={2}>
                                  <Image
                                    src={
                                      product?.custom_image_1_link ||
                                      config?.company_details_url
                                    }
                                    alt={product?.item_name}
                                    width="55px"
                                    height="55px"
                                    objectFit="cover"
                                    borderRadius="lg"
                                  />
                                  <Box>
                                    <Text
                                      fontSize="sm"
                                      color="gray.800"
                                      lineClamp={1}
                                    >
                                      {product?.item_name}
                                    </Text>
                                    <Text fontSize="md" color="#FF6996">
                                      Rs.{" "}
                                      {product?.prices?.[0]?.price_list_rate ??
                                        "N/A"}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Box>
                            )
                          )} */}
                          {cardDetails[index]?.products?.[0] && (
                            <Box my={4}>
                              <Flex gap={2} my={2}>
                                <Image
                                  src={
                                    cardDetails[index].products[0]
                                      ?.custom_image_1_link ||
                                    config?.company_details_url
                                  }
                                  alt={
                                    cardDetails[index].products[0]?.item_name
                                  }
                                  width="55px"
                                  height="55px"
                                  objectFit="cover"
                                  borderRadius="lg"
                                />
                                <Box>
                                  <Text
                                    fontSize="sm"
                                    color="gray.800"
                                    lineClamp={1}
                                  >
                                    {cardDetails[index].products[0]?.item_name}
                                  </Text>
                                  <Text fontSize="md" color="#FF6996">
                                    Rs.{" "}
                                    {cardDetails[index].products[0]?.prices?.[0]
                                      ?.price_list_rate ?? "N/A"}
                                  </Text>
                                </Box>
                              </Flex>
                            </Box>
                          )}

                          {/* Bottom Section: Add to Cart and Wishlist */}

                          <HStack gap="20px" width="100%">
                            <Button rounded="xl" bg="#FF6996" flex={1}>
                              Add to Bag
                            </Button>
                            <Button
                              borderRadius="xl"
                              h="10px"
                              w="10px"
                              bg={"white"}
                              border={"1px solid #FF6996"}
                            >
                              <HeartIcon style={{ color: "#FF6996" }} />
                            </Button>
                          </HStack>
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          ) : (
            <Center
              flexDir="column"
              py={16}
              color="gray.500"
              bg="white"
              borderRadius="lg"
            >
              <Icon as={FaRegSadCry} boxSize={12} mb={4} opacity={0.7} />
              <VStack gap={2}>
                <Text fontSize="xl" fontWeight="medium">
                  No content available
                </Text>
                <Text fontSize="md" color="gray.600">
                  Check back later for updates
                </Text>
              </VStack>
            </Center>
          )}
        </Box>
      </Box>
      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </>
  );
};
