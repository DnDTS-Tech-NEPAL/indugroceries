"use client";
import { useSkinTypePageQuery } from "@/hooks/api";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export const ShopBySkinType = () => {
  const { data: skinTypeData } = useSkinTypePageQuery();
  return (
    <VStack gap={8} py={16} px={4} textAlign="center">
      <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={13}>Shop By Skin Type</Heading>
      <Flex wrap="wrap" justify="center" gap={8}>
        {skinTypeData?.map((skinType) => (
          <VStack
            key={skinType.name}
            justify="center"
            align="center"
            position="relative"
            gap={4}
          >
            <Box
              width="200px"
              height="200px"
              borderRadius="full"
              overflow="hidden"
              position="relative"
            >
              <Image
                src={skinType.image}
                alt={skinType.name}
                fill
                style={{ 
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </Box>
            <Box
              position="absolute"
              top="30px"
              right="40px"
              bg="#FF6996"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
              width="80px"
              height="80px"
              textAlign="center"
            >
              {skinType.name}
            </Box>
          </VStack>
        ))}
      </Flex>
    </VStack>
  );
};