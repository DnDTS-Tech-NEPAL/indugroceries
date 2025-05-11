"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

import { EmptyStateImage } from "@/assets/image";
import { Pagination, ProductCard } from "@/components";
import { PAGE_SIZE } from "@/constants";
import { useFilterProductsQuery } from "@/hooks/api";
import { ProductFilterType } from "@/types";

import { ProductFilters } from "./ProductFilters";
import { useSearchParams } from "next/navigation";

export const AllProducts = () => {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get("category");
  const BrandFromQuery = searchParams.get("brands");
  const { watch, setValue, trigger } = useFormContext<ProductFilterType>();

  const { brand, item_group, bestseller, pricerange } = watch();

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (categoryFromQuery) {
      setValue("item_group", [categoryFromQuery]);
      trigger();
    }
    if (BrandFromQuery) {
      setValue("brand", [BrandFromQuery]);
      trigger();
    }
  }, [categoryFromQuery, BrandFromQuery, setValue, trigger]);

  const { data, isLoading } = useFilterProductsQuery({
    brand,
    item_group,
    bestseller: +bestseller,
    pricerange: +pricerange,
    page: currentPage,
    size: PAGE_SIZE,
  });

  const products = data?.products || [];
  const total_count = data?.total_count || 0;
  const totalPages = Math.ceil(total_count / PAGE_SIZE);

  return (
    <Box>
      <Flex
        justifyContent={{ base: "column", lg: "space-between" }}
        direction={{ base: "column", lg: "row" }}
        mb={{ base: "24px", md: "20px" }}
        gap={{ base: "16px", lg: "0" }}
      >
        <Heading variant={{ base: "heading6", lg: "heading7" }}>
          All Products {!isLoading && `(${total_count} products found)`}
        </Heading>

        <ProductFilters />
      </Flex>

      {isLoading ? (
        <Grid placeItems="center" height="500px">
          <Spinner />
        </Grid>
      ) : products.length === 0 ? (
        <Box placeItems="center" height="800px" mt={"50px"}>
          <Image
            src={EmptyStateImage}
            alt="Empty State"
            width={304}
            height={272}
          />
        </Box>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} gap="20px">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </SimpleGrid>
      )}

      {!isLoading && products.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          onPageChange={(newPage) => {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0 });
          }}
        />
      )}
    </Box>
  );
};
