"use client"

import {
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  Box,
  SimpleGrid,
  Spinner,
  Grid,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { FaArrowRightLong } from "react-icons/fa6"

import { ProductCard, EmptyState } from "@/components"
import { useProductSlider } from "@/hooks/app"
import type { ProductSectionProps } from "@/types"

export const ProductSection = ({ type, showCategories }: ProductSectionProps) => {
  const { sectionData } = useProductSlider(type)
  const { title, subtitle, products, isLoading } = sectionData

  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [currentPage, setCurrentPage] = useState(0)

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    )
    return ["All", ...unique]
  }, [products])

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === activeCategory)
      )
    }
    // Reset to first page when category changes
    setCurrentPage(0)
  }, [activeCategory, products])

  // Auto-slide functionality
  useEffect(() => {
    const PRODUCTS_PER_PAGE = 8
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
    
    if (totalPages <= 1) return // Don't auto-slide if only one page

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [filteredProducts])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  // Calculate visible products
  const PRODUCTS_PER_PAGE = 8
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const visibleProducts = filteredProducts.slice(
    currentPage * PRODUCTS_PER_PAGE,
    (currentPage + 1) * PRODUCTS_PER_PAGE
  )

  return (
    <VStack
      maxW="7xl"
      mx="auto"
      alignItems="stretch"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "40px", lg: "60px" }}
      gap="32px"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        direction={{ base: "column", sm: "row" }}
        gap={6}
        align={{ base: "flex-start", sm: "flex-end" }}
      >
        <VStack align="flex-start" gap={1}>
          <Heading fontSize={{ base: "24px", md: "32px" }} color="gray.800">
            {title || "Our Best-Selling Products"}
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
            {subtitle || "Top-rated favorites our customers can't live without."}
          </Text>
        </VStack>

        <Button
          color="white"
          bg="#FF6996"
          borderRadius="full"
          px={6}
          py={2}
          size="md"
          _hover={{ bg: "#ff5286" }} 
        >
          View All Products <FaArrowRightLong />
        </Button>
      </Flex>

      {/* Category Tabs */}
      {showCategories !== false && (
      <HStack overflowX="auto" gap={4} pb={2}>
        {categories.map((category) => {
          const isActive = activeCategory === category
          return (
            <Box
              key={category}
              px={4}
              py={2}
              borderRadius="full"
              bg={isActive ? "#FFEDF3" : "gray.100"}
              color={isActive ? "#FF6996" : "gray.600"}
              fontWeight={isActive ? "600" : "400"}
              cursor="pointer"
              whiteSpace="nowrap"
              onClick={() => handleCategoryChange(category)}
              transition="all 0.2s"
              _hover={{ bg: isActive ? "#FFEDF3" : "gray.200" }}
            >
              {category}
            </Box>
          )
        })}
      </HStack>)}

      {/* Product Grid */}
      {isLoading ? (
        <Grid placeItems="center" height="300px">
          <Spinner />
        </Grid>
      ) : filteredProducts.length > 0 ? (
        <>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            gap={{ base: 4, md: 6 }}
          >
            {visibleProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </SimpleGrid>

          {/* Page indicators */}
          {totalPages > 1 && (
            <HStack justify="center" gap={2} mt={4}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Box
                  key={index}
                  as="button"
                  w="10px"
                  h="10px"
                  borderRadius="full"
                  bg={currentPage === index ? "#FF6996" : "gray.300"}
                  onClick={() => setCurrentPage(index)}
                  transition="background-color 0.3s"
                  _hover={{ bg: currentPage === index ? "#FF6996" : "gray.400" }}
                />
              ))}
            </HStack>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </VStack>
  )
}