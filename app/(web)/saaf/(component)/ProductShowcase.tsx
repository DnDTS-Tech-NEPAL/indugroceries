"use client";
import {
  Box,
  Heading,
  Text,
  Grid,
  SimpleGrid,
  VStack,
  Image,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { useSaafPageQuery } from "@/hooks/api/(web)/saaf";

export default function ProductShowcase() {
  const { data: saafData } = useSaafPageQuery();

  return (
    <Box
      py={{ base: 10, md: 16 }}
      px={{ base: 4, sm: 6, md: 10 }}
      maxW="container.xl"
      mx="auto"
    >
      {/* Heading Section */}
      <VStack gap={4} textAlign="center" mb={{ base: 8, md: 12 }}>
        <Heading
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="bold"
        >
          {saafData?.product_title || "Product Showcase"}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="2xl">
          {saafData?.product_description ||
            "Explore our Saaf Eco-Brand offerings for authentic, eco-conscious solutions."}
        </Text>
      </VStack>

      {/* Image Grid */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: 6, md: 8 }}
        alignItems="stretch"
      >
        {/* Left Main Image */}
        <Box w="100%" aspectRatio={1} overflow="hidden" boxShadow="lg">
          {saafData?.image_1_link ? (
            <Image
              src={saafData.image_1_link}
              alt="Main Product"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          ) : (
            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="gray.100"
            >
              <FaImage size="60px" color="gray.400" />
            </Box>
          )}
        </Box>

        {/* Right 2x2 Sub Images */}
        <SimpleGrid columns={2} gap={4}>
          {[
            saafData?.image_2_link,
            saafData?.image_3_link,
            saafData?.image_4_link,
            saafData?.image_5_link,
          ].map((img, i) => (
            <Box
              key={i}
              w="100%"
              aspectRatio={1}
              overflow="hidden"
              boxShadow="md"
            >
              {img ? (
                <Image
                  src={img}
                  alt={`Product ${i + 2}`}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              ) : (
                <Box
                  w="100%"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.100"
                >
                  <FaImage size="40px" color="gray.400" />
                </Box>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Grid>
    </Box>
  );
}
