"use client";

import type React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Icon,
  Badge,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useState } from "react";

import { useConfigQuery, useReviewDataQuery } from "@/hooks/api";
import type { ProductCardProps } from "@/types";
import { ROUTES } from "@/constants";
import { generateNextPath } from "@/utils";
import { useAuthCheck, useProductDetailWishlist } from "@/hooks/app";
import { Cart, HeartIcon } from "@/assets/svg";
import { EyeIcon, X } from "lucide-react";
import { Tooltip } from "@/components/tooltip";

export const ProductCard: React.FC<ProductCardProps> = ({
  item_code,
  image,
  title,
  link,
  price,
  originalPrice,
  isNew,
}) => {
  const router = useRouter();
  const { checkAuth } = useAuthCheck();
  const [isWishlist, setIsWishlist] = useState(false);
  const { data: config } = useConfigQuery();
  const { data: reviewData } = useReviewDataQuery(item_code);
  const { handleAddToWishlist } = useProductDetailWishlist();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onAddToWishlist = () => {
    const payload = {
      item_code: item_code,
      quantity: 1,
    };
    setIsWishlist(true);
    handleAddToWishlist(payload);
  };

  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  // Responsive values
  const fontSize = useBreakpointValue({ base: "xs", md: "sm", lg: "md" });
  const priceFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const originalPriceFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const iconSize = useBreakpointValue({ base: 14, md: 16 });
  const starIconSize = useBreakpointValue({ base: 2, md: 3 });
  const imageHeight = useBreakpointValue({
    base: "320px",
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
      cursor="pointer"
      onClick={() =>
        router.push(
          generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
            productName: link,
          })
        )
      }
      _hover={{
        "& .action-buttons": {
          opacity: 1,
          transform: "translateY(-5px)",
        },
      }}
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
        <HStack
          className="action-buttons"
          opacity={0}
          position="absolute"
          top="50%"
          right="30%"
          transform="translate(-50%, -50%)"
          gap={"0"}
          borderRadius={"md"}
          display={{ base: "none", sm: "flex" }}
          zIndex={2}
          alignItems={"end"}
          transition="all 0.2s ease"
        >
          <Box onMouseEnter={(e) => e.stopPropagation()}>
            <Tooltip
              showArrow
              content="Add to wishlist"
              positioning={{ placement: "top" }}
              contentProps={{ css: { "--tooltip-bg": "#FF6996" } }}
            >
              <Button
                height="auto"
                minH="30px"
                bg="white"
                overflow="hidden"
                color="#FF6996"
                border="2px solid #FF6996"
                borderTopLeftRadius="sm"
                borderBottomLeftRadius="sm"
                fontSize="14px"
                fontWeight={"400"}
                px={3}
                py={0}
                lineHeight="17px"
                onClick={(e) => {
                  e.stopPropagation();
                  checkAuth(onAddToWishlist)();
                }}
              >
                {isWishlist ? (
                  <FaHeart size={iconSize} />
                ) : (
                  <HeartIcon color="#FF6996" />
                )}
              </Button>
            </Tooltip>
          </Box>

          <Box onMouseEnter={(e) => e.stopPropagation()}>
            <Tooltip
              showArrow
              content="Quick View"
              positioning={{ placement: "top" }}
              contentProps={{ css: { "--tooltip-bg": "#FF6996" } }}
            >
              <Button
                height="auto"
                minH="30px"
                bg="white"
                overflow="hidden"
                color="#FF6996"
                border="2px solid #FF6996"
                borderTopRightRadius="sm"
                borderBottomRightRadius="sm"
                fontSize="14px"
                fontWeight={"400"}
                px={3}
                py={0}
                lineHeight="1.2"
                onClick={handleFullScreen}
              >
                <EyeIcon size={iconSize} />
              </Button>
            </Tooltip>
          </Box>
        </HStack>

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
      <Text
        fontWeight="semibold"
        color="gray.800"
        lineHeight="1.2"
        minH={"50px"}
      >
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
          minH="23px"
          bg="#FF6996"
          color="white"
          borderRadius="full"
          fontSize="14px"
          fontWeight={"400"}
          px={3}
          py={0}
          lineHeight="1.2"
        >
          Add to Cart <Cart />
        </Button>
      </Stack>
      {/* Full Screen Modal */}
      {isFullScreen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.9)"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={closeFullScreen}
        >
          <Box
            position="relative"
            bg={"gray.300"}
            maxW="80dvw"
            maxH="80dvh"
            borderRadius="1rem"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={image || config?.company_details_url}
              alt={title}
              width={800}
              height={600}
              style={{
                scale: "1.1",
                objectFit: "contain",
                maxWidth: "80dvw",
                maxHeight: "80dvh",
              }}
            />
            <Button
              position="absolute"
              top={0}
              right={0}
              bg="transparent"
              color="red"
              borderRadius="full"
              size="2xl"
              onClick={closeFullScreen}
            >
              <X color="red" />
            </Button>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
