"use client";

import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

type Product = {
  id: string;
  name: string;
  image?: string;
  discountedPrice: number;
  originalPrice: number;
  quantity?: number;
};

export default function SelectedProduct({ products }: { products: Product[] }) {
  return (
    <Box>
      <VStack gap={4} align="stretch">
        {products.map((product) => (
          <Box
            key={product.id}
            bg="gray.50"
            borderRadius="lg"
            px={4}
            py={3}
            w="full"
          >
            <HStack justify="space-between" align="flex-start">
              <HStack gap={4}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  boxSize="60px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <VStack align="start" gap={1}>
                  <Text fontWeight="medium" fontSize="sm">
                    {product.name}
                  </Text>
                  <HStack gap={2}>
                    <Text fontSize="md" fontWeight="bold" color="pink.500">
                      Rs {product.discountedPrice}
                    </Text>
                    <Text fontSize="sm" color="pink.400">
                      Discounted Price
                    </Text>
                  </HStack>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    textDecoration="line-through"
                  >
                    Rs {product.originalPrice}
                  </Text>
                </VStack>
              </HStack>
              <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                Qty: {product.quantity || 1}
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
