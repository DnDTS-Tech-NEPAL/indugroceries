"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { useConfigQuery } from "@/hooks/api";
import { ProductCardProps } from "@/types";
import { ROUTES } from "@/constants";
import { generateNextPath } from "@/utils";
import { VisibleSection } from "../visibleSection";

export const ProductCard: React.FC<ProductCardProps> = ({
  category,
  image,
  title,
  description,
  price,
  originalPrice,
  discount,
  hasAddToCart,
}) => {
  const router = useRouter();

  const { data: config } = useConfigQuery();

  return (
    // <VStack
    //   alignItems="stretch"
    //   gap={{
    //     base: "10px",
    //     md: "12px",
    //     lg: "14px",
    //   }}
    //   overflow="hidden"
    //   padding={{
    //     base: "16px",
    //     md: "18px",
    //     lg: "20px",
    //   }}
    //   bg="grey.200"
    //   border={"1px solid"}
    //   borderRadius="1rem"
    //   borderColor="system.neutral.separator.light"
    //   cursor="pointer"
    //   onClick={() =>
    //     router.push(
    //       generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
    //         productName: title,
    //       })
    //     )
    //   }
    // >
    //   <Text
    //     variant="subtitle2"
    //     border="1px solid"
    //     borderColor="system.neutral.separator.light"
    //     borderRadius="8px"
    //     width="fit-content"
    //     color="system.text.light.light"
    //     bg="white"
    //     p={category ? "8px" : "16px"}
    //   >
    //     {category}
    //   </Text>

    //   <Box
    //     py={{
    //       lg: "5px",
    //     }}
    //   >
    //     <Box position="relative" mx="auto" boxSize="180px">
    //       <Image src={image || config.company_details_url} alt={title} fill />
    //     </Box>
    //   </Box>

    //   <VStack
    //     align="start"
    //     gap={{
    //       base: 0,
    //       md: "1px",
    //       lg: "4px",
    //     }}
    //   >
    //     <Heading
    //       lineClamp={"1"}
    //       variant="heading6"
    //       display="none"
    //       fontSize={{
    //         base: "14px",
    //         lg: "16px",
    //       }}
    //     >
    //       {title}
    //     </Heading>
    //     <Box
    //       lineClamp={"2"}
    //       fontWeight={"bold"}
    //       fontSize={{ base: "11px", md: "lg" }}
    //       color="system.text.light.light"
    //       minHeight={"40px"}
    //     >
    //       {parse(description)}
    //     </Box>

    //     <HStack paddingTop="12px">
    //       <Heading
    //         variant="heading6"
    //         fontWeight="400"
    //         fontSize={{ base: "15px", md: "17px" }}
    //       >
    //         {config.currency} {price}
    //       </Heading>

    //       {originalPrice && (
    //         <Text
    //           variant="subtitle1"
    //           color="danger.100"
    //           paddingLeft="4px"
    //           textDecoration="line-through"
    //         >
    //           {config.currency} {originalPrice}
    //         </Text>
    //       )}

    //       {Number(discount) > 0 && (
    //         <Text
    //           variant="subtitle2"
    //           border="1px solid"
    //           borderColor="system.neutral.separator.light"
    //           borderRadius="8px"
    //           padding="6px 10px"
    //           color="system.text.light.light"
    //           background="grey.400"
    //         >
    //           -{discount}%
    //         </Text>
    //       )}
    //     </HStack>

    //     {hasAddToCart && (
    //       <Button marginTop="12px" width="full">
    //         Add to Cart
    //       </Button>
    //     )}
    //   </VStack>
    // </VStack>
    <VStack
      alignItems="stretch"
      gap={{ base: "10px", md: "12px", lg: "14px" }}
      overflow="hidden"
      my={{ base: "16px", md: "18px", lg: "18px" }}
      padding={{ base: "16px", md: "18px", lg: "20px" }}
      bg="white"
      borderRadius="1rem"
      border="1px solid"
      borderColor="system.neutral.separator.light"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-4px)",
        bg: "gray.50",
      }}
      cursor="pointer"
      onClick={() =>
        router.push(
          generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
            productName: title,
          })
        )
      }
    >
      {/* Product Image */}
      <Box
        position="relative"
        w="full"
        pt="100%" // 1:1 ratio using padding trick
        bg="gray.100"
        overflow="hidden"
      >
        {/* Category Tag */}
        <VisibleSection visibility={config.category_visibility}>
          {category && (
            <Text
              fontSize={{ base: "xs", md: "xs" }}
              fontWeight="semibold"
              position={"absolute"}
              top={"0"}
              left={"0"}
              zIndex={20}
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
          src={image || config.company_details_url}
          alt={title}
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
      {/* Product Info */}
      <VStack align="start" gap="8px">
        {/* Title */}
        <Heading
          variant="heading6"
          display="none"
          fontSize={{ base: "16px", md: "16px", lg: "18px" }}
          fontWeight="600"
          color="gray.800"
        >
          {title}
        </Heading>
        {/* Description */}
        <Box
          // variant="paragraphSmall"
          color="system.text.light.light"
          lineClamp={"2"}
          fontWeight={"bold"}
          fontSize={{ base: "sm", md: "md" }}
          minHeight={"45px"}
        >
          {parse(description)}
        </Box>
        {/* Price Section */}
        <HStack justify="space-between" w="full" pt="8px">
          <VisibleSection visibility={config?.rate_visibility}>
            <Heading
              variant={{ base: "heading6", md: "heading7" }}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="400"
              color="brand.700"
            >
              {config.currency} {price}
            </Heading>
          </VisibleSection>
          {originalPrice && (
            <Text fontSize="sm" color="gray.400" textDecoration="line-through">
              {config.currency} {originalPrice}
            </Text>
          )}
          {Number(discount) > 0 && (
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="red.500"
              bg="red.50"
              borderRadius="full"
              px="10px"
              py="2px"
            >
              -{discount}%
            </Text>
          )}
        </HStack>
        {/* CTA */}
        {hasAddToCart && (
          <Button
            marginTop="8px"
            width="full"
            colorScheme="teal"
            variant="solid"
            size="sm"
            borderRadius="md"
          >
            Add to Cart
          </Button>
        )}
      </VStack>
    </VStack>
  );
};
