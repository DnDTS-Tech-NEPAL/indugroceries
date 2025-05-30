"use client";

import type React from "react";
import { Box, Button, Grid, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useQuizPageQuery } from "@/hooks/api";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const { data: quiz } = useQuizPageQuery();

  return (
    <Box maxW="7xl" mx="auto" my={12} px={4} bg={"white"}>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={8}
        alignItems="center"
      >
        {/* Left: Content */}
        <Box>
          <Stack gap={6}>
            <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" lineHeight={1.2}>
              {quiz?.title}
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
              {quiz?.description}
            </Text>
            <Button
              onClick={onStart}
              size="lg"
              bg="#FF6996"
              color="white"
              _hover={{ bg: "pink.500" }}
              px={8}
              rounded="full"
              alignSelf="start"
            >
              Let&apos;s Get Started
            </Button>
          </Stack>
        </Box>

        {/* Right: Image */}
        <Box
          position="relative"
          width="100%"
          height={{ base: "300px", md: "400px" }}
          rounded="2xl"
          overflow="hidden"
        >
          {quiz?.hero_image_link && (
            <Image
              src={quiz.hero_image_link}
              alt="Hero image"
              fill
              objectFit="cover"
              objectPosition="right"
              quality={90}
              priority
            />
          )}
        </Box>
      </Grid>
    </Box>
  );
}
