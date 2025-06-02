"use client";

import type React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
  Flex,
  Badge,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import { BsCart } from "react-icons/bs";
import { useState } from "react";

import { useConfigQuery, useReviewDataQuery } from "@/hooks/api";
import type { ProductCardProps } from "@/types";
import { ROUTES } from "@/constants";
import { generateNextPath } from "@/utils";
import { VisibleSection } from "../visibleSection";
import { useAuthCheck, useProductDetailWishlist } from "@/hooks/app";

export const ProductCard: React.FC<ProductCardProps> = ({
  category,
  item_code,
  image,
  title,
  link,
  // description,
  price,
  originalPrice,
  discount,
  hasAddToCart,
  isNew,
}) => {
  const router = useRouter();
  const { checkAuth } = useAuthCheck();
  const [isWishlist, setIsWishlist] = useState(false);
  const { data: config } = useConfigQuery();
  const { data: reviewData, isLoading } = useReviewDataQuery(item_code);
  const { handleAddToWishlist } = useProductDetailWishlist();

  const onAddToWishlist = () => {
    const payload = {
      item_code: item_code,
      quantity: 1,
    };
    setIsWishlist(true);
    handleAddToWishlist(payload);
  };

  // Responsive values
  const fontSize = useBreakpointValue({ base: "xs", md: "sm", lg: "md" });
  const priceFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const originalPriceFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const iconSize = useBreakpointValue({ base: 3, md: 8 });
  const starIconSize = useBreakpointValue({ base: 2, md: 3 });
  const imageHeight = useBreakpointValue({
    sm: "260px",
    md: "280px",
    lg: "308px",
  });

  return (
    <VStack
      align="stretch"
      my={4}
      gap={{ base: 3, md: 5 }}
      w="full"
      position="relative"
      cursor={"pointer"}
      onClick={() =>
        router.push(
          generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
            productName: link,
          })
        )
      }
    >
      <Box position="relative">
        {/* New Badge */}
        {isNew && (
          <Badge
            position="absolute"
            top="10px"
            left="10px"
            bg="#FF6996"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize={{ base: "xs", md: "sm" }}
            zIndex={2}
          >
            New
          </Badge>
        )}

        {/* Action Buttons */}
        <VStack
          position="absolute"
          top="10px"
          right="10px"
          gap={2}
          display={{ base: "none", sm: "flex" }}
          zIndex={2}
          alignItems={"end"}
        >
          <Button
            height="auto"
            minH="32px"
            bg="#FF6996"
            color="white"
            borderRadius="full"
            fontSize="14px"
            px={3}
            py={0}
            lineHeight="1.2"
            onClick={checkAuth(onAddToWishlist)}
          >
            Wish List <FaRegHeart size={iconSize} />
          </Button>
          <Button
            height="auto"
            minH="32px"
            bg="#FF6996"
            color="white"
            borderRadius="full"
            fontSize="14px"
            px={3}
            py={0}
            lineHeight="1.2"
          >
            Full View <MdFullscreen size={iconSize} />
          </Button>
        </VStack>

        {/* Product Image */}
        <Box
          position="relative"
          width="100%"
          height={imageHeight}
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            src={image || config?.company_details_url}
            alt={title}
            fill
            style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Box>
      </Box>

      {/* Rating */}
      <HStack gap={1}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Icon
              key={i}
              as={FaStar}
              color={
                i < Math.ceil(reviewData?.average_rating ?? 0)
                  ? "#FF6996"
                  : "gray.300"
              }
              boxSize={starIconSize}
            />
          ))}
        <Text fontSize={fontSize} color="gray.600" ml={3}>
          {reviewData?.reviews?.length ?? 0} reviews
        </Text>
      </HStack>

      {/* Title */}
      <Text  fontWeight="semibold" color="gray.800" lineHeight="1.2" minH={"50px"}>
          {title}
      </Text>

      {/* Description */}
      {/* <Box color="gray.500" fontSize={descriptionSize} lineHeight="short">
        {parse(description)}
        {name}
        color="gray.800"
      lineClamp="1"
      >
        {title}
      </Text>

      {/* Price and Add to Cart */}
      <Stack
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align="center"
        gap={{ base: 3, sm: 2 }}
      >
        <HStack gap={2} align="baseline">
          <Text fontSize={priceFontSize} fontWeight="bold" color="#FF6996">
            {config?.currency} {price}
          </Text>
          {originalPrice && (
            <Text
              fontSize={originalPriceFontSize}
              color="gray.400"
              textDecoration="line-through"
            >
              {config?.currency} {originalPrice}
            </Text>
          )}
        </HStack>

        <Button
          height="auto"
          minH="32px"
          bg="#FF6996"
          color="white"
          borderRadius="full"
          fontSize="14px"
          px={3}
          py={0}
          lineHeight="1.2"
        >
          Add to Cart <BsCart size={iconSize} />
        </Button>
      </Stack>
    </VStack>
  );
};
