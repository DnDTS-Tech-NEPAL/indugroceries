"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { ProductCard, VisibleSection } from "@/components";
import { ROUTES } from "@/constants";
import {
  useConfigQuery,
  useProductsLikeQuery,
  useSearchListQuery,
} from "@/hooks/api";
import { generateNextPath } from "@/utils";

const MotionBox = motion(Box);

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const router = useRouter();

  const { data: config } = useConfigQuery();
  const { data: productsLikeData } = useProductsLikeQuery();
  const { data: searchData } = useSearchListQuery(query, {
    enabled: !!query,
  });

  const list = searchData?.data?.data ?? [];

  const productsPerPage =
    useBreakpointValue({
      base: 6,
      md: 8,
      xl: 10,
    }) ?? 8;

  const totalPages = Math.ceil(list.length / productsPerPage);
  const [page, setPage] = useState(0);

  const pagedProducts = list.slice(
    page * productsPerPage,
    (page + 1) * productsPerPage
  );

  useEffect(() => {
    setPage(0);
  }, [query, productsPerPage]);

  const handleClick = (productName: string) => {
    router.push(
      generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
        productName,
      })
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | "...")[] = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages - 2, page + 2);

    pages.push(0);
    if (startPage > 1) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages - 1);

    return (
      <Flex justify="center" align="center" mt={6} gap={4} flexWrap="wrap">
        <Button
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>

        <Flex gap={2} wrap="wrap" justify="center">
          {pages.map((p, i) =>
            p === "..." ? (
              <Box
                key={`ellipsis-${i}`}
                px={2}
                fontWeight="bold"
                color="gray.500"
              >
                ...
              </Box>
            ) : (
              <Box
                key={p}
                w={8}
                h={8}
                bg={page === p ? "#FF6996" : "gray.300"}
                color={page === p ? "white" : "gray.700"}
                borderRadius="full"
                cursor="pointer"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => setPage(p)}
                transition="all 0.2s"
                _hover={{ bg: "#FF6996", color: "white" }}
                userSelect="none"
              >
                {p + 1}
              </Box>
            )
          )}
        </Flex>

        <Button
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          Next
        </Button>
      </Flex>
    );
  };

  return (
    <Box bg="white" py="32px">
      <Container maxW="7xl" px={{ base: 4, md: 12, xl: 20 }}>
        {list.length > 0 ? (
          <>
            <Heading
              variant="heading5"
              mt="40px"
              mb="12px"
              w="full"
              textAlign="center"
            >
              Search Results
            </Heading>

            <Box w="full" position="relative">
              <AnimatePresence mode="wait">
                <MotionBox
                  key={page}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  <SimpleGrid columns={{ base: 3, md: 4, xl: 5 }} gap="20px">
                    {pagedProducts.map((product, index) => (
                      <Box
                        key={index}
                        onClick={() => handleClick(product.name)}
                        cursor="pointer"
                      >
                        <ProductCard
                          id={index}
                          category={product.item_group}
                          image={product.custom_image_1_link}
                          title={product.item_name}
                          price={product.prices?.[0]?.price_list_rate}
                          link={product.name}
                          item_code={product.item_code}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </MotionBox>
              </AnimatePresence>

              {renderPagination()}
            </Box>
          </>
        ) : (
          <Box textAlign="center" mt="80px">
            <Heading fontSize="2xl" mb={4}>
              No products found
            </Heading>
            {query && (
              <Text color="gray.600">
                We couldn&apos;t find anything matching &quot;{query}&quot;.
              </Text>
            )}
          </Box>
        )}

        {/* Suggested Products */}
        <VisibleSection visibility={config?.products_you_may_like_visibility}>
          <Flex direction="column" alignItems="start" gap="8px" mt="69px">
            <Heading variant="heading4" fontWeight={400} fontSize="26px">
              Products you may like
            </Heading>
            <Text variant="paragraphRegular" color="#252B37">
              Stay ahead of the curve with this season&apos;s must-have pieces
            </Text>
          </Flex>

          <Grid
            gridTemplateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap="20px"
            mt="20px"
          >
            {productsLikeData?.map((product, index) => (
              <ProductCard
                key={index}
                id={index}
                category={product.item_group}
                image={product.custom_image_1_link}
                title={product.name}
                price={product.prices?.[0]?.price_list_rate}
                link={product.name}
                item_code={product.item_code}
              />
            ))}
          </Grid>
        </VisibleSection>
      </Container>
    </Box>
  );
};

export default SearchPage;
