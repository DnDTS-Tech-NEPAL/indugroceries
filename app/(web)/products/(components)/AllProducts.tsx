"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
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
import { useFilterStore } from "@/store/products/filterStore";

export const AllProducts = () => {
  const { brand, item_group, bestseller, pricerange, page, setPage } =
    useFilterStore();

  // Fetch filtered products
  const { data, isLoading } = useFilterProductsQuery({
    brand,
    item_group,
    bestseller: +bestseller,
    pricerange: +pricerange,
    page,
    size: PAGE_SIZE,
  });

  const products = data?.products || [];
  const total_count = data?.total_count || 0;
  const totalPages = Math.ceil(total_count / PAGE_SIZE);

  // Validate current page is within bounds
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  // Compute the label to display based on bestseller filter
  const productLabel = useMemo(() => {
    switch (bestseller) {
      case 1:
        return "Best Selling";
      case 2:
        return "New Arrivals";
      default:
        return "All";
    }
  }, [bestseller]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0 });
  };

  return (
    <Box>
      <Flex
        justifyContent={{ base: "column", lg: "space-between" }}
        direction={{ base: "column", lg: "row" }}
        mb={{ base: "24px", md: "20px" }}
        gap={{ base: "16px", lg: "0" }}
      >
        <Heading variant={{ base: "heading6", lg: "heading7" }}>
          {productLabel} Products{" "}
          {!isLoading && `(${total_count} products found)`}
        </Heading>
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

      {!isLoading && products.length > 0 && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
};
