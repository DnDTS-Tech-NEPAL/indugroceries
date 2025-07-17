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
  Flex,
} from "@chakra-ui/react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useState } from "react";

import { useConfigQuery, useReviewDataQuery } from "@/hooks/api";
import type { ProductCardProps } from "@/types";
import { ROUTES } from "@/constants";
import { generateNextPath } from "@/utils";
import { useAuthCheck, useProductDetailWishlist } from "@/hooks/app";
import { HeartIcon } from "@/assets/svg";
import { EyeIcon, X } from "lucide-react";
import { Tooltip } from "@/components/tooltip";
// import { addRecentlyViewedProduct } from "@/api";

export const ProductCard: React.FC<ProductCardProps> = ({
  item_code,
  image,
  title,
  link,
  price,
  originalPrice,
  isNew,
  min_price,
  max_price,
  stock_qty,
  discount,
}) => {
  const router = useRouter();
  const { checkAuth } = useAuthCheck();
  const [isWishlist, setIsWishlist] = useState(false);
  const { data: config } = useConfigQuery();
  const guestId = localStorage.getItem("guest_id");
  const { data: reviewData } = useReviewDataQuery(item_code);
  const { handleAddToWishlist } = useProductDetailWishlist();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const onAddToWishlist = () => {
    const payload = {
      item_code: item_code,
      quantity: 1,
      guid: guestId,
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
      border={"1px solid #dbdbdb"}
      borderRadius={"lg"}
      gap={{ base: 3, md: 5 }}
      w="full"
      position="relative"
      _hover={{
        "& .action-buttons": {
          opacity: 1,
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box position="relative">
        {/* New Badge */}
        {isNew || (stock_qty ?? 0) <= 0 || Number(discount ?? 0) > 0 ? (
          <Badge
            position="absolute"
            top="10px"
            left="10px"
            display="flex"
            color="primary"
            zIndex={2}
            borderRadius={"2rem"}
            px="3"
            py="1"
            fontSize="14px"
            textAlign={"center"}
            minH={0}
            height={"fit-content"}
            minW={0}
            bg={"primary.100"}
            width="fit-content"
          >
            {isNew
              ? "New"
              : (stock_qty && stock_qty) <= 0
                ? "Out of Stock"
                : Number(discount ?? 0) > 0
                  ? `${discount}% Discount`
                  : null}
            {/* */}
          </Badge>
        ) : null}

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
              contentProps={{ css: { "--tooltip-bg": "primary" } }}
            >
              <Button
                height="auto"
                minH="30px"
                bg="white"
                overflow="hidden"
                color="primary.700"
                border="2px solid primary"
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
                  <HeartIcon color="primary" />
                )}
              </Button>
            </Tooltip>
          </Box>

          <Box onMouseEnter={(e) => e.stopPropagation()}>
            <Tooltip
              showArrow
              content="Quick View"
              positioning={{ placement: "top" }}
              contentProps={{ css: { "--tooltip-bg": "primary" } }}
            >
              <Button
                height="auto"
                minH="30px"
                bg="white"
                overflow="hidden"
                color="primary.700"
                border="2px solid primary"
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
            alt={title || "Product Image"}
            fill
            style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Box>
      </Box>
      <Flex
        justifyContent={"space-between"}
        flexDirection={"column"}
        gap={2}
        height="100%"
      >
        <Box>
          {/* Rating */}
          <HStack gap={1} px={3} pt={2}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  key={i}
                  as={FaStar}
                  color={
                    i < Math.ceil(reviewData?.average_rating ?? 0)
                      ? "primary"
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
            cursor="pointer"
            _hover={{ color: "primary.400" }}
            onClick={() => {
              router.push(
                generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
                  productName: link,
                })
              );
            }}
            fontWeight="semibold"
            color="gray.800"
            lineHeight="1.2"
            px={3}
            // lineClamp={{ sm: 2, md: 2 }}
          >
            {title}
          </Text>
        </Box>
        {/* Price and Add to Cart */}
        <Stack
          direction={{ base: "row", sm: "row" }}
          justify="space-between"
          align="center"
          px={3}
          pb={4}
          gap={{ base: 3, sm: 2 }}
        >
          <Box
            gap={2}
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
          >
            {!min_price && !max_price ? (
              <>
                <VStack gap={0}>
                  <Text
                    fontSize={priceFontSize}
                    color="primary"
                    lineHeight="1.2"
                  >
                    {config?.currency} {price}
                  </Text>
                  {originalPrice && originalPrice !== price && (
                    <Text
                      fontSize={originalPriceFontSize}
                      color="gray.400"
                      textDecoration="line-through"
                    >
                      {config?.currency} {originalPrice}
                    </Text>
                  )}
                </VStack>
              </>
            ) : (
              <Text fontSize={priceFontSize} color="primary" lineHeight="1.2">
                {config?.currency} {min_price} - {max_price}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>
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
