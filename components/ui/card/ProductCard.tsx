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
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

import { useConfigQuery, useReviewDataQuery } from "@/hooks/api";
import type { ProductCardProps } from "@/types";
import { ROUTES } from "@/constants";
import { generateNextPath } from "@/utils";
import { VisibleSection } from "../visibleSection";

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
  isSale,
}) => {
  const router = useRouter();
  const [isWishlist, setIsWishlist] = useState(false);
  const { data: config } = useConfigQuery();
  const { data: reviewData, isLoading } = useReviewDataQuery(item_code);

  return (
    <VStack
      alignItems="stretch"
      gap={{ base: "10px", md: "12px", lg: "14px" }}
      overflow="hidden"
      my={{ base: "8px", md: "10px", lg: "12px" }}
      bg="white"
      borderRadius="md"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
      }}
      cursor="pointer"
      position="relative"
      onClick={() =>
        router.push(
          generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
            productName: link,
          })
        )
      }
    >
      {/* Status badges */}
      <Box position="absolute" top="10px" left="10px" zIndex="10">
        {isNew && (
          <Badge
            bg="#FF6996"
            color="white"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
          >
            New
          </Badge>
        )}
        {isSale && (
          <Badge
            bg="#FF6996"
            color="white"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            ml={isNew ? 2 : 0}
          >
            Sale
          </Badge>
        )}
        {Number(discount) > 0 && (
          <Badge
            bg="#FF6996"
            color="white"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            ml={isNew || isSale ? 2 : 0}
          >
            {discount}% Discount
          </Badge>
        )}
      </Box>

      {/* Wishlist button */}
      <Box
        position="absolute"
        top="10px"
        right="10px"
        zIndex="10"
        cursor="pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlist(!isWishlist);
        }}
      >
        <Flex
          align="center"
          justify="center"
          bg="white"
          w="30px"
          h="30px"
          borderRadius="full"
          boxShadow="sm"
        >
          <Icon
            as={isWishlist ? FaHeart : FaRegHeart}
            color={isWishlist ? "#FF6996" : "gray.400"}
            boxSize={4}
          />
        </Flex>
      </Box>

      {/* Product Image */}
      <Box
        position="relative"
        w="full"
        pt="100%"
        bg="gray.100"
        overflow="hidden"
      >
        <VisibleSection visibility={config?.category_visibility}>
          {category && (
            <Text
              fontSize={{ base: "xs", md: "xs" }}
              fontWeight="semibold"
              position={"absolute"}
              top={"0"}
              left={"0"}
              zIndex={5}
              border="1px solid"
              borderColor="system.neutral.separator.light"
              borderRadius="full"
              width="fit-content"
              color="system.text.light.light"
              bg="gray.100"
              px="10px"
              py="4px"
            >
              {category}
            </Text>
          )}
        </VisibleSection>
        <Image
          src={image || config?.company_details_url}
          alt={title}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Quick view and add to cart buttons */}
        <Flex
          position="absolute"
          bottom="10px"
          left="10px"
          right="10px"
          justifyContent="space-between"
          opacity="0"
          transition="opacity 0.3s"
          _groupHover={{ opacity: 1 }}
          zIndex={5}
        >
          <Badge
            bg="white"
            color="gray.700"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle full view action
            }}
          >
            Full View
          </Badge>

          <Badge
            bg="#FF6996"
            color="white"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            cursor="pointer"
            _hover={{ bg: "#ff5286" }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to cart action
            }}
          >
            Add to cart
          </Badge>
        </Flex>
      </Box>

      {/* Product Info */}
      <VStack align="start" gap="8px" px={2} pb={2}>
        {/* Rating */}
        {reviewData && !isLoading && (
          <HStack>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  key={i}
                  as={FaStar}
                  color={
                    i < Math.ceil(reviewData?.average_rating ?? 0)
                      ? "#FF6996"
                      : "gray.200"
                  }
                  boxSize={3}
                />
              ))}
            <Text fontSize="xs" color="gray.500" ml={1}>
              {reviewData?.reviews.length} reviews
            </Text>
          </HStack>
        )}

        {/* Title */}
        <Heading
          fontSize={{ base: "16px", md: "16px", lg: "18px" }}
          fontWeight="600"
          color="gray.800"
          minH={{ base: "40", md: "50px" }}
          lineClamp={2}
        >
          {title}
        </Heading>

        {/* Description */}
        {/* <Box
          color="gray.500"
          lineClamp={2}
          fontSize={{ base: "sm", md: "sm" }}
          minHeight={"40px"}
        >
          {parse(description)}
        </Box> */}

        {/* Price Section */}
        <HStack justify="flex-start" w="full" pt="4px" gap={2}>
          <VisibleSection visibility={config?.rate_visibility}>
            <Heading
              fontSize={{ base: "md", md: "md" }}
              fontWeight="600"
              color="#FF6996"
            >
              {config?.currency} {price}
            </Heading>
          </VisibleSection>
          {originalPrice && (
            <Text fontSize="sm" color="gray.400" textDecoration="line-through">
              {config?.currency} {originalPrice}
            </Text>
          )}
        </HStack>

        {/* CTA */}
        {hasAddToCart && (
          <Button
            marginTop="8px"
            width="full"
            bg="#FF6996"
            color="white"
            _hover={{ bg: "#ff5286" }}
            variant="solid"
            size="sm"
            borderRadius="full"
          >
            Add to Cart
          </Button>
        )}
      </VStack>
    </VStack>
  );
};
