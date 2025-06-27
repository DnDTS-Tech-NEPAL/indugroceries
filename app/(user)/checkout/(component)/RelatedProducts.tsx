"use client";

import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
interface productType {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
}

export default function RelatedProducts({
  products,
}: {
  products: productType[];
}) {
  return (
    <Box paddingY={6}>
      <Text fontSize="xl" fontWeight={500} mb={4}>
        Related Products
      </Text>
      <VStack gap={3} align="stretch">
        {products.map((product) => (
          <HStack
            key={product.id}
            bg="gray.50"
            borderRadius="lg"
            p={4}
            justify="space-between"
            align="center"
          >
            <HStack gap={4}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                boxSize="60px"
                borderRadius="md"
                objectFit="cover"
              />
              <VStack align="start" gap={1}>
                <Text fontSize="sm" fontWeight="medium">
                  {product.name}
                </Text>
                <HStack gap={2}>
                  <Text fontSize="md" fontWeight="bold" color="pink.500">
                    Rs {product.discountedPrice}
                  </Text>

                  <Text colorScheme="pink" color={"pink.500"} fontSize="xs">
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

            {/* "Add" as plain pink text (not a button) */}
            <Text
              fontSize="sm"
              color="pink.500"
              fontWeight="medium"
              textDecoration={"underline"}
            >
              Add
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
