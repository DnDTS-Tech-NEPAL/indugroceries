"use client";

import { useQualityCompliancePageQuery } from "@/hooks/api/(web)/qualityCompliance";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function AwarenessSection() {
  const { data: arrangementData } = useQualityCompliancePageQuery();
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      px={{ base: 6, md: 12 }}
      py={{ base: 12, md: 20 }}
      gap={10}
      bg="white"
      maxW="7xl"
      mx="auto"
    >
      <Box flex="1" textAlign="center" order={{ base: 2, md: 1 }}>
        <Image
          src={`${arrangementData?.content_2_image_link}`}
          alt="Biosecurity Awareness Certified"
          w={{ lg: "616px", md: "335px" }}
          h={{ lg: "640px", md: "348px" }}
          mx="auto"
        />
      </Box>
      <Box flex="1" order={{ base: 1, md: 2 }}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          mb={6}
          lineHeight="1.2"
        >
          {arrangementData?.content_2_title}
        </Heading>
        <Text mb={4} whiteSpace="pre-line" textAlign="justify">
          {arrangementData?.content_2_description}
        </Text>
      </Box>
    </Flex>
  );
}
