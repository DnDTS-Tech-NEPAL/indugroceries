"use client";

import { useEffect, useState } from "react";
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
  Collapsible,
} from "@chakra-ui/react";

import { Pagination, ProductCard } from "@/components";
import { useFilterProductsQuery } from "@/hooks/api";
import { useBrandFilterStore } from "@/store/products/brandFilterStore";
import { CategoryFilter } from "./CategoryFilter";
import { PAGE_SIZE } from "@/constants";

interface CategoryProductsPageProps {
  category: string;
}
interface FilteredProductType {
  title?: string;
  price?: number;
  stock_qty?: number;
  discount?: string;
  skin_types?: string[];
  skin_concerns?: string[];
}

export default function CategoryProductsPage({
  category,
}: CategoryProductsPageProps) {
  const {
    brand,
    priceRange,
    discount,
    inStock,
    skinTypes,
    skinConcern,
    page,
    setPage,
    item_group,
  } = useBrandFilterStore();

  const [sortBy, setSortBy] = useState<string>("");
  const [showFilter, setShowFilter] = useState(true);

  const priceSortOrder =
    sortBy === "low-high" ? 1 : sortBy === "high-low" ? 2 : 0;

  // ⬇️ Use selected categories (parent or child)
  const selectedCategories =
    item_group && item_group.length > 0 ? item_group : [category];

  const { data, isLoading } = useFilterProductsQuery({
    brand,
    item_group: selectedCategories,
    in_stock: inStock,
    bestseller: 0,
    pricerange: priceSortOrder,
    page,
    size: PAGE_SIZE,
  });

  const products = data?.products || [];
  const allPrices = products.map((p) => p.price || 0);
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 2500;

  const total_count = data?.total_count || 0;
  const totalPages = Math.ceil(total_count / PAGE_SIZE);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page, setPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0 });
  };

  const filteredProducts = products.filter((product: FilteredProductType) => {
    const price = product.price || 0;
    const stockQty = product.stock_qty ?? 0;
    const maxDiscount = parseFloat(product.discount || "0");

    const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const matchesAvailability =
      inStock === 0 ? true : inStock === 1 ? stockQty > 0 : stockQty <= 0;
    const matchesSkinTypes =
      skinTypes.length === 0 ||
      (product.skin_types &&
        product.skin_types.some((st) => skinTypes.includes(st)));

    const matchesSkinConcernTypes =
      skinConcern.length === 0 ||
      (product.skin_concerns &&
        product.skin_concerns.some((st) => skinConcern.includes(st)));

    const matchesDiscount = discount === 0 || maxDiscount >= discount;

    return (
      inPriceRange &&
      matchesAvailability &&
      matchesSkinTypes &&
      matchesSkinConcernTypes &&
      matchesDiscount
    );
  });

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
      <Collapsible.Root
        open={showFilter}
        onOpenChange={(details) => setShowFilter(details.open)}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            lg: showFilter ? "300px 1fr" : "1fr",
          }}
          gap={8}
        >
          <CategoryFilter
            slug={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            inStockCount={inStockCount}
            outOfStockCount={outOfStockCount}
            isOpen={showFilter}
          />

          <GridItem>
            <VStack gap={6} align="stretch">
              <Flex justify="space-between" align="center" wrap="wrap">
                <Box>
                  <HStack gap={4} align="baseline">
                    <Heading size="lg">All Products</Heading>(
                    {filteredProducts.length} products found)
                  </HStack>
                </Box>

                <HStack>
                  <Text fontSize="sm">Sort By :</Text>
                  <Select.Root
                    collection={orderStatusOptions}
                    size="sm"
                    width="200px"
                    onValueChange={(val) =>
                      setSortBy((val.value as string[])[0])
                    }
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

                  <Box>
                    <Collapsible.Trigger>
                      <Text
                        fontWeight="medium"
                        cursor="pointer"
                        color="pink.500"
                        border="1px solid"
                        px={4}
                        py={1}
                        borderRadius="md"
                      >
                        {showFilter ? "Hide Filters" : "Show Filters"}
                      </Text>
                    </Collapsible.Trigger>
                  </Box>
                </HStack>
              </Flex>

              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: `repeat(${showFilter ? 4 : 5}, 1fr)`,
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

        {!isLoading && products.length > 0 && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        )}
      </Collapsible.Root>
    </Container>
  );
}
