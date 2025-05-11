// components/GlobalReach.tsx
"use client";
import { Box, Heading, Text, Link, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useBreakpointValue } from "@chakra-ui/react";
import { useConfigQuery } from "@/hooks/api";

const GlobalReach = () => {
  const { data: config } = useConfigQuery();
  // Responsive background image
  const bgImage = useBreakpointValue({
    base: config.banner_3_image_url_vertical || "/global-reach-vertical.png", // for mobile
    md: config.banner_3_image_url_horizontal || "/global-reach-horizontal.png", // for tablet and larger
  });

  return (
    <Box
      maxW={"8xl"}
      mx={"auto"}
      position="relative"
      py={{ base: 10, md: 20 }}
      px={{ base: 4, md: 16 }}
      overflow="hidden"
      height={{ base: "728px", md: "500px", lg: "662px" }}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        width={"100%"}
        height={{ base: "728px", md: "500px", lg: "662px" }}
        bottom={0}
        zIndex={0}
      >
        <Image
          src={bgImage!}
          alt="Global Reach Background"
          fill
          style={{ objectFit: "fill", objectPosition: "center" }}
        />
      </Box>

      {/* Content */}
      <Box
        position="relative"
        zIndex={1}
        maxW="7xl"
        w={{ base: "100%", md: "50%" }}
        p={4}
        borderRadius="xl"
      >
        <VStack align="start" gap={4}>
          <Heading as="h2" size="xl">
            {config.banner_3_title}
          </Heading>
          <Text textAlign={"justify"}>{config.banner_3_description}</Text>
          <Link href="#" fontWeight="medium" textDecoration={"none"}>
            View More →
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default GlobalReach;
