"use client";

import {
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  Box,
  Spinner,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

import { ProductCard, EmptyState } from "@/components";
import { useProductSlider } from "@/hooks/app";
import type { ProductSectionProps } from "@/types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

const MotionBox = motion(Box);

export const ProductSection = ({
  type,
  showCategories,
}: ProductSectionProps) => {
  const { sectionData } = useProductSlider(type);
  const { title, subtitle, products, isLoading } = sectionData;
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [page, setPage] = useState(0);

  const PRODUCTS_PER = { base: 10, sm: 8, md: 10, lg: 10 };
  const PRODUCTS_PER_PAGE = useBreakpointValue(PRODUCTS_PER) ?? 10;

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    );
    return ["All", ...unique];
  }, [products]);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === activeCategory)
      );
    }
    setPage(0);
  }, [activeCategory, products]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const pagedProducts = useMemo(() => {
    const start = page * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, page]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const paginate = (direction: number) => {
    setPage((prev) => {
      let next = prev + direction;
      if (next < 0) next = totalPages - 1;
      if (next >= totalPages) next = 0;
      return next;
    });
  };

  // Auto-slide setup using useEffect and setInterval
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      paginate(1);
    }, 9000);

    return () => clearInterval(autoSlideInterval);
  }, [page, totalPages]);

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
            {subtitle ||
              "Top-rated favorites our customers can't live without."}
          </Text>
        </VStack>

        <Button
          color="white"
          bg="primary"
          borderRadius="full"
          px={6}
          py={2}
          size="md"
          _hover={{ bg: "primary.500" }}
          onClick={() => router.push(ROUTES.APP.PRODUCTS)}
        >
          View All Products <FaArrowRightLong />
        </Button>
      </Flex>

      {/* Category Tabs */}
      {showCategories !== false && (
        <HStack overflowX="auto" justifyContent={"center"} gap={4} pb={2}>
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <Box
                key={category}
                px={4}
                py={2}
                borderRadius="full"
                bg={isActive ? "primary.50" : "gray.100"}
                color={isActive ? "primary" : "gray.600"}
                fontWeight={isActive ? "600" : "400"}
                cursor="pointer"
                whiteSpace="nowrap"
                onClick={() => handleCategoryChange(category)}
                transition="all 0.2s"
                _hover={{ bg: isActive ? "primary.50" : "gray.200" }}
              >
                {category}
              </Box>
            );
          })}
        </HStack>
      )}

      {/* Product Slider with Framer Motion */}
      {isLoading ? (
        <Box display="grid" placeItems="center" height="300px">
          <Spinner />
        </Box>
      ) : filteredProducts.length > 0 ? (
        <Box w="full" position="relative">
          <AnimatePresence mode="wait">
            <MotionBox
              key={page}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                gap={{ sm: 4, base: 4, md: 6 }}
              >
                {pagedProducts.map((product) => (
                  <ProductCard key={product.title} {...product} />
                ))}
              </SimpleGrid>
            </MotionBox>
          </AnimatePresence>

          {/* Dot Pagination */}
          {totalPages > 1 && (
            <Flex justify="center" mt={6} gap={2}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Box
                  key={index}
                  w={3}
                  h={3}
                  bg={page === index ? "primary" : "gray.400"}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => setPage(index)}
                  transition="all 0.2s"
                  _hover={{ bg: "primary" }}
                />
              ))}
            </Flex>
          )}
        </Box>
      ) : (
        <EmptyState />
      )}
    </VStack>
  );
};
