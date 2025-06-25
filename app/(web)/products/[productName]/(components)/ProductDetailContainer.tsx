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
import {
  BenefitsSection,
  SocialFeed,
} from "@/templates/default/pages/home/(components)";
import { TabsDescription } from "./TabsDescription";
import ProductReview from "./ProductReview";
import FrequentlyBoughtProduct from "./FrequentlyBoughtProduct";

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
        gap={{ md: "20px", lg: "40px", xl: "60px" }}
        alignItems="stretch"
        py={{ base: "24px", lg: "32px", "2xl": "56px" }}
      >
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          gap={{ md: "20px", lg: "40px", xl: "60px" }}
          alignItems="stretch"
        >
          <Flex
            flexDirection={{ base: "row", md: "column" }}
            gap={{ md: "20px", lg: "40px", xl: "60px" }}
            alignItems="stretch"
          >
            <ProductImages />
          </Flex>

          <ProductInformation />
        </Flex>

        <TabsDescription />
        <FrequentlyBoughtProduct />
        <ProductReview item_code={product?.item_code ?? ""} />
        {/* <ProductReviews item_code={product?.item_code ?? ""} /> */}
        <ProductsYouMayLike />
        <SocialFeed />
        <BenefitsSection />
      </Flex>
    </Box>
  );
};
