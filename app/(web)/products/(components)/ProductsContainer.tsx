"use client";

import { useForm } from "react-hook-form";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import { FormProvider } from "@/components";
import { popularityFilterOptions, priceRangeFilterOptions } from "@/constants";
import { useProductsFilter, useProductSlider } from "@/hooks/app";
import { ProductFilterType, ProductSectionProps } from "@/types";

import { AllProducts } from "./AllProducts";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FilterAccordion } from "./FilterAccordion";
import { ProductFilters } from "./ProductFilters";
import { AppliedFilters } from "@/components/ui/filter";

export const ProductsContainer = ({ type }: ProductSectionProps) => {
  const methods = useForm<ProductFilterType>({
    defaultValues: {
      bestseller: popularityFilterOptions[0].value,
      pricerange: priceRangeFilterOptions[0].value,
      item_group: [],
    },
  });
  const submitHandler = () => {};
  const { sectionData } = useProductSlider(type);
  const { title, subtitle } = sectionData;

  const filters = useProductsFilter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const BrandFromQuery = searchParams.get("brands");
  const { setValue, trigger } = methods;
  useEffect(() => {
    if (selectedCategory) {
      setValue("item_group", [selectedCategory]);
      trigger();
    }
    if (BrandFromQuery) {
      setValue("brand", [BrandFromQuery]);
      trigger();
    }
  }, [selectedCategory, BrandFromQuery, setValue, trigger]);

  return (
    <FormProvider methods={methods} onSubmit={submitHandler}>
      <Box maxW={"6xl"} mx={"auto"} px={{ base: 4, md: 6 }}>
        <Flex
          justifyContent={"space-between"}
          mt={{ base: 4, md: 8 }}
          flexDirection={{ base: "column", sm: "row" }}
          gap={{ base: 4, md: 0 }}
          alignItems={{ base: "flex-start", sm: "center" }}
        >
          <VStack align={"flex-start"} gap={2}>
            <Heading
              as={"h2"}
              fontSize={{
                base: "20px",
                sm: "22px",
                md: "24px",
                lg: "28px",
              }}
              fontWeight="400"
              color="gray.800"
            >
              {title}
            </Heading>

            <Text
              as={"span"}
              fontSize={{ base: "sm", md: "md" }}
              color="gray.500"
            >
              {subtitle}
            </Text>
          </VStack>
          <ProductFilters />
        </Flex>
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          maxWidth={"1280px"}
          mx={"auto"}
          gap={{ base: 4, md: 6, lg: 8, xl: 12 }}
          alignItems={"flex-start"}
          py={{ base: 4, md: 6, lg: 8, xl: 10 }}
        >
          <Box
            display={{ base: "none", lg: "block" }}
            minWidth={{ lg: "240px", xl: "280px" }}
            p={4}
            borderRight={"1px solid"}
            borderColor={"primary.100"}
          >
            <VStack align="stretch" borderRadius="md">
              <AppliedFilters />
              {filters
                .filter((filter) => filter.title.toLowerCase() === "category")
                .map((filter) => (
                  <FilterAccordion key={filter.title} {...filter} />
                ))}
            </VStack>
          </Box>

          <Box flex="1" width="full">
            <Box width="full" p={{ base: 0, md: 4 }}>
              <AllProducts />
            </Box>
          </Box>
        </Flex>
      </Box>
    </FormProvider>
  );
};
