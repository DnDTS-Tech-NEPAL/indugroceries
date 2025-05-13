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

// Helper function to determine video platform and extract ID
const getVideoDetails = (
  url: string | undefined
): { platform: string | null; videoId: string | null } => {
  if (!url) return { platform: null, videoId: null };

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const pathname = urlObj.pathname;

    // TikTok
    if (hostname.includes("tiktok.com")) {
      const videoId = pathname.split("/").pop() || null;
      return { platform: "tiktok", videoId };
    }

    // Instagram (handles both regular posts and reels)
    if (hostname.includes("instagram.com")) {
      // Check if it's a reel
      if (pathname.includes("/reel/")) {
        const reelId = pathname.split("/reel/")[1]?.split("/")[0] || null;
        return { platform: "instagram-reel", videoId: reelId };
      }

      // Regular post
      const matches = pathname.match(/\/p\/([^/]+)/);
      const videoId = matches ? matches[1] : pathname.split("/").pop() || null;
      return { platform: "instagram", videoId };
    }

    // Facebook
    if (hostname.includes("facebook.com") || hostname.includes("fb.watch")) {
      const videoId =
        urlObj.searchParams.get("v") || pathname.split("/").pop() || null;
      return { platform: "facebook", videoId };
    }

    // YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      let videoId: string | null = null;
      if (hostname.includes("youtu.be")) {
        videoId = pathname.substring(1) || null;
      } else if (pathname.includes("shorts")) {
        const parts = pathname.split("/shorts/");
        videoId = parts.length > 1 ? parts[1] : null;
      } else {
        videoId = urlObj.searchParams.get("v");
      }
      return { platform: "youtube", videoId };
    }

    // Default case - unknown platform
    return { platform: "unknown", videoId: null };
  } catch (error) {
    console.error("Error parsing video URL:", error);
    return { platform: "error", videoId: null };
  }
};

// Generate embed URL based on platform and video ID
const getEmbedUrl = (
  platform: string | null,
  videoId: string | null
): string | null => {
  if (!platform || !videoId) return null;

  switch (platform) {
    case "tiktok":
      return `https://www.tiktok.com/embed/v2/${videoId}`;
    case "instagram":
      return `https://www.instagram.com/p/${videoId}/embed`;
    case "instagram-reel":
      return `https://www.instagram.com/reel/${videoId}/embed`;
    case "facebook":
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=${videoId}&show_text=false`;
    case "youtube":
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    default:
      return null;
  }
};

// Function to get a display name for the platform
const getPlatformDisplayName = (platform: string): string => {
  switch (platform) {
    case "instagram-reel":
      return "Instagram";
    default:
      return platform;
  }
};

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
            {videoLinks.map((video, index) => {
              const { platform, videoId } = getVideoDetails(video.social_links);
              const embedUrl = getEmbedUrl(platform, videoId);

              // Skip rendering if we couldn't determine the platform or generate an embed URL
              if (!embedUrl || !platform || !videoId) {
                return null;
              }

              // Determine if this is a vertical video format
              const isVerticalVideo =
                platform === "tiktok" ||
                platform === "instagram-reel" ||
                platform === "instagram";

              return (
                <GridItem
                  key={video.idx || index}
                  position="relative"
                  bg="gray.50"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="sm"
                  transition="all 0.3s ease"
                  _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
                >
                  <AspectRatio ratio={isVerticalVideo ? 9 / 16 : 16 / 9}>
                    <Box position="relative" w="100%" h="100%">
                      {/* Video iframe */}
                      <iframe
                        src={embedUrl}
                        title={`${getPlatformDisplayName(platform)} Video`}
                        allowFullScreen
                        frameBorder="0"
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          pointerEvents: "auto",
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
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
