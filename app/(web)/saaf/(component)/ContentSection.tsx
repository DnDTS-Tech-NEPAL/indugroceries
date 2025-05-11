"use client";
import {
  Box,
  Heading,
  Stack,
  Text,
  Flex,
  Center,
  Image,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { useSaafPageQuery } from "@/hooks/api/(web)/saaf";

export default function ContentSection() {
  const { data: saafData } = useSaafPageQuery();

  return (
    <Box
      display="flex"
      justifyContent="center"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, sm: 6, md: 10 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={{ base: 8, md: 16 }}
        maxW="1200px"
        w="100%"
      >
        <Box flexBasis={{ base: "100%", md: "50%" }}>
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
            mb={{ base: 4, md: 5 }}
            lineHeight="short"
            maxW="400px"
          >
            {saafData?.brand_tagline ||
              "Discover the Essence of Saaf Eco-Brand"}
          </Heading>

          <Stack gap={2}>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              color="gray.600"
              lineHeight="tall"
              whiteSpace="pre-line"
              textAlign={"justify"}
            >
              {saafData?.brand_description}
            </Text>
          </Stack>
        </Box>

        <Center
          flexBasis={{ base: "100%", md: "50%" }}
          w="100%"
          mt={{ base: 6, md: 0 }}
        >
          <Box
            w="100%"
            maxW="550px"
            aspectRatio={1}
            bg="gray.200"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {saafData?.brand_image ? (
              <Image
                src={saafData.brand_image}
                alt="Content Visual"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            ) : (
              <Center color="gray.500">
                <FaImage size="80px" />
              </Center>
            )}
          </Box>
        </Center>
      </Flex>
    </Box>
  );
}
