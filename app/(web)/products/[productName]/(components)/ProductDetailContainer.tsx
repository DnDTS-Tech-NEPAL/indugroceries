"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { useProductDetailByNameQuery } from "@/hooks/api";
import { ProductDetailContainerProps } from "@/types";
import { useVariantStore } from "@/store";

import { ProductImages } from "./ProductImages";
import { ProductInformation } from "./ProductInformation";
import { ProductsYouMayLike } from "./ProductsYouMayLike";
import { BenefitsSection } from "@/templates/default/pages/home/(components)";
// import RecentlyViewed from "./RecentlyViewed ";

export const ProductDetailContainer = ({
  product,
}: ProductDetailContainerProps) => {
  const params = useParams();
  const productName = params.productName as string;

  // set initial data fetched from server side to the client to that specific product
  useProductDetailByNameQuery(productName, product);

  const { updateVariant } = useVariantStore();

  // reset variant to default when component unmounts
  useEffect(() => {
    return () => updateVariant("");
  }, []);

  return (
    <Box
      px={{
        base: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
      }}
    >
      <Flex
        flexDirection="column"
        maxWidth="1280px"
        mx="auto"
        gap={{ md: "10px", lg: "20px", xl: "30px" }}
        alignItems="stretch"
        py={{ base: "24px", lg: "32px", "2xl": "56px" }}
      >
        <Flex
          width={"100%"}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ md: "6px", lg: "6px", xl: "12px" }}
          alignItems="stretch"
        >
          <ProductImages />
          <ProductInformation />
        </Flex>
        <ProductsYouMayLike />

        <BenefitsSection />
      </Flex>
    </Box>
  );
};
