"use client";

import {
  Box,
  VStack,
  Text,
  Flex,
  Image,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import StarRating from "./StarRating";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useUserProfileQuery } from "@/hooks/api";

export default function Reviews() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const { data: profileData, isLoading } = useUserProfileQuery();
  const reviews = profileData?.reviews ?? [];
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box bg="white" rounded="lg" border="1px" borderColor={borderColor}>
      <Text fontSize="2xl" fontWeight="medium" mb={8}>
        Reviews ({reviews.length} items)
      </Text>

      <VStack gap={8} align="stretch" mt={4}>
        {reviews.map((review, index) => (
          <Box
            key={index}
            bg="#28353D0A"
            pb={8}
            p={4}
            borderRadius="md"
            borderBottom="1px"
            borderColor={borderColor}
            _last={{ borderBottom: "none" }}
          >
            <Flex justify="space-between" align="start" mb={4}>
              <Text fontSize="sm" color={textColor}>
                {review.posted_on}
              </Text>
            </Flex>

            <HStack align="start" gap={4}>
              <Image
                src={review.custom_image_1_link}
                alt="Product"
                boxSize="60px"
                rounded="lg"
                border="1px"
                borderColor={borderColor}
              />
              <VStack align="start" gap={2} flex={1}>
                <Text fontWeight="medium">{review.item_code}</Text>
                {/* You can show actual product title if available via separate API */}
                <StarRating rating={review.rating} />
                <Text fontSize="sm" color="gray.700" lineHeight="relaxed">
                  {review.review}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
