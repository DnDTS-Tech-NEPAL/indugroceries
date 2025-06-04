"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Box, HStack, VStack, Button, Text, Heading } from "@chakra-ui/react";

import { Swiper } from "@/components";
import { ROUTES } from "@/constants";
import { useHomePageQuery } from "@/hooks/api";
import {
  useHeroSectionSliderCalculations,
  useSliderImages,
  useWindowSize,
} from "@/hooks/app";
import { HeroSectionProps } from "@/types";
import { useRegisterDialogStore } from "@/store";
import { FaArrowRightLong } from "react-icons/fa6";

export const HeroSection = ({ initialData }: HeroSectionProps) => {
  const router = useRouter();
  const innerContainerRef = useRef<HTMLDivElement | null>(null);
  const { extraPadding, tenPercentOfInnerContainer } = useHeroSectionSliderCalculations(innerContainerRef);
  const { width } = useWindowSize();
  const { updateSignUpOpen } = useRegisterDialogStore();

  // Set initial data to react query fetched from the server
  useHomePageQuery(initialData);

  const homeData = initialData.Data;
  const heroType = homeData.hero_type;
  const heroContent = homeData.content?.[0]; 

  const slides = useSliderImages();
  const direction = width < 1024 ? "horizontal" : "vertical";

  if (heroType === "Full Image") {
    return (
      <Box
        position="relative"
        width="100%"
        maxW={"7xl"}
        aspectRatio={16 / 8}
        overflow="hidden"
      >
        <Swiper slides={slides} direction="horizontal" />
      </Box>
    );
  }

  if (heroType === "Full Image/Content") {
    return (
      <Box
        position="relative"
        width="100%"
        height={{ base: "70dvh", md: "85dvh" }}
        overflow="hidden"
      >
        <Box position="absolute" inset="0" zIndex={0}>
          <Swiper slides={slides} direction="horizontal" />
        </Box>

        {/* Dark overlay for readability */}
        <Box position="absolute" inset="0" bg="blackAlpha.100" zIndex={1} />

        {/* Content */}
        <Box
          position="relative"
          zIndex={2}
          maxW="1280px"
          mx="auto"
          px={{ base: 6, md: 10 }}
          py={10}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent={heroContent?.align_content === "Right" ? "flex-end" : "flex-start"}
        >
          <VStack
            alignItems="flex-start"
            gap={6}
            maxW={{ base: "100%", md: "50%" }}
            color="white"
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "xl" }}
              w={{ base: "full", xl: "87%" }}
              opacity={0.9}
              textAlign="justify"
            >
              {heroContent?.hero_tagline}
            </Text>
            <Heading
              as="h1"
              w={{ base: "full", lg: "75%" }}
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              lineHeight="1.2"
            >
              {heroContent?.hero_title}
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              w={{ base: "full", xl: "87%" }}
              opacity={0.9}
              textAlign="justify"
            >
              {heroContent?.hero_description}
            </Text>
            <HStack gap={8}>
              <Button
                colorScheme="green"
                bg={"#F8E1E7"}
                color={"gray.700"}
                borderRadius="3xl"
                onClick={() => router.push(ROUTES.APP.PRODUCTS)}
              >
                Shop Now <FaArrowRightLong />
              </Button>
              <Button
                color="white"
                bg={"#FF6996"}
                borderRadius="3xl"
                onClick={() => router.push(ROUTES.APP.BRANDS)}
              >
                Shop Brands <FaArrowRightLong />
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      px={{ base: "20px", md: "40px" }}
      paddingTop="32px"
      backgroundColor={heroContent?.background_color || "primary.500"}
    >
      <HStack
        ref={innerContainerRef}
        flexDirection={{
          base: "column",
          lg: heroContent?.align_content === "Right" ? "row-reverse" : "row",
        }}
        alignItems="stretch"
        justifyContent="space-between"
        gap={{ base: "24px", lg: "0" }}
        mx="auto"
        maxWidth="1280px"
        height={{
          base: "auto",
          lg: "calc(100vh - 120px)",
        }}
        minHeight="600px"
        maxHeight="750px"
        overflow="hidden"
      >
        <VStack
          justifyContent="center"
          alignItems="center"
          flexShrink="0"
          width={{
            base: "full",
            lg: "calc(50% - 16px)",
            "2xl": "calc(60% - 32px)",
          }}
        >
          <VStack
            alignItems="stretch"
            justifyContent="center"
            gap={{ base: "20px", lg: "8px", "2xl": "16px" }}
          >
            <Heading
              as="h1"
              variant={{ base: "heading4", md: "heading3", "2xl": "heading1" }}
            >
              {heroContent?.hero_title}
            </Heading>
            <Text
              variant={{
                base: "paragraphSmall",
                md: "paragraphRegular",
                xl: "paragraphLarge",
              }}
              color={{ lg: "primary.300" }}
            >
              {heroContent?.hero_description}
            </Text>

            <HStack
              alignItems="stretch"
              flexDirection={{ base: "column", lg: "row" }}
              gap="16px"
              py="16px"
            >
              <Button
                onClick={() => router.push(ROUTES.APP.PRODUCTS)}
                data-testid="Explore-now-button"
                borderRadius={"full"}
                variant="solid"
                px={"24px"}
              >
                Explore Now
              </Button>
            </HStack>
          </VStack>
        </VStack>

        <VStack
          position={{ base: "relative", lg: "absolute" }}
          top="0"
          right={heroContent?.align_content === "Right" ? "auto" : "0"}
          left={heroContent?.align_content === "Right" ? "0" : "auto"}
          alignItems="center"
          justifyContent="center"
          width={{
            base: "full",
            lg: width > 0
              ? `calc(50% - ${tenPercentOfInnerContainer}px + ${extraPadding}px)`
              : 0,
          }}
          height={{ base: "400px", lg: "full" }}
          cursor="pointer"
          onClick={() => router.push(ROUTES.APP.PRODUCTS)}
        >
          <Box
            position="relative"
            width="full"
            height={{ base: "full", lg: "90%", "2xl": "full" }}
            overflow="hidden"
          >
            <Swiper slides={slides} direction={direction} />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};