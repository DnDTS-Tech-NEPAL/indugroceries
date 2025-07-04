"use client";

import { useMemo, useState } from "react";
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
  Spinner,
  Portal,
  createListCollection,
} from "@chakra-ui/react";

import { ProductCard } from "@/components";
import { useFilterProductsQuery } from "@/hooks/api";
import { useBrandFilterStore } from "@/store/products/brandFilterStore";
import { CategoryFilter } from "./CategoryFilter";

interface CategoryProductsPageProps {
  category: string;
}

export default function CategoryProductsPage({ category }: CategoryProductsPageProps) {
  const {
    brand,
    priceRange,
    discount,
    inStock,
    skinTypes,
  } = useBrandFilterStore();

  const [sortBy, setSortBy] = useState<string>("");

  const priceSortOrder = sortBy === "low-high" ? 1 : sortBy === "high-low" ? 2 : 0;

  const { data, isLoading } = useFilterProductsQuery({
    category: [category],
    brand: brand,
    item_group: [],
    in_stock: inStock,
    bestseller: 0,
    pricerange: priceSortOrder,
    page: 1,
    size: 100,
  });
  const products = data?.products || [];
  const [minPrice, maxPrice, inStockCount, outOfStockCount] = useMemo(() => {
    const prices = products.map((p) => p.price || 0);
    const min = prices.length > 0 ? Math.min(...prices) : 0;
    const max = prices.length > 0 ? Math.max(...prices) : 2500;

    const inStockCount = products.filter((p) => p.stock_qty && p.stock_qty > 0).length;
    const outOfStockCount = products.filter((p) => p.stock_qty === 0).length;

    return [min, max, inStockCount, outOfStockCount];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = product.price || 0;
      const stockQty = product.stock_qty ?? 0;
      const maxDiscount = parseFloat(product.discount || "0");

      const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
      const matchesAvailability = inStock === 0 ? true : inStock === 1 ? stockQty > 0 : stockQty <= 0;
      const matchesSkinTypes =
        skinTypes.length === 0 ||
        (product.skin_types && product.skin_types.some((st) => skinTypes.includes(st)));
      const matchesDiscount = discount === 0 || maxDiscount >= discount;

      return inPriceRange && matchesAvailability && matchesSkinTypes && matchesDiscount;
    });
  }, [products, priceRange, discount, inStock, skinTypes]);

  const orderStatusOptions = createListCollection({
    items: [
      { label: "Price: Low to High", value: "low-high" },
      { label: "Price: High to Low", value: "high-low" },
      { label: "Newest", value: "newest" },
    ],
  });

  return (
    <Container maxW="7xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
        <CategoryFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStockCount={inStockCount}
          outOfStockCount={outOfStockCount}
        />

        <GridItem>
          <VStack gap={6} align="stretch">
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <HStack gap={4} align="baseline">
                <Heading size="lg">All Products</Heading>
                <Text>({filteredProducts.length} found)</Text>
              </HStack>

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

            {isLoading ? (
              <Flex justify="center" align="center" py={12}>
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.title} {...product} />
                  ))
                ) : (
                  <Text fontSize="lg" color="gray.500">
                    No products found.
                  </Text>
                )}
              </Grid>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
