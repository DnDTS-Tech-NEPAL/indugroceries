"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import {
  Box,
  Grid,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import { EmptyStateImage } from "@/assets/image";
import { SeeAll, FavoriteProductCard } from "@/components";
import {
  useItemProductsLikeQuery,
  useProductDetailByNameQuery,
} from "@/hooks/api";

export const ProductsYouMayLike = () => {
  const params = useParams();
  const productName = params.productName as string;

  const { data: productDetail } = useProductDetailByNameQuery(productName);
  const itemCode = productDetail?.item_code;

  const { data: itemProductLike, isLoading } =
    useItemProductsLikeQuery(itemCode);
  return (
    <VStack
      alignItems="stretch"
      gap="32px"
      py={{
        base: "40px",
        lg: "64px",
        "2xl": "120px",
      }}
    >
      <HStack justifyContent="space-between">
        <VStack
          alignItems="start"
          gap={{
            base: "0",
            md: "8px",
          }}
        >
          <Heading
            fontSize={{
              base: "16px",
              lg: "24px",
              xl: "28px",
            }}
          >
            Products you may like
          </Heading>
          <Text
            variant={{
              base: "paragraphSmall",
              md: "paragraphRegular",
            }}
            color="system.text.normal.light"
          >
            Stay ahead of the curve with this season’s must-have pieces
          </Text>
        </VStack>

        <SeeAll href="/products" />
      </HStack>

      {isLoading ? (
        <Grid placeItems="center" height="500px">
          <Spinner />
        </Grid>
      ) : itemProductLike?.length === 0 ? (
        <Box placeItems="center" height="800px" mt={"50px"}>
          <Image
            src={EmptyStateImage}
            alt="Empty State"
            width={304}
            height={272}
          />
        </Box>
      ) : (
        <Grid
          gridTemplateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap="20px"
        >
          {itemProductLike?.map((productInfo, index) => (
            <FavoriteProductCard
              key={index}
              id={index}
              category={productInfo.item_name}
              image={productInfo.custom_image_1_link}
              title={productInfo.name}
              description={productInfo.item_name}
              price={productInfo.prices?.[0].price_list_rate}
            />
          ))}
        </Grid>
      )}
    </VStack>
  );
};
