"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { HeartIcon } from "@/assets/svg";
import { ROUTES } from "@/constants";
import { useConfigQuery } from "@/hooks/api";
import { ProductCardProps } from "@/types";
import { generateNextPath } from "@/utils";
import { VisibleSection } from "../visibleSection";

export const FavoriteProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
  originalPrice,
  discount,
}) => {
  const router = useRouter();

  const { data: config } = useConfigQuery();

  return (
    // <VStack gap="17px" overflow="hidden">
    //   <VStack
    //     alignItems="stretch"
    //     gap={{
    //       base: "24px",
    //       lg: "32px",
    //     }}
    //     padding={{
    //       base: "16px",
    //       md: "20px",
    //       lg: "24px",
    //     }}
    //     bg="grey.200"
    //     cursor="pointer"
    //     width="100%"
    //     onClick={() =>
    //       router.push(
    //         generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
    //           productName: title,
    //         })
    //       )
    //     }
    //   >
    //     <HStack justifyContent="flex-end">
    //       <HeartIcon />
    //     </HStack>

    //     <Box
    //       py={{
    //         base: "16px",
    //         lg: "34px",
    //       }}
    //     >
    //       <Box position="relative" mx="auto" boxSize="180px">
    //         <Image src={image as string} alt={title} fill />
    //       </Box>
    //     </Box>
    //   </VStack>
    //   <VStack
    //     align="start"
    //     gap={{
    //       base: 0,
    //       lg: "4px",
    //     }}
    //     width="100%"
    //   >
    //     <Heading
    //       variant="heading6"
    //       display="none"
    //       fontSize={{
    //         base: "16px",
    //         lg: "18px",
    //       }}
    //     >
    //       {title}
    //     </Heading>
    //     <Text
    //       variant="paragraphSmall"
    //       fontWeight={"bold"}
    //       fontSize={{ base: "11px", md: "lg" }}
    //       color="system.text.light.light"
    //     >
    //       {description}
    //     </Text>

    //     <HStack gap="0" paddingTop="16px">
    //       <Heading variant="heading6" fontWeight="400">
    //         {config.currency} {price}
    //       </Heading>

    //       {originalPrice && (
    //         <Text
    //           variant="subtitle1"
    //           color="danger.100"
    //           paddingLeft="12px"
    //           paddingRight="8px"
    //           textDecoration="line-through"
    //         >
    //           {config.currency}
    //           {originalPrice}
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
    //           -{discount}
    //         </Text>
    //       )}
    //     </HStack>
    //   </VStack>
    // </VStack>
    <VStack
      gap="12px"
      overflow="hidden"
      bg="gray.200"
      borderRadius="xl"
      boxShadow="sm"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-4px)",
      }}
      cursor="pointer"
      onClick={() =>
        router.push(
          generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
            productName: title,
          })
        )
      }
      w="full"
    >
      {/* Image with 1:1 ratio */}
      <Box
        position="relative"
        w="full"
        pt="100%" // 1:1 ratio using padding trick
        bg="gray.100"
        borderTopRadius="xl"
        overflow="hidden"
      >
        {/* Favorite Icon */}
        <HStack position="absolute" top="12px" right="12px" zIndex="2">
          <HeartIcon />
        </HStack>

        <Box position="absolute" top="0" left="0" w="full" h="full">
          <Image
            src={(image as string) || config.company_details_url}
            alt={title}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </Box>
      </Box>

      {/* Product Info */}
      <VStack
        align="start"
        gap={{ base: "8px", md: "10px" }}
        w="full"
        px={{ base: "12px", md: "16px" }}
        pb="16px"
        pt="4px"
      >
        <Heading
          variant="heading6"
          display="none"
          fontSize={{ base: "md", md: "lg" }}
          color="gray.800"
          fontWeight="semibold"
        >
          {title}
        </Heading>

        <Text
          variant="paragraphSmall"
          fontWeight={"bold"}
          fontSize={{ base: "sm", md: "md" }}
          color="system.text.light.light"
        >
          {description}
        </Text>

        <HStack pt="2">
          <VisibleSection visibility={config?.rate_visibility}>
            <Heading
              variant="heading6"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="400"
              color="brand.600"
            >
              {config.currency} {price}
            </Heading>
          </VisibleSection>

          {originalPrice && (
            <Text
              variant={"subtitle1"}
              fontSize="sm"
              color="danger.100"
              textDecoration="line-through"
              ml="2"
            >
              {config.currency}
              {originalPrice}
            </Text>
          )}

          {Number(discount) > 0 && (
            <Text
              variant={"subtitle2"}
              fontSize="xs"
              color="system.text.light.light"
              background="gray.400"
              px="2"
              py="1"
              borderRadius="md"
              fontWeight="semibold"
              ml="2"
            >
              -{discount}
            </Text>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};
