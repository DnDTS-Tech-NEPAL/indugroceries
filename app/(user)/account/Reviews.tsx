"use client";

import {
  Box,
  Heading,
  VStack,
  Text,
  Flex,
  Image,
  HStack,
  Button,
} from "@chakra-ui/react";
import StarRating from "./StarRating";
import { useColorModeValue } from "@/components/ui/color-mode";

type Review = {
  product: string;
  price: string;
  date: string;
  rating: number;
  review: string;
  image: string;
};

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg="white"
      rounded="lg"
      border="1px"
      borderColor={borderColor}
    >
     <Text fontSize={"2xl"} fontWeight={"medium"} mb={8}>
        Reviews ({reviews.length} items)
      </Text>

      <VStack gap={8} align="stretch" mt={4}>
        {reviews.map((review, index) => (
          <Box
            key={index}
            bg={"#28353D0A"}
            pb={8}
            p={4}
            borderRadius={"md"}
            borderBottom="1px"
            borderColor={borderColor}
            _last={{ borderBottom: "none" }}
          >
            <Flex justify="space-between" align="start" mb={4}>
              <Text fontSize="sm" color={textColor}>
                {review.date}
              </Text>
            </Flex>

            <HStack align="start" gap={4}>
              <Image
                src={review.image}
                alt="Product"
                boxSize="60px"
                rounded="lg"
                border="1px"
                borderColor={borderColor}
              />
              <VStack align="start" gap={2} flex={1}>
                <Text fontWeight="medium">{review.product}</Text>
                <Text fontSize="sm" color={textColor}>
                  {review.price}
                </Text>
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
