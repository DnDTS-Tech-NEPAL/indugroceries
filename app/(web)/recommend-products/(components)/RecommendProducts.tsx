"use client";

import Image from "next/image";
import { Box, Grid, SimpleGrid, Spinner, Text } from "@chakra-ui/react";

import { EmptyStateImage, Recommend1, Recommend2 } from "@/assets/image";
import { ProductCard } from "@/components";

export const RecommendProducts = () => {
  // const { data, isLoading } = useRecommendProductsQuery();
  const isLoading = false;
  const products = [
    {
      title: "Product 1",
      image: Recommend1.src,
      price: "$19.99",
      discount: "10%",
      rating: 4,
      reviews: 10,
      category: "Category 1",
      item_code: "item_code_2",
      link: "link_2",
      stock_qty: 10,
    },
    {
      title: "Product 2",
      image: Recommend2.src,
      price: "$19.99",
      discount: "10%",
      rating: 4,
      reviews: 10,
      category: "Category 1",
      item_code: "item_code_2",
      link: "link_2",
      stock_qty: 10,
    },
    {
      title: "Product 3",
      image: Recommend1.src,
      price: "$19.99",
      discount: "10%",
      rating: 4,
      reviews: 10,
      category: "Category 1",
      item_code: "item_code_2",
      link: "link_2",
      stock_qty: 10,
    },
    {
      title: "Product 4",
      image: Recommend1.src,
      price: "$19.99",
      discount: "10%",
      rating: 4,
      reviews: 10,
      category: "Category 1",
      item_code: "item_code_2",
      link: "link_2",
      stock_qty: 10,
    },
  ];

  return (
    <Box maxW={"6xl"} mx={"auto"} py={12}>
      <Box spaceY={6}>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="600"
          color="gray.800"
          textAlign={"center"}
        >
          Based on Your Answers, We Recommend
        </Text>
        <Text
          textAlign={"center"}
          maxW={"xl"}
          mx={"auto"}
          fontSize={{ base: "sm", md: "md" }}
          color="gray.500"
        >
          We&apos;ve analyzed your quiz answers to match you with skincare
          products that work in harmony with your unique skin type.
        </Text>
      </Box>
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
        <SimpleGrid
          columns={[1, 2, 3, 4]}
          gap={{ base: "6px", md: "12px", lg: "14px" }}
          my={{ base: "8px", md: "10px", lg: "12px" }}
        >
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
