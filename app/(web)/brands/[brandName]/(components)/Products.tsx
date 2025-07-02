"use client"

import { StarIcon } from "@/assets/svg"
import { ProductCard } from "@/components"
import { useFilterProductsQuery } from "@/hooks/api"
import { useFilterStore } from "@/store/products/filterStore"

import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react"
import { PAGE_SIZE } from "@/constants";
import { useState } from "react"
import { BrandFilter } from "./BrandFilter"

interface BrandProductsPageProps {
  brandName: string;
}

export default function BrandProductsPage({ brandName }: BrandProductsPageProps) {
  const [priceRange, setPriceRange] = useState([0, 2500])
 

   // Fetch filtered products
    const { data, isLoading } = useFilterProductsQuery({
      brand:[brandName],
      item_group:[],
      bestseller: 0,
      pricerange: 0,
      page:1,
      size: PAGE_SIZE,
    });

    const products = data?.products || [];
      const total_count = data?.total_count || 0;
      const totalPages = Math.ceil(total_count / PAGE_SIZE);
       const orderStatusOptions = createListCollection({
  items: [
    { label: "Price: Low to High", value: " low-high" },
    { label: "Price: High to Low", value: " high-low" },
    { label: "Newest", value: "newest" },

  ],
});
  return (
    <Container maxW="7xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
        {/* Sidebar Filters */}
        <BrandFilter/>

        {/* Main Content */}
        <GridItem>
          <VStack gap={6} align="stretch">
            {/* Header */}
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <Box>
                <HStack gap={4} align="baseline">
                  <Heading size="lg">All Products</Heading>
                  ({total_count} products found)
                  <Heading size="lg" color="gray.800">
                   {brandName}
                  </Heading>
                </HStack>
              </Box>
             <HStack>
                        <Text fontSize="sm">
                          Sort By :
                        </Text>
                        <Select.Root collection={orderStatusOptions} size="sm" width="200px">
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
               {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
            </Grid>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  )
}
