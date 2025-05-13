"use client";

import { useConfigQuery } from "@/hooks/api";
import { useSocialLinks } from "@/hooks/app";
import {
  Box,
  Heading,
  Text,
  HStack,
  Link,
  Flex,
  Grid,
  GridItem,
  Container,
  AspectRatio,
  Icon,
  Center,
} from "@chakra-ui/react";
import { FaPlay, FaRegSadCry } from "react-icons/fa";

export const SocialFeed = () => {
  const socialLinks = useSocialLinks();
  const { data: config } = useConfigQuery();

  const videoLinks = config?.ecommerce_social_links || [];

  return (
    <Box py={{ base: 10, md: 16 }} bg="white">
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        {/* Header Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={{ base: 8, md: 10 }}
          gap={{ base: 6, md: 0 }}
        >
          <Box flex="1">
            <Heading size="lg" color="gray.800">
              {config?.social_title ?? "Follow Us on Social Media"}
            </Heading>
            <Text mt={4} maxW="600px" color="gray.600" fontSize="md">
              {config?.social_description ??
                "Stay updated with the latest beauty tips, tricks, and product highlights."}
            </Text>
          </Box>

          <HStack gap={4} mt={{ base: 6, md: 0 }}>
            {socialLinks.map(({ name, href, icon }) => (
              <Link
                href={href}
                key={name}
                aria-label={name}
                _hover={{ color: "blue.500" }}
                color="gray.700"
                fontSize="2xl"
              >
                <Box transition="all 0.3s" _hover={{ transform: "scale(1.1)" }}>
                  {icon}
                </Box>
              </Link>
            ))}
          </HStack>
        </Flex>

        {/* Video Grid */}
        {videoLinks.length > 0 ? (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            gap={6}
          >
            {videoLinks.map((video) => {
              const videoId = video.social_links?.split("/").pop();
              const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;

              return (
                <GridItem
                  key={video.idx}
                  position="relative"
                  bg="gray.50"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="sm"
                  transition="all 0.3s ease"
                  _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
                >
                  <AspectRatio ratio={9 / 16}>
                    <Box position="relative" w="100%" h="100%">
                      {/* TikTok iframe */}
                      <iframe
                        src={embedUrl}
                        title={`TikTok Video ${videoId}`}
                        allowFullScreen
                        frameBorder="0"
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          pointerEvents: "auto",
                        }}
                      />

                      {/* Play Icon Overlay */}
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        zIndex="2"
                        bg="rgba(0, 0, 0, 0.5)"
                        borderRadius="full"
                        p={3}
                      >
                        <FaPlay size={20} color="white" />
                      </Box>
                    </Box>
                  </AspectRatio>
                </GridItem>
              );
            })}
          </Grid>
        ) : (
          <Center flexDir="column" py={12} color="gray.500">
            <Icon as={FaRegSadCry} boxSize={12} mb={4} />
            <Text fontSize="lg">No social videos available at the moment.</Text>
          </Center>
        )}
      </Container>
    </Box>
  );
};
