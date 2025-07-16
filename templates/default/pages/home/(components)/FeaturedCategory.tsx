"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import { Global } from "@emotion/react";
import { CSSProperties } from "react";

import { ROUTES } from "@/constants";
import { toTitleCase } from "@/utils";
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedCategoryImages } from "@/hooks/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Type for Arrow Props
interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

// Custom Arrows
const NextArrow = ({ onClick }: ArrowProps) => (
  <IconButton
    aria-label="Next"
    onClick={onClick}
    position="absolute"
    right="-4rem" // Adjusted for potentially larger card and better visual
    top="50%" // Center vertically
    transform="translateY(-50%)"
    zIndex={2}
    bg="white"
    _hover={{ bg: "whitesmoke" }}
    borderRadius="full"
    boxShadow="md" // Added subtle shadow
    size="lg" // Made buttons slightly larger
  >
    <ChevronRight color="#191919" />
  </IconButton>
);

const PrevArrow = ({ onClick }: ArrowProps) => (
  <IconButton
    aria-label="Prev"
    onClick={onClick}
    position="absolute"
    left="-4rem" // Adjusted for potentially larger card and better visual
    top="50%" // Center vertically
    transform="translateY(-50%)"
    zIndex={2}
    bg="white"
    _hover={{ bg: "whitesmoke" }}
    borderRadius="full"
    boxShadow="md" // Added subtle shadow
    size="lg" // Made buttons slightly larger
  >
    <ChevronLeft color="#191919" />
  </IconButton>
);

// Main Component
export const FeaturedCategory = () => {
  const router = useRouter();
  const featureImages = useFeaturedCategoryImages();
  const { data: featuredCategoryData } = useHomePageQuery();
  const { data: config } = useConfigQuery();

  const slidesToShow = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
  });

  // Calculate card width dynamically for a more square aspect ratio
  // This ensures that the width of the card dictates its height, making it square.
  const cardSize = useBreakpointValue({
    base: "180px", // Increased base size
    sm: "200px", // Increased for sm
    md: "220px", // Increased for md
    lg: "240px", // Significantly increased for a larger look
  });

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!config?.featured_visibility) return null;

  return (
    <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
      <Global
        styles={`
          .slick-slide > div {
            margin: 0 10px; /* Added margin for spacing between cards */
          }
          .slick-list {
            margin: 0 -10px; /* Counteract the margin on slick-slide div for alignment */
            overflow-y: visible; /* Ensure slick-list itself does not hide arrows */
          }
        `}
      />

      {/* Heading Section */}
      <Box mb={8}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} // Chakra's responsive font sizes
          fontWeight="bold"
          mb={2}
        >
          {featuredCategoryData?.featured_category_title ||
            "Shop By Categories"}{" "}
          {/* Fallback title */}
        </Heading>
        <Text fontSize="md" color="gray.600" mb={1}>
          {featuredCategoryData?.fearued_subtitle}

          {/* Fallback subtitle */}
        </Text>
        <Text fontSize="sm" color="gray.500" maxW="lg">
          {featuredCategoryData?.featured_category_description}
        </Text>
      </Box>

      {/* Slider Section */}
      <Box position="relative">
        <Slider {...settings}>
          {featureImages.map((item) => (
            <Flex key={item.name} justifyContent="center">
              <Box
                w={cardSize}
                h={cardSize}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                p={4} // Reduced padding slightly to give more space for content
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  boxShadow: "lg",
                  transform: "translateY(-4px)",
                }}
                onClick={() =>
                  router.push(`${ROUTES.APP.PRODUCTS}?category=${item.name}`)
                }
                overflow="hidden" // Ensure content within the card doesn't overflow
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="space-between" // Distribute space between image and text
                  h="full"
                >
                  <Box w="full" h="80%" position="relative">
                    {" "}
                    {/* Increased image container height */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover", borderRadius: "8px" }} // Changed to 'cover' and added slight border-radius to image
                    />
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    textAlign="center"
                    color="gray.700"
                    mt={2} // Margin top for spacing from image
                  >
                    {toTitleCase(item.name)}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};
