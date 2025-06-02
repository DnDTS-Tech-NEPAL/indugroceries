"use client";

import { useConfigQuery } from "@/hooks/api";
import { useSocialLinks } from "@/hooks/app";
import {
  Box,
  Heading,
  Text,
  HStack,
  Link,
  Container,
  Image,
  Icon,
  Center,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import { FaPlay, FaRegSadCry } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export const SocialFeed = () => {
  const socialLinks = useSocialLinks();
  const { data: config } = useConfigQuery();

  const videoLinks = config?.ecommerce_social_links || [];

  return (
    <Box py={{ base: 10, md: 16 }} bg="gray.50">
      <Box>
        {/* Header */}
        <Box  maxW="6xl" mx={"auto"}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "flex-start", md: "center" }}
          mb={{ base: 8, md: 12 }}
          gap={{ base: 6, md: 0 }}
        >
          <Box flex="1" maxW={{ md: "60%" }}>
            <Heading size={{ base: "lg", md:"xl", xl: "3xl" }} color="gray.800" mb={3}>
              {config?.social_title}
            </Heading>
            <Text fontSize={{ base: "md", sm: "lg" }} color="gray.600">
              {config?.social_description}
            </Text>
          </Box>

          <VStack align={{ base: "flex-start", md: "flex-end" }} spaceY={2}>
            <Text
              fontSize={{ base: "sm", md: "md", xl:"2xl" }}
              fontWeight="semibold"
            >
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
          <Box position="relative" width="full" overflow="hidden">
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
                375: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
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
                    <Link
                      href={video.social_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      _hover={{ textDecor: "none" }}
                      flex="1"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box
                        position="relative"
                        overflow="hidden"
                        width="100%"
                        borderRadius="lg"
                        flex="1"
                      >
                        <AspectRatio ratio={7 / 10} w="full">
                          <Image
                            src={video.display_image_link || "/placeholder.svg"}
                            alt={video.display_label}
                            objectFit="cover"
                            transition="transform 0.3s ease"
                            display="block"
                            borderRadius="lg"
                          />
                        </AspectRatio>
                        <Center
                          position="absolute"
                          top="0"
                          left="0"
                          width="100%"
                          height="100%"
                          bg="rgba(0, 0, 0, 0.2)"
                          _hover={{ bg: "rgba(0, 0, 0, 0.4)" }}
                          borderRadius="lg"
                        >
                          <Box
                            bg="rgba(255, 255, 255, 0.2)"
                            backdropFilter="blur(4px)"
                            p={3}
                            borderRadius="full"
                            boxShadow="lg"
                          >
                            <Icon
                              as={FaPlay}
                              boxSize={{ base: 5, sm: 6 }}
                              color="white"
                              opacity={0.9}
                            />
                          </Box>
                        </Center>
                      </Box>
                      <Box p={4} bg="white" borderBottomRadius="lg" minH="90px">
                        <Text
                          fontWeight="semibold"
                          fontSize={{ base: "sm", sm: "md" }}
                          color="gray.800"
                        >
                          {video.display_label}
                        </Text>
                      </Box>
                    </Link>
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
  );
};
