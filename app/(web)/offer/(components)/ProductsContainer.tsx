"use client";

import { useForm } from "react-hook-form";
import { Box, Flex } from "@chakra-ui/react";

import { FormProvider } from "@/components";
import { popularityFilterOptions, priceRangeFilterOptions } from "@/constants";
import { ProductFilterType } from "@/types";

import { OfferProducts } from "./AllProducts";

export const ProductsContainer = () => {
  const methods = useForm<ProductFilterType>({
    defaultValues: {
      bestseller: popularityFilterOptions[0].value,
      pricerange: priceRangeFilterOptions[0].value,
      item_group: [],
    },
  });
  const submitHandler = () => {};
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
        <Box flex="1">
          <Flex>
            <Box width="full" p={4}>
              <OfferProducts />
            </Box>
          </Flex>
        </Box>
      </Box>
    </FormProvider>
  );
};
