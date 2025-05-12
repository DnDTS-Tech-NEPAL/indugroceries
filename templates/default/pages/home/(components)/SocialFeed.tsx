"use client";

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
  Image,
  Container,
} from "@chakra-ui/react";

const mockVideos = [
  {
    id: 1,
    image: "/images/video1.jpg",
    desc: "This glow isn’t a filter...",
    hashtags: "#GlowingSkin #SkincareRoutine",
  },
  {
    id: 2,
    image: "/images/video2.jpg",
    desc: "Watch me go from tired...",
    hashtags: "#BeautyHack #BeforeAndAfter",
  },
  {
    id: 3,
    image: "/images/video3.jpg",
    desc: "POV: You just found your...",
    hashtags: "#MoisturizerGoals #SelfCareDaily",
  },
  {
    id: 4,
    image: "/images/video4.jpg",
    desc: "Say goodbye to breakouts...",
    hashtags: "#AcneSolutions #SkinCareTips",
  },
  {
    id: 5,
    image: "/images/video5.jpg",
    desc: "This lipstick? Stays through...",
    hashtags: "#MakeupMagic #BeautyFavorites",
  },
];

export const SocialFeed = () => {
  const socialLinks = useSocialLinks();

  return (
    <Box py={10} bg="white">
      <Container maxW="6xl">
        {/* Header Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: 6, md: 0 }}
        >
          <Box flex="1">
            <Heading size="lg">Social Feeds Real Stories. Real Glow.</Heading>
            <Text mt={4} maxW="600px" color="gray.600">
              Dive into trending product reviews, expert skincare tips, beauty
              transformations, and inspiring routines from our favorite
              creators.
            </Text>
          </Box>

          {/* Social Links */}
          <HStack gap={4} mt={{ base: 6, md: 0 }}>
            {socialLinks.map(({ name, href, icon }) => (
              <Link href={href} key={name} aria-label={name}>
                <Box
                  fontSize="xl"
                  color="gray.700"
                  _hover={{ color: "gray.500" }}
                >
                  {icon}
                </Box>
              </Link>
            ))}
          </HStack>
        </Flex>

        {/* Video Grid */}
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={6}
          mt={10}
        >
          {mockVideos.map((video) => (
            <GridItem
              key={video.id}
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              transition="all 0.3s ease"
              _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
            >
              <Box overflow="hidden">
                <Image
                  src={video.image}
                  alt={`video-${video.id}`}
                  objectFit="cover"
                  w="100%"
                  h="200px"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Box>
              <Box p={4}>
                <Text fontSize="sm">{video.desc}</Text>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  {video.hashtags}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
