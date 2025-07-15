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
import { useConfigQuery, useHomePageQuery } from "@/hooks/api";
import { useFeaturedCategoryImages } from "@/hooks/app";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ROUTES } from "@/constants";
import { toTitleCase } from "@/utils";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Custom Arrow Components
const NextArrow = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Next"
    onClick={onClick}
    position="absolute"
    right="-3rem"
    bottom="16%"
    transform="translateY(-50%)"
    zIndex={2}
    bg="white"
    _hover={{ bg: "whitesmoke" }}
    borderRadius="full"
  >
    <ChevronRight color="#191919" />
  </IconButton>
);

const PrevArrow = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Prev"
    onClick={onClick}
    position="absolute"
    left="-3rem"
    bottom="16%"
    transform="translateY(-50%)"
    zIndex={2}
    bg="white"
    _hover={{ bg: "whitesmoke" }}
    borderRadius="full"
  >
    <ChevronLeft color="#191919" />
  </IconButton>
);

export const FeaturedCategory = () => {
  const slidesToShow = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 3,
    lg: 4,
    xl: 4,
  });

  const settings = {
    // dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    // appendDots: (dots: ReactNode) => (
    //   <Box mt={8}>
    //     <ul style={{ position: "absolute", bottom: "-8%", left: "2%" }}>
    //       {dots}
    //     </ul>
    //   </Box>
    // ),
    // dotsClass: "slick-dots slick-thumb",
  };
  const router = useRouter();
  const featureImages = useFeaturedCategoryImages();
  const { data: featuredCategoryData } = useHomePageQuery();
  const { data: config } = useConfigQuery();

  const cardWidth = useBreakpointValue({ base: "45%", md: "30%", lg: "100%" });

  if (!config?.featured_visibility) return null;

  return (
    <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
      {/* Heading and Description */}
      <Box mb={8} maxW="100%">
        <Heading
          fontSize={{ base: "20px", md: "28px", lg: "40px" }}
          fontWeight="bold"
          lineHeight="short"
          mb={2}
          whiteSpace="pre-line"
        >
          {featuredCategoryData?.featured_category_title}
        </Heading>
        <Text fontSize="md" color="gray.600" mb={2}>
          {featuredCategoryData?.fearued_subtitle}
        </Text>
        <Text fontSize="sm" color="gray.500" maxW="lg">
          {featuredCategoryData?.featured_category_description}
        </Text>
      </Box>

      {/* Featured Categories as Cards */}
      {/* <Flex flexWrap="wrap" gap={6} justify="flex-start"> */}
      <Slider {...settings} width="100%">
        {featureImages.map((item) => (
          <Box key={item.name} px={4}>
            <Box
              w={cardWidth}
              h="130px"
              minW="140px"
              bg="white"
              borderRadius="xl"
              boxShadow="md"
              p={4}
              transition="all 0.2s"
              cursor="pointer"
              _hover={{
                boxShadow: "lg",
                transform: "translateY(-4px)",
              }}
              onClick={() =>
                router.push(`${ROUTES.APP.PRODUCTS}?category=${item.name}`)
              }
            >
              <Flex direction="column" align="center" h="120px">
                <Box
                  w="full"
                  h="80px"
                  overflow="hidden"
                  mb={3}
                  position="relative"
                  _hover={{
                    "& img": {
                      filter:
                        "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                    },
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{
                      objectFit: "contain",
                      transition: "filter 0.3s ease",
                    }}
                  />
                </Box>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  textAlign="center"
                  color="gray.700"
                >
                  {toTitleCase(item.name)}
                </Text>
              </Flex>
            </Box>
          </Box>
        ))}
      </Slider>
      {/* </Flex> */}
    </Box>
  );
};
