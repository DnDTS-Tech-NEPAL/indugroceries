"use client";

import type React from "react";

import { Box, Button, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import { SkinTestBgImage, SkinTestHeroImage } from "@/assets/image";
import Image from "next/image";
interface LandingPageProps {
  onStart: () => void;
}
export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <Grid
      maxW={"6xl"}
      mx={"auto"}
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={8}
      py={12}
      alignItems="center"
    >
      <Box>
        <Stack gap={6}>
          <Text fontSize={"4xl"} lineHeight={1.2}>
            Discover Your Skin Type in 60 Seconds
          </Text>
          <Text fontSize="lg" color={"gray.600"}>
            Take our free quiz to find your skin type and get personalized
            product recommendations tailored just for you.
          </Text>
          <Box>
            <Button
              onClick={onStart}
              size="lg"
              bg="#FF6996"
              color="white"
              _hover={{ bg: "pink.500" }}
              px={8}
              rounded="full"
            >
              Let&apos;s Get Started
            </Button>
          </Box>
        </Stack>
      </Box>

      <Flex justifyContent="center">
        <Box
          position="relative"
          rounded="2xl"
          overflow="hidden"
          maxW="2xl"
          bgImage={`url(${SkinTestBgImage.src})`}
          bgSize="cover"
          backgroundPosition={"right"}
        >
          <Image
            src={SkinTestHeroImage}
            alt="Woman with beautiful skin"
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Grid>
  );
}
