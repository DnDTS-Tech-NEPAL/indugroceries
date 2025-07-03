"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";

import { ProductCard } from "@/components";
import { useFilterProductsQuery } from "@/hooks/api";
import { useBrandFilterStore } from "@/store/products/brandFilterStore";
import { BrandFilter } from "./BrandFilter";

interface BrandProductsPageProps {
  brandName: string;
}

export default function BrandProductsPage({
  brandName,
}: BrandProductsPageProps) {
  const { category, priceRange, discount, inStock, skinTypes } =
    useBrandFilterStore();

  const [sortBy, setSortBy] = useState<string>("");

  const priceSortOrder =
    sortBy === "low-high" ? 1 : sortBy === "high-low" ? 2 : 0;

  const { data } = useFilterProductsQuery({
    brand: [brandName],
    item_group:category,
    in_stock: inStock,
    bestseller: 0,
    pricerange: priceSortOrder,
    page: 1,
    size: 20000,
  });
  const products = data?.products || [];
  const allPrices = products.map((p) => p.price || 0);
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 2500;

  const filteredProducts = products.filter(
    (product: {
      price?: number;
      stock_qty?: number;
      prices?: Array<{
        discount?: number;
        [key: string]: any;
      }>;
      skin_types?: string[];
      [key: string]: any;
    }) => {
      const price = product.price || 0;
      const stockQty = product.stock_qty ?? 0;
     const maxDiscount = parseFloat(product.discount || "0");


      const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
      const matchesAvailability =
        inStock === 0 ? true : inStock === 1 ? stockQty > 0 : stockQty <= 0;
      const matchesSkinTypes =
        skinTypes.length === 0 ||
        (product.skin_types &&
          product.skin_types.some((st: string) => skinTypes.includes(st)));

      return (
        inPriceRange &&
        matchesAvailability &&
        matchesSkinTypes &&
        (discount === 0 || maxDiscount >= discount)
      );
    }
  );
  const orderStatusOptions = createListCollection({
    items: [
      { label: "Price: Low to High", value: "low-high" },
      { label: "Price: High to Low", value: "high-low" },
      { label: "Newest", value: "newest" },
    ],
  });
  const inStockCount = products.filter(
    (p) => p.stock_qty && p.stock_qty > 0
  ).length;
  const outOfStockCount = products.filter((p) => p.stock_qty === 0).length;
  return (
    <Container maxW="7xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
        {/* Sidebar Filters */}
        <BrandFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStockCount={inStockCount}
          outOfStockCount={outOfStockCount}
          // skinTypes={skinTypes}
        />

        {/* Main Content */}
        <GridItem>
          <VStack gap={6} align="stretch">
            {/* Header */}
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <Box>
                <HStack gap={4} align="baseline">
                  <Heading size="lg">All Products</Heading>(
                  {filteredProducts.length} products found)
                  <Heading size="lg" color="gray.800">
                    {brandName}
                  </Heading>
                </HStack>
              </Box>
              <HStack>
                <Text fontSize="sm">Sort By :</Text>
                <Select.Root
                  collection={orderStatusOptions}
                  size="sm"
                  width="200px"
                  onValueChange={(val) => setSortBy((val.value as string[])[0])}
                >
                  <Select.HiddenSelect />
                  <Flex>
                    <Select.Control>
                      <Select.Trigger width={"140px"}>
                        <Select.ValueText placeholder="Relevance" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                  </Flex>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {orderStatusOptions.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </HStack>
            </Flex>

            {/* Products Grid */}
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </Grid>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}

