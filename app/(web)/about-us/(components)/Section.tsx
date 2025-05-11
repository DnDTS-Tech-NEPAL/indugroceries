"use client";

import Image from "next/image";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import { CheckIcon } from "@/assets/svg";
import { SectionProps } from "@/types";

export const Section = ({
  title,
  description,
  imageSrc,
  imageDirection = "left",
  points,
}: SectionProps) => {
  const isImageOnLeft = imageDirection === "left";

  return (
    <Flex
      flexDirection={{
        base: "column",
        lg: isImageOnLeft ? "row" : "row-reverse",
      }}
      justifyContent="space-between"
      maxW="1280px"
      mx="auto"
      gap={{ base: "40px", lg: "60px", xl: "100px" }}
      alignItems="center"
      px={{ base: 6, md: 12 }}
      mt={{ base: "50px", md: "20px" }}
      mb={{ base: "50px", md: "20px" }}
      py={{ base: "60px", md: "80px" }}
      bgGradient="linear(to-br, white, gray.50)"
      my="auto"
    >
      <Box w={{ base: "100%", md: "80%", lg: "50%" }} mx="auto">
        <VStack align="start" gap={4}>
          <Heading fontWeight={400} fontSize={{ base: "20px", lg: "28px" }}>
            {title}
          </Heading>

          <Text
            variant={{ base: "subtitle3", md: "subtitle2" }}
            fontWeight={400}
            color="gray.800"
            textAlign="justify"
            lineHeight="1.5"
            fontSize={{ base: "13px", md: "16px" }}
          >
            {description}
          </Text>

          <Box>
            <VStack
              align="start"
              gap={{ base: "14px", lg: "20px", xl: "24px" }}
              mt={{ base: "0px", md: "15px", lg: "24px" }}
            >
              {Array.isArray(points) &&
                points.map((item, index) => (
                  <Flex
                    key={index}
                    align="start"
                    gap="12px"
                    flexDirection="column"
                  >
                    <Flex key={index} align="center" gap="12px">
                      <CheckIcon />
                      <Text
                        variant={{ base: "subtitle3", md: "subtitle2" }}
                        fontWeight={500}
                        fontSize={{ sm: "14px", md: "16px" }}
                        color="primary.300"
                      >
                        {item.title}
                      </Text>
                    </Flex>
                    {item.description && (
                      <Text
                        variant={{ base: "subtitle3", md: "subtitle2" }}
                        fontWeight={400}
                        color="gray.800"
                        textAlign="justify"
                        lineHeight="1.5"
                        fontSize={{ base: "13px", md: "16px" }}
                        pl="2.5rem"
                      >
                        {item.description}
                      </Text>
                    )}
                  </Flex>
                ))}
            </VStack>
          </Box>
        </VStack>
      </Box>
      {/* Image Section */}
      <Box
        w={{ base: "100%", sm: "100%", md: "70%", lg: "45%" }}
        h={{
          base: "270px",
          md: "380px",
          lg: "460px",
          xl: "500px",
        }}
        position="relative"
        borderRadius="2xl"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="whiteAlpha.300"
        backdropFilter="blur(14px)"
        boxShadow="2xl"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center",
            padding: "20px",
          }}
        />
      </Box>
    </Flex>
  );
};
