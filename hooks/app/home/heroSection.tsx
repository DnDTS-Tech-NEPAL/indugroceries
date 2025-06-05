"use client";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { HomePageType } from "@/types";
import Image from "next/image";
import { Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";

export const useSliderImages = () => {
  const { data: config } = useConfigQuery();
  const { data: homeData } = useHomePageQuery();

  // Get hero type and content
  const heroType = homeData?.hero_type;
  const heroContent = homeData?.content || [];

  // Get all hero images from content array with all properties
  const heroImages = heroContent.map((item) => ({
    imageUrl:
      item.hero_image_link ||
      item.hero_image ||
      config?.company_details_url ||
      "",
    redirectUrl: "#",
    title: item.hero_title,
    titleColor: item.hero_title_color,
    description: item.hero_description,
    descriptionColor: item.hero_description_color,
    tagline: item.hero_tagline,
    taglineColor: item.hero_tagline_color,
    alignContent: item.align_content,
    backgroundColor: item.background_color,
    button1: {
      label: item.button_1_label,
      color: item.button_1_color,
      textColor: item.button_1_text_color,
      redirect: item.button_1_redirect_link || "#",
    },
    button2: {
      label: item.button_2_label,
      color: item.button_2_color,
      textColor: item.button_2_text_color,
      redirect: item.button_2_redirect_link || "#",
    },
  }));

  const fallbackImages = (Object.keys(homeData || {}) as (keyof HomePageType)[])
    .filter(
      (key) =>
        key.startsWith("main_img") &&
        key.endsWith("_url") &&
        typeof homeData?.[key as keyof HomePageType] === "string" &&
        (homeData?.[key as keyof HomePageType] as string).trim() !== ""
    )
    .map((key) => {
      const imageUrl = String(
        homeData?.[key] || config?.company_details_url || ""
      );
      const redirectKey = key.replace(
        "_url",
        "_redirect"
      ) as keyof HomePageType;
      const redirectUrl = String(homeData?.[redirectKey] || "#");

      return {
        imageUrl,
        redirectUrl,
        title: "",
        titleColor: "inherit",
        description: "",
        descriptionColor: "inherit",
        tagline: "",
        taglineColor: "inherit",
        alignContent: "Left",
        backgroundColor: "primary.500",
        button1: {
          label: "Shop Now",
          color: "#3182CE",
          textColor: "white",
          redirect: "#",
        },
        button2: {
          label: "Learn More",
          color: "#E2E8F0",
          textColor: "black",
          redirect: "#",
        },
      };
    });

  const imagesToUse = heroImages.length > 0 ? heroImages : fallbackImages;

  const slides = imagesToUse.map((item, index) => {
    const {
      imageUrl,
      redirectUrl,
      title,
      titleColor,
      description,
      descriptionColor,
      tagline,
      taglineColor,
      alignContent,
      backgroundColor,
      button1,
      button2,
    } = item;

    // Helper function to handle button clicks
    const handleButtonClick = (url: string) => {
      if (url && url !== "#") {
        window.location.href = url;
      }
    };

    // Full Image: Just the image, full width and height
    if (heroType === "Full Image") {
      return (
        <Box
          key={index}
          width="100%"
          height="100%"
          position="relative"
          cursor="pointer"
          onClick={() => handleButtonClick(redirectUrl)}
        >
          <Image
            src={imageUrl || "/placeholder.svg?height=600&width=1200"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ 
              objectFit: "cover", 
              objectPosition: "center",
            }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </Box>
      );
    }

    // Half Image: 50/50 split with content and image
    if (heroType === "Half Image") {
      return (
        <Box
          key={index}
          width="100%"
          height="100%"
          display="flex"
          flexDirection={{
            base: "column",
            lg: alignContent === "Right" ? "row" : "row-reverse",
          }}
        >
          {/* Image Side */}
          <Box
            width={{ base: "100%", lg: "50%" }}
            height={{ base: "50%", lg: "100%" }}
            position="relative"
            cursor="pointer"
            onClick={() => handleButtonClick(redirectUrl)}
          >
            <Image
              src={imageUrl || "/placeholder.svg?height=600&width=600"}
              alt={`Banner ${index + 1}`}
              fill
              style={{ 
                objectFit: "cover", 
                objectPosition: "center" 
              }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </Box>

          {/* Content Side */}
          <Box
            width={{ base: "100%", lg: "50%" }}
            height={{ base: "50%", lg: "100%" }}
            bg={backgroundColor}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            p={{ base: 4, md: 6, lg: 8 }}
          >
            {tagline && (
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={taglineColor}
                mb={2}
              >
                {tagline}
              </Text>
            )}
            {title && (
              <Heading
                as="h1"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
                lineHeight="1.2"
                mb={4}
                color={titleColor}
              >
                {title}
              </Heading>
            )}
            {description && (
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                mb={6}
                maxWidth="90%"
                color={descriptionColor}
              >
                {description}
              </Text>
            )}
            <HStack gap={4} flexWrap="wrap">
              {button1.label && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(button1.redirect);
                  }}
                  bg={button1.color}
                  color={button1.textColor}
                  _hover={{ opacity: 0.9 }}
                  size={{ base: "md", md: "lg" }}
                  rounded={"full"}
                >
                  {button1.label} <FaArrowRightLong />
                </Button>
              )}
              {button2.label && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(button2.redirect);
                  }}
                  bg={button2.color}
                  color={button2.textColor}
                  _hover={{ opacity: 0.9 }}
                  size={{ base: "md", md: "lg" }}
                  rounded={"full"}
                >
                  {button2.label} <FaArrowRightLong />
                </Button>
              )}
            </HStack>
          </Box>
        </Box>
      );
    }

    // Full Image/Content: Full image background with overlaid content
    if (heroType === "Full Image/Content") {
      return (
        <Box
          key={index}
          width="100%"
          height="100%"
          position="relative"
          cursor="pointer"
          onClick={() => handleButtonClick(redirectUrl)}
        >
          {/* Background Image */}
          <Image
            src={imageUrl || "/placeholder.svg?height=600&width=1200"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ 
              objectFit: "cover", 
              objectPosition: "center" 
            }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />

          {/* Dark overlay for readability */}
          <Box position="absolute" inset="0" bg="blackAlpha.400" zIndex={1} />

          {/* Content Overlay */}
          <Box
            position="absolute"
            inset="0"
            display="flex"
            alignItems="center"
            justifyContent={{
              base: "center",
              lg: alignContent === "Right" ? "flex-end" : "flex-start",
            }}
            p={{ base: 4, md: 8, lg: 12 }}
            zIndex={2}
          >
            <Box
              maxWidth={{ base: "100%", sm: "90%", md: "80%", lg: "50%" }}
              textAlign={{
                base: "center",
                lg: alignContent === "Right" ? "right" : "left",
              }}
            >
              {tagline && (
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  opacity={0.9}
                  mb={4}
                  color={taglineColor}
                >
                  {tagline}
                </Text>
              )}
              {title && (
                <Heading
                  as="h1"
                  fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="bold"
                  mb={4}
                  lineHeight="1.2"
                  color={titleColor}
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.6"
                  opacity={0.9}
                  mb={8}
                  color={descriptionColor}
                >
                  {description}
                </Text>
              )}
              <HStack
                gap={4}
                justifyContent={{
                  base: "center",
                  lg: alignContent === "Right" ? "flex-end" : "flex-start",
                }}
                flexWrap="wrap"
              >
                {button1.label && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButtonClick(button1.redirect);
                    }}
                    bg={button1.color}
                    color={button1.textColor}
                    _hover={{ opacity: 0.9 }}
                    size={{ base: "md", md: "lg" }}
                  >
                    {button1.label} <FaArrowRightLong />
                  </Button>
                )}
                {button2.label && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButtonClick(button2.redirect);
                    }}
                    bg={button2.color}
                    color={button2.textColor}
                    _hover={{ opacity: 0.9 }}
                    size={{ base: "md", md: "lg" }}
                  >
                    {button2.label} <FaArrowRightLong />
                  </Button>
                )}
              </HStack>
            </Box>
          </Box>
        </Box>
      );
    }

    // Default fallback (same as Full Image)
    return (
      <Box
        key={index}
        width="100%"
        height="100%"
        position="relative"
        cursor="pointer"
        onClick={() => handleButtonClick(redirectUrl)}
      >
        <Image
          src={imageUrl || "/placeholder.svg?height=600&width=1200"}
          alt={`Banner ${index + 1}`}
          fill
          style={{ 
            objectFit: "cover", 
            objectPosition: "center" 
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </Box>
    );
  });

  return slides;
};