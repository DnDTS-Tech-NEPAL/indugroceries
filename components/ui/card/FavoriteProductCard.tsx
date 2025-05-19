"use client";

import type React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useConfigQuery, useReviewDataQuery } from "@/hooks/api";
import type { ProductCardProps } from "@/types";
import { ROUTES } from "@/constants";
import { generateNextPath } from "@/utils";
import { VisibleSection } from "../visibleSection";
import { CartIcon } from "@/assets/svg";

export const FavoriteProductCard: React.FC<ProductCardProps> = ({
  category,
  image,
  title,
  description,
  price,
  originalPrice,
  discount,
  isNew,
  isSale,
  item_code,
  link,
}) => {
  const router = useRouter();
  const { data: config } = useConfigQuery();

  const { data: reviewData, isLoading } = useReviewDataQuery(item_code);

  // Responsive values
  const cardPadding = useBreakpointValue({ base: "2", sm: "3", md: "4" });
  const titleSize = useBreakpointValue({ base: "sm", md: "md" });
  const descriptionSize = useBreakpointValue({ base: "xs", sm: "sm" });
  const priceSize = useBreakpointValue({ base: "sm", md: "md" });
  const badgeSize = useBreakpointValue({ base: "xs", sm: "sm" });
  const starSize = useBreakpointValue({ base: "2", sm: "3" });
  const ratingTextSize = useBreakpointValue({ base: "2xs", sm: "xs" });
  const cardGap = useBreakpointValue({ base: "8px", sm: "10px", md: "12px" });

  return (
    <VStack
      alignItems="stretch"
      gap={cardGap}
      overflow="hidden"
      p={cardPadding}
      bg="white"
      borderRadius="md"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "md",
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
      boxShadow="sm"
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
            fontSize={badgeSize}
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
            fontSize={badgeSize}
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
            fontSize={badgeSize}
            ml={isNew || isSale ? 2 : 0}
          >
            {discount}% Off
          </Badge>
        )}
      </Box>

      {/* Product Image */}
      <Box
        position="relative"
        w="full"
        pt="100%"
        bg="gray.100"
        overflow="hidden"
        borderRadius="md"
      >
        <VisibleSection visibility={config?.category_visibility}>
          {category && (
            <Text
              fontSize={badgeSize}
              fontWeight="semibold"
              position="absolute"
              top="8px"
              left="8px"
              zIndex={5}
              border="1px solid"
              borderColor="system.neutral.separator.light"
              borderRadius="full"
              width="fit-content"
              color="system.text.light.light"
              bg="gray.100"
              px="8px"
              py="2px"
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
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </Box>

      {/* Product Info */}
      <VStack align="start" gap="6px" px={1} pb={1}>
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
                  boxSize={starSize}
                />
              ))}
            <Text fontSize={ratingTextSize} color="gray.500" ml={1}>
              {reviewData?.reviews.length} reviews
            </Text>
          </HStack>
        )}

        {/* Title */}
        <Heading
          fontSize={titleSize}
          fontWeight="600"
          color="gray.800"
          lineHeight="short"
        >
          {title}
        </Heading>

        {/* Description */}
        <Box color="gray.500" fontSize={descriptionSize} lineHeight="short">
          {parse(description)}
        </Box>

        {/* Price Section */}
        <HStack
          justify="space-between"
          w="full"
          pt="4px"
          gap={4}
          flexWrap="wrap"
        >
          <HStack gap={2}>
            <VisibleSection visibility={config?.rate_visibility}>
              <Heading fontSize={priceSize} fontWeight="600" color="#FF6996">
                {config?.currency} {price}
              </Heading>
            </VisibleSection>
            {originalPrice && (
              <Text
                fontSize={descriptionSize}
                color="gray.400"
                textDecoration="line-through"
              >
                {config?.currency} {originalPrice}
              </Text>
            )}
          </HStack>

          <Button
            bg="#FF6996"
            color="white"
            border="1px solid"
            borderColor="#FF6996"
            _hover={{ bg: "gray.50", color: "#FF6996" }}
            variant="outline"
            size={{ base: "xs", sm: "sm" }}
            borderRadius="full"
            onClick={(e) => {
              e.stopPropagation();
            }}
            flexShrink={0}
          >
            <Box as="span" display={{ base: "none", sm: "inline" }}>
              Add to Cart
            </Box>
            <Box as="span" display={{ base: "inline", sm: "none" }}>
              Cart
            </Box>
            <CartIcon />
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};
