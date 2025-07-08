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
import { BrandFilter } from "./BrandFilter";
import { PAGE_SIZE } from "@/constants";
interface BrandProductsPageProps {
  brandName: string;
}
interface FilteredProductType {
  price?: number;
  stock_qty?: number;
  discount?: string;
  skin_types?: string[];
  skin_concerns?: string[];
}

export default function BrandProductsPage({
  brandName,
}: BrandProductsPageProps) {
  const {
    category,
    priceRange,
    discount,
    inStock,
    skinTypes,
    page,
    setPage,
    skinConcern,
  } = useBrandFilterStore();

  const [sortBy, setSortBy] = useState<string>("");
  const [showFilter, setShowFilter] = useState(true);

  const priceSortOrder =
    sortBy === "low-high" ? 1 : sortBy === "high-low" ? 2 : 0;

  const { data, isLoading } = useFilterProductsQuery({
    brand: [brandName],
    item_group: category,
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
  }, [totalPages, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0 });
  };

  const filteredProducts = products.filter((product: FilteredProductType) => {
    const price = product.price || 0;
    const stockQty = product.stock_qty ?? 0;
    const maxDiscount = parseFloat(product.discount || "0");

    // const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    const inPriceRange =
      priceRange[0] === 0 && priceRange[1] === 0
        ? true
        : price >= priceRange[0] && price <= priceRange[1];

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

  // const { open, onOpen, onClose } = useDisclosure();
  // useEffect(() => {
  //   window.addEventListener("resize", onClose);
  //   return () => window.removeEventListener("resize", onClose);
  // }, []);
  return (
    <Container maxW="7xl" py={8}>
      {/* <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}> */}
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
          {/* Sidebar Filters */}
          <BrandFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            inStockCount={inStockCount}
            outOfStockCount={outOfStockCount}
            isOpen={showFilter}
            // skinTypes={skinTypes}
          />

          {/* Main Content */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Header */}
              <Flex
                justify="space-between"
                w-full
                align="center"
                wrap="wrap"
                gap={4}
              >
                <Box>
                  <HStack gap={4} align="baseline">
                    <Heading size="lg">All Products</Heading>({filteredProducts.length}{" "}
                    products found)
                  </HStack>
                </Box>
                <HStack gap={1}>
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
                  {/* Sidebar Filters */}
                  {/* <Box
                onClick={onOpen}
                bg="primary.50"
                borderRadius="8px"
                p="6px"
                border="1px solid"
                borderColor="primary.100"
                cursor="pointer"
              >
                <Flex align="center" gap={"2px"}>
                  <FilterIcon height={"14px"} width={"14px"} />
                  <Text px={3} fontSize={"12px"} fontWeight={500}>
                    Filter
                  </Text>
                </Flex>
              </Box> */}
                </HStack>
              </Flex>

              {/* Products Grid */}
              <Grid
                templateColumns={{
                  base: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
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

        {/* <Drawer
        // title="Brand Filter"
        placement="start"
        open={open}
        onClose={onClose}
        hasFooter={false}
        actionButtonText="Reset"
        cancelButtonText="Close"
        hasCloseIcon={false}
        // onAction={onReset}
        onEnd={onClose}
      >
        <BrandFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStockCount={inStockCount}
          outOfStockCount={outOfStockCount}
          // skinTypes={skinTypes}
        />
      </Drawer> */}
      </Collapsible.Root>
    </Container>
  );
}
