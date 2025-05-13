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
  Image,
  Icon,
  Center,
  VStack,
} from "@chakra-ui/react";
import { FaPlay, FaRegSadCry } from "react-icons/fa";

export const SocialFeed = () => {
  const socialLinks = useSocialLinks();
  const { data: config } = useConfigQuery();

  const videoLinks = config?.ecommerce_social_links || [];

  return (
    <Box py={{ base: 10, md: 16 }} bg="gray.50">
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        {/* Header */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={{ base: 8, md: 12 }}
          gap={{ base: 6, md: 0 }}
        >
          <Box flex="1" maxW={{ md: "60%" }}>
            <Heading size="xl" color="gray.800" mb={3}>
              {config?.social_title ?? "Follow Us on Social Media"}
            </Heading>
            <Text fontSize="lg" color="gray.600">
              {config?.social_description ??
                "Stay updated with the latest beauty tips, tricks, and product highlights."}
            </Text>
          </Box>

          <HStack
            gap={5}
            mt={{ base: 6, md: 0 }}
            flexWrap="wrap"
            justify={{ base: "flex-start", md: "flex-end" }}
          >
            {socialLinks.map(({ name, href, icon }) => (
              <Link
                href={href}
                key={name}
                aria-label={name}
                _hover={{ color: "blue.500", transform: "scale(1.1)" }}
                color="gray.600"
                fontSize="2xl"
                transition="all 0.2s ease"
              >
                {icon}
              </Link>
            ))}
          </HStack>
        </Flex>

        {/* Grid */}
        {videoLinks.length > 0 ? (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: 5, md: 6 }}
          >
            {videoLinks.map((video, index) => (
              <GridItem key={video.idx || index}>
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
                  height="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Link
                    href={video.social_links}
                    _hover={{ textDecor: "none" }}
                    flex="1"
                    display="flex"
                    flexDirection="column"
                  >
                    <Box
                      position="relative"
                      overflow="hidden"
                      width="100%"
                      borderRadius={{
                        base: "lg",
                        md: "2xl",
                      }}
                      flex="1"
                    >
                      <Image
                        src={video.display_image_link || "/placeholder.svg"}
                        alt={video.display_label}
                        width="100%"
                        height="100%"
                        minHeight={{
                          base: "220px",
                          sm: "200px",
                          md: "180px",
                          lg: "400px",
                        }}
                        objectFit="cover"
                        transition="transform 0.3s ease"
                        _hover={{ transform: "scale(1.05)" }}
                        display="block"
                        borderRadius={{
                          base: "lg",
                          md: "2xl",
                        }}
                      />
                      <Center
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        bg="rgba(0, 0, 0, 0.2)"
                        transition="all 0.3s ease"
                        _hover={{ bg: "rgba(0, 0, 0, 0.4)" }}
                        borderRadius={{
                          base: "lg",
                          md: "2xl",
                        }}
                      >
                        <Box
                          bg="rgba(255, 255, 255, 0.2)"
                          backdropFilter="blur(4px)"
                          p={3}
                          borderRadius="full"
                          boxShadow="lg"
                          transition="all 0.3s ease"
                          _hover={{
                            transform: "scale(1.1)",
                            bg: "rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          <Icon
                            as={FaPlay}
                            boxSize={6}
                            color="white"
                            opacity={0.9}
                            _hover={{ opacity: 1 }}
                            transition="all 0.2s ease"
                          />
                        </Box>
                      </Center>
                    </Box>
                    <Box p={4} bg="white" borderBottomRadius="lg">
                      <Text
                        fontWeight="semibold"
                        fontSize="md"
                        color="gray.800"
                      >
                        {video.display_label}
                      </Text>
                    </Box>
                  </Link>
                </Box>
              </GridItem>
            ))}
          </Grid>
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
      </Container>
    </Box>
  );
};
