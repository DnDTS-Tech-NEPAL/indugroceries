"use client";
import { useQualityCompliancePageQuery } from "@/hooks/api/(web)/qualityCompliance";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";

export default function SmartErpSection() {
  const { data: featureData } = useQualityCompliancePageQuery();
  const features = featureData?.features_table || [];

  const headingSize = useBreakpointValue({ base: "xl", md: "3xl", lg: "4xl" });
  const gridColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(4, 1fr)",
  });

  if (!features.length) return null;

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: 4, md: 8, lg: 10 }}
      py={{ base: 12, md: 20 }}
    >
      {/* Heading and Description */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 6, md: 10 }}
        mb={{ base: 8, md: 16 }}
        align={{ md: "flex-start" }}
      >
        <Heading
          fontSize={headingSize}
          fontWeight="bold"
          flex={{ md: 1 }}
          lineHeight="1.2"
        >
          {featureData?.feature_title}
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          flex={{ md: 1 }}
          color="gray.600"
          lineHeight="1.6"
        >
          {featureData?.feature_description}
        </Text>
      </Flex>

      {/* Features Grid */}
      <Grid templateColumns={gridColumns} gap={{ base: 8, md: 6, lg: 8 }}>
        {features.map((feature, index) => (
          <Stack
            key={index}
            gap={4}
            p={{ base: 4, md: 5 }}
            borderRadius="lg"
            _hover={{ boxShadow: "md", transform: "translateY(-4px)" }}
            transition="all 0.2s ease"
          >
            {feature.icon_image_link ? (
              <Image
                src={feature.icon_image_link}
                alt={feature.title}
                boxSize={8}
                objectFit="contain"
              />
            ) : (
              <Box boxSize={8} bg="gray.200" borderRadius="full" />
            )}
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
              {feature.title}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
              {feature.description}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Box>
  );
}
