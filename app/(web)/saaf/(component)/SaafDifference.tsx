"use client";

import { Box, VStack, Text, Heading, Image, Flex } from "@chakra-ui/react";
import { useSaafPageQuery } from "@/hooks/api/(web)/saaf";

export default function SaafDifference() {
  const { data: saafData } = useSaafPageQuery();
  const features = saafData?.features_table || [];

  if (!features.length) {
    return null;
  }

  return (
    <Box py={12} textAlign="center" px={{ base: 4, md: 10 }}>
      <Heading as="h2" size="xl" mb={16}>
        {saafData?.feature_title || "The Saaf Difference"}
      </Heading>

      <Flex
        justifyContent="space around"
        flexWrap={"wrap"}
        gap={{ base: 8, md: 12 }}
        justifyItems="center"
      >
        {features.map((feature, index) => (
          <VStack
            key={index}
            gap={4}
            textAlign="center"
            flexGrow={1}
            flexBasis={{ base: "100%", md: "25%" }}
          >
            {feature.icon_link ? (
              <Image
                src={feature.icon_link}
                alt={feature.description}
                boxSize="90px"
                objectFit="cover"
              />
            ) : (
              <Box boxSize="90px" bg="gray.100" borderRadius="full" />
            )}
            <Text fontWeight="semibold" fontSize="lg">
              {feature.description}
            </Text>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
}
