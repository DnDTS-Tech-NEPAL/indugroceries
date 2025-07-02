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
} from "@chakra-ui/react"
import { PAGE_SIZE } from "@/constants";
import { useState } from "react"

interface BrandProductsPageProps {
  brandName: string;
}

export default function BrandProductsPage({ brandName }: BrandProductsPageProps) {
  const [priceRange, setPriceRange] = useState([0, 2500])
  const { item_group, bestseller, pricerange, page, setPage } =
      useFilterStore();

   // Fetch filtered products
    const { data, isLoading } = useFilterProductsQuery({
      brand:[brandName],
      item_group,
      bestseller: +bestseller,
      pricerange: +pricerange,
      page,
      size: PAGE_SIZE,
    });

    const products = data?.products || [];
      const total_count = data?.total_count || 0;
      const totalPages = Math.ceil(total_count / PAGE_SIZE);
  return (
    <Container maxW="7xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
        {/* Sidebar Filters */}
        <GridItem>
          <Box bg="gray.50" p={6} borderRadius="lg">
            <HStack justify="space-between" mb={6}>
              <Heading size="md">Filter by</Heading>
              <Button variant="ghost" size="sm" color="gray.600">
                Reset
              </Button>
            </HStack>

            <VStack gap={6} align="stretch">
              {/* <Accordion allowMultiple>
                <AccordionItem border="none">
                  <AccordionButton px={0} _hover={{ bg: "transparent" }}>
                    <Box flex="1" textAlign="left" fontWeight="medium">
                      Category
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={0}>
                    <VStack align="stretch" gap={2}>
                      <Checkbox>Skincare</Checkbox>
                      <Checkbox>Makeup</Checkbox>
                      <Checkbox>Fragrance</Checkbox>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                  <AccordionButton px={0} _hover={{ bg: "transparent" }}>
                    <Box flex="1" textAlign="left" fontWeight="medium">
                      Brands
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={0}>
                    <VStack align="stretch" gap={2}>
                      <Checkbox>MAC</Checkbox>
                      <Checkbox>Medicube</Checkbox>
                      <Checkbox>CICA</Checkbox>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                  <AccordionButton px={0} _hover={{ bg: "transparent" }}>
                    <Box flex="1" textAlign="left" fontWeight="medium">
                      Discount
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={0}>
                    <VStack align="stretch" gap={2}>
                      <Checkbox>10% or more</Checkbox>
                      <Checkbox>20% or more</Checkbox>
                      <Checkbox>30% or more</Checkbox>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion> */}

              <Box>
                <Heading size="sm" mb={4}>
                  Price
                </Heading>
                {/* <RangeSlider value={priceRange} onChange={setPriceRange} min={0} max={2500} step={50} mb={4}>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack bg="pink.400" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider> */}
                <HStack>
                  <Box>
                    <Text fontSize="sm" mb={1}>
                      From
                    </Text>
                    <Input size="sm" value={`NPR ${priceRange[0]}`} readOnly bg="white" />
                  </Box>
                  <Box>
                    <Text fontSize="sm" mb={1}>
                      To
                    </Text>
                    <Input size="sm" value={`NPR ${priceRange[1]}`} readOnly bg="white" />
                  </Box>
                </HStack>
              </Box>

              <Box>
                <Heading size="sm" mb={4}>
                  Availability
                </Heading>
                {/* <VStack align="stretch" gap={2}>
                  <HStack justify="space-between">
                    <Checkbox>In Stock</Checkbox>
                    <Text fontSize="sm" color="gray.600">
                      (15)
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Checkbox>Out of Stock</Checkbox>
                    <Text fontSize="sm" color="gray.600">
                      (7)
                    </Text>
                  </HStack>
                </VStack> */}
              </Box>
            </VStack>
          </Box>
        </GridItem>

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
              <HStack gap={2}>
                <Text fontSize="sm">Sort By :</Text>
                {/* <Select size="sm" defaultValue="relevance" w="auto">
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </Select> */}
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
