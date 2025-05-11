"use client";

import { useForm } from "react-hook-form";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";

import { FormProvider, ProductCard } from "@/components";
import { popularityFilterOptions, priceRangeFilterOptions } from "@/constants";
import { ProductFilterType } from "@/types";

import { ProductFilters } from "./ProductFilter";

const products = Array.from({ length: 9 }).map((_, index) => ({
  id: index,
  category: "Jeans",
  image: "",
  title: "Blue Jeans",
  description: "Flaunt your jeans in style.",
  price: "10,000",
  originalPrice: "15,000",
  discount: "10%",
}));

export const AllProducts = () => {
  const methods = useForm<ProductFilterType>({
    defaultValues: {
      bestseller: popularityFilterOptions[0].value,
      pricerange: priceRangeFilterOptions[0].value,
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={() => {}}>
      <Box
        maxWidth={"1280px"}
        mx={"auto"}
        gap={{ md: "20px", lg: "40px", xl: "60px" }}
        alignItems={"stretch"}
        py={{ base: "24px", lg: "80px" }}
      >
        <Flex
          justifyContent={{ base: "column", lg: "space-between" }}
          direction={{ base: "column", lg: "row" }}
          mb={{ base: "24px", md: "20px" }}
          gap={{ base: "16px", lg: "0" }}
        >
          <Flex gap={2}>
            <Heading variant={"heading6"}>Sneakers</Heading>

            <Heading variant="heading6" fontWeight={400}>
              (700 products found)
            </Heading>
          </Flex>

          <ProductFilters />
        </Flex>

        <SimpleGrid columns={[1, 2, 3]} gap="20px">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </SimpleGrid>
      </Box>
    </FormProvider>
  );
};
