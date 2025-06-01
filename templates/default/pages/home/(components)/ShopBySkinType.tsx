// components/ShopBySkinType.tsx
"use client";

import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

const skinTypes = [
  { label: "Oily Skin", image: "/images/oily-skin.png" },
  { label: "Combo Skin", image: "/images/combo-skin.png" },
  { label: "Dry Skin", image: "/images/dry-skin.png" },
  { label: "Balanced Skin", image: "/images/balanced-skin.png" },
];

export const ShopBySkinType = () => {
  return (
    <VStack gap={8} py={16} px={4} textAlign="center">
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>Shop By Skin Type</Heading>
      <Flex wrap="wrap" justify="center" gap={8}>
        {skinTypes.map((type) => (
          <VStack
            key={type.label}
            bg="gray.50"
            borderRadius="full"
            w="220px"
            h="220px"
            justify="center"
            align="center"
            position="relative"
          >
            <Image src={type.image} alt={type.label} width={160} height={160} />
            <Box
              position="absolute"
              top="20px"
              right="20px"
              bg="pink.400"
              color="white"
              px={4}
              py={1}
              rounded={"full"}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
            >
              {type.label}
            </Box>
          </VStack>
        ))}
      </Flex>
    </VStack>
  );
};