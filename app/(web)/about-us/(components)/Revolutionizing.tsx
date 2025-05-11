"use client";

import Image from "next/image";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { RevolutionizingProps } from "@/types";

export const Revolutionizing = ({ data }: RevolutionizingProps) => {
  return (
    <Box position={"relative"} bg="white" overflow="hidden">
      <Box
        position="relative"
        flex="1"
        minH={{ base: "350px", md: "350px", lg: "420px" }}
        m="0"
        p="0"
      >
        <Image
          src={data?.hero_image}
          alt={data?.title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          loading="eager"
        />
        {/* Dark overlay for readability */}
        <Box
          position="absolute"
          inset="0"
          bg="rgba(0, 0, 0, 0.68)"
          zIndex={1}
        />
      </Box>

      <VStack
        position="absolute"
        top={10}
        align="center"
        justify="center"
        gap={5}
        zIndex={2}
        p={{ base: 5, md: 10 }}
      >
        <Heading
          fontSize={{ base: "40px", md: "56px" }}
          lineHeight="1.3"
          alignContent={"center"}
          color="white"
          textAlign={"center"}
        >
          {data?.title}
        </Heading>
        <Text
          fontSize={{ base: "16px", md: "18px" }}
          width={{ sm: "90%", base: "full", md: "63%" }}
          mx={"auto"}
          color="white"
          textAlign="center"
          lineHeight={1.5}
        >
          {data?.description}
        </Text>
      </VStack>
    </Box>
  );
};
