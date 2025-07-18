"use client";
import { useConfigQuery } from "@/hooks/api";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

type Product = {
  id: string;
  title: string;
  image?: string;
  name?: string;
  price?: string;
  item_price?: string;
  total?: number;
  discountedPrice?: string;
  discountPercentage?: string;
  originalPrice?: number;
  quantity?: number;
};

export default function SelectedProduct({ products }: { products: Product[] }) {
  const { data: config } = useConfigQuery();
  return (
    <Box>
      <VStack gap={4} align="stretch" maxH={"350px"} overflowY="auto">
        {products.map((product) => (
          <Box
            key={product.id}
            bg="gray.50"
            borderRadius="lg"
            px={4}
            py={3}
            w="full"
          >
            <HStack justify="space-between" align="flex-end">
              <HStack gap={4}>
                <Image
                  src={product.image || config.company_details_url}
                  alt={product.title}
                  boxSize="60px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <VStack align="start" gap={1}>
                  <Text fontWeight="medium" fontSize="sm">
                    {product.title}
                  </Text>
                  <HStack gap={2}>
                    <Text fontSize="md" fontWeight="bold" color="pink.500">
                      Rs {product.discountedPrice}
                    </Text>
                    {product.discountPercentage &&
                    product.discountPercentage !== "0.00" ? (
                      <Text fontSize="sm" color="pink.400">
                        Discounted Price
                      </Text>
                    ) : null}
                  </HStack>
                  {product.discountPercentage &&
                  product.discountPercentage !== "0.00" ? (
                    <HStack gap={2}>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        textDecoration="line-through"
                      >
                        Rs {product.price}
                      </Text>
                      <Text fontSize="xs" color="pink.400">
                        {product.discountPercentage} % Off
                      </Text>
                    </HStack>
                  ) : null}
                </VStack>
              </HStack>
              <Text
                fontSize="sm"
                color="gray.600"
                whiteSpace="nowrap"
                alignItems={"end"}
              >
                Qty: {product.quantity || 1}
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
