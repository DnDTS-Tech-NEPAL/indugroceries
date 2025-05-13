"use client";

import { useForm } from "react-hook-form";
import { Box, Flex } from "@chakra-ui/react";

import { FormProvider } from "@/components";
import { popularityFilterOptions, priceRangeFilterOptions } from "@/constants";
// import { useProductsFilter } from "@/hooks/app";
import { ProductFilterType } from "@/types";

import { AllProducts } from "./AllProducts";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const ProductsContainer = () => {
  const methods = useForm<ProductFilterType>({
    defaultValues: {
      bestseller: popularityFilterOptions[0].value,
      pricerange: priceRangeFilterOptions[0].value,
      item_group: [],
    },
  });
  const submitHandler = () => {};

  // const filters = useProductsFilter();
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
      <Box
        px={{
          base: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "40px",
        }}
      >
        <Flex
          flexDirection={{ base: "column", md: "column", lg: "row" }}
          maxWidth={"1280px"}
          mx={"auto"}
          gap={{ md: "20px", lg: "40px", xl: "60px" }}
          alignItems={"stretch"}
          py={{ base: "24px", lg: "32px", "2xl": "56px" }}
        >
          {/* <Box
            display={{ base: "none", lg: "block" }}
            minWidth="240px"
            p={4}
            borderRight={"1px solid"}
            borderColor={"primary.100"}
          >
            <VStack align="stretch" borderRadius="md">
              {filters.map((filter) => (
                <FilterAccordion key={filter.title} {...filter} />
              ))}
            </VStack>
          </Box> */}

          <Box flex="1">
            <Flex>
              <Box width="full" p={4}>
                <AllProducts />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </FormProvider>
  );
};
