"use client";

import { useQualityCompliancePageQuery } from "@/hooks/api/(web)/qualityCompliance";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function ArrangementSection() {
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
      <Box flex="1">
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          mb={6}
          maxW={{ base: "100%", md: "80%" }}
          lineHeight="1.2"
        >
          {arrangementData?.content_title}
        </Heading>
        <Text mb={4} whiteSpace="pre-line" textAlign="justify">
          {arrangementData?.content_description}
        </Text>
      </Box>

      <Box flex="1" textAlign="center">
        <Image
          src={`${arrangementData?.content_image_link}`}
          alt="Australian Government Department of Agriculture, Fisheries and Forestry"
          aspectRatio={1}
          mx="auto"
        />
      </Box>
    </Flex>
  );
}
