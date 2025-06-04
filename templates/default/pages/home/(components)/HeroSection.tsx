"use client"

import { useRouter } from "next/navigation"
import { useRef } from "react"
import { Box, HStack, VStack, Button, Text, Heading } from "@chakra-ui/react"

import { Swiper } from "@/components"
import { ROUTES } from "@/constants"
import { useHomePageQuery } from "@/hooks/api"
// import { useHeroSectionSliderCalculations, useSliderImages, useWindowSize } from "@/hooks/app"
import type { HeroSectionProps } from "@/types"
import { useRegisterDialogStore } from "@/store"
import { useSliderImages, useWindowSize } from "@/hooks/app"

export const HeroSection = ({ initialData }: HeroSectionProps) => {
  const router = useRouter()
  const innerContainerRef = useRef<HTMLDivElement | null>(null)
  // const { extraPadding, tenPercentOfInnerContainer } = useHeroSectionSlderCalculations(innerContainerRef)
  const { width } = useWindowSize()
  const { updateSignUpOpen } = useRegisterDialogStore()

  // Set initial data to react query fetched from the server
  useHomePageQuery(initialData)

  const homeData = initialData.Data
  const heroType = homeData.hero_type
  const heroContent = homeData.content?.[0]

  const slides = useSliderImages()
  const direction = width < 1024 ? "horizontal" : "vertical"

  // Full Image: Display full-width and full-height image only
  if (heroType === "Full Image") {
    return (
      <Box position="relative" width="100%" maxW={"7xl"} aspectRatio={16 / 8} overflow="hidden">
        <Swiper slides={slides} direction="horizontal" />
      </Box>
    )
  }

  // Full Image/Content: Full-screen image background with overlaid content
  if (heroType === "Full Image/Content") {
    return (
      <Box position="relative" width="100%" height={{ base: "70dvh", md: "85dvh" }} overflow="hidden">
        <Swiper slides={slides} direction="horizontal" />
      </Box>
    )
  }

  // Half Image: 50/50 split between image and content
  if (heroType === "Half Image") {
    return (
      <Box position="relative" width="100%" height={{ base: "70dvh", md: "85dvh" }} overflow="hidden">
        <Swiper slides={slides} direction="horizontal" />
      </Box>
    )
  }

  // Default fallback - keeping original layout for backward compatibility
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
          <VStack alignItems="stretch" justifyContent="center" gap={{ base: "20px", lg: "8px", "2xl": "16px" }}>
            <Heading as="h1" variant={{ base: "heading4", md: "heading3", "2xl": "heading1" }}>
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

            <HStack alignItems="stretch" flexDirection={{ base: "column", lg: "row" }} gap="16px" py="16px">
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
          }}
          height={{ base: "400px", lg: "full" }}
          cursor="pointer"
          onClick={() => router.push(ROUTES.APP.PRODUCTS)}
        >
          <Box position="relative" width="full" height={{ base: "full", lg: "90%", "2xl": "full" }} overflow="hidden">
            <Swiper slides={slides} direction={direction} />
          </Box>
        </VStack>
      </HStack>
    </Box>
  )
}
