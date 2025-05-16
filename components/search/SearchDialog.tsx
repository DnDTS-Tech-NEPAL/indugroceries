"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Box, Flex, Grid, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { CloseCircleIcon } from "@/assets/svg";
import {
  Dialog,
  FormProvider,
  ProductCard,
  SearchInput,
  VisibleSection,
} from "@/components";
import { useColors } from "@/config";
import { ROUTES } from "@/constants";
import {
  useConfigQuery,
  useProductsLikeQuery,
  useSearchListQuery,
} from "@/hooks/api";
import { SearchDialogProps } from "@/types";
import { calculateHeightAndWidth, generateNextPath } from "@/utils";

const MotionBox = motion(Box);

export const SearchDialog = ({ open, onClose }: SearchDialogProps) => {
  const { data: config } = useConfigQuery();
  const { THEME_COLORS } = useColors();
  const methods = useForm();
  const searchValue = methods.watch("search");
  const { data: searchData } = useSearchListQuery(searchValue, {
    enabled: !!searchValue,
  });
  const submitHandler = () => {};
  const list = searchData?.data.data;
  const { height, width } = calculateHeightAndWidth(
    config.width,
    config.height
  );
  const router = useRouter();

  const [page, setPage] = useState(0);
  const PRODUCTS_PER_PAGE = 8;

  const totalPages = list ? Math.ceil(list.length / PRODUCTS_PER_PAGE) : 0;
  const pagedProducts = list
    ? list.slice(page * PRODUCTS_PER_PAGE, (page + 1) * PRODUCTS_PER_PAGE)
    : [];

  const paginate = (direction: number) => {
    setPage((prev) => {
      let next = prev + direction;
      if (next < 0) next = totalPages - 1;
      if (next >= totalPages) next = 0;
      return next;
    });
  };

  // Auto-slide setup
  useEffect(() => {
    if (totalPages <= 1) return;

    const autoSlideInterval = setInterval(() => {
      paginate(1);
    }, 7000);

    return () => clearInterval(autoSlideInterval);
  }, [page, totalPages]);

  const handleClick = (productName: string) => {
    router.push(
      generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
        productName,
      })
    );
    onClose();
  };

  const { data: productsLikeData } = useProductsLikeQuery();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      contentMinWidth={{
        sm: "100%",
        lg: "1000px",
        xl: "1200px",
      }}
    >
      <Box px={"40px"} py={"32px"}>
        <Box position="absolute" top="16px" right="16px" cursor="pointer">
          <CloseCircleIcon
            onClick={onClose}
            stroke={THEME_COLORS.primary[400].value}
            color="white"
          />
        </Box>

        <Flex justifyContent="center" mb="24px">
          <Box position="relative" width={`${width}px`} height={`${height}px`}>
            <Image
              src={config.company_details_url}
              alt={config.company_details_name}
              loading="eager"
              fill
            />
          </Box>
        </Flex>

        <Box px={"100px"}>
          <FormProvider methods={methods} onSubmit={submitHandler}>
            <SearchInput name="search" placeholder="Search" startElement />
          </FormProvider>
          <Text mt="16px" textAlign="center" color="gray.500" fontSize="md">
            Search for your favourite products
          </Text>

          <Flex gap={"12px"} mt={"24px"} justifyContent="center" wrap={"wrap"}>
            {list && list.length > 0 && (
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
                      <SimpleGrid
                        columns={{ base: 2, md: 3, xl: 4 }}
                        gap="20px"
                      >
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
                              title={product.name}
                              description={product.description}
                              price={product.prices?.[0]?.price_list_rate}
                            />
                          </Box>
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
                          bg={page === index ? "#FF6996" : "gray.400"}
                          borderRadius="full"
                          cursor="pointer"
                          onClick={() => setPage(index)}
                          transition="all 0.2s"
                          _hover={{ bg: "#FF6996" }}
                        />
                      ))}
                    </Flex>
                  )}
                </Box>
              </>
            )}
          </Flex>
        </Box>

        <VisibleSection visibility={config?.products_you_may_like_visibility}>
          <Flex
            direction="column"
            alignItems="start"
            gap="8px"
            py="2px"
            mt={"69px"}
          >
            <Heading variant={"heading4"} fontWeight={400} fontSize={"26px"}>
              Products you may like
            </Heading>
            <Text variant={"paragraphRegular"} color={"#252B37"}>
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
          >
            {productsLikeData?.map((product, index) => (
              <ProductCard
                key={index}
                id={index}
                category={product.item_group}
                image={product.custom_image_1_link}
                title={product.name}
                description={product.description}
                price={product.prices?.[0]?.price_list_rate}
              />
            ))}
          </Grid>
        </VisibleSection>
      </Box>
    </Dialog>
  );
};
