"use client";

import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";

import { EmptyState, PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { useCartQuery } from "@/hooks/api";

import { CartSummary, Summary } from "./(components)";
import { useState } from "react";

const Cart = () => {
  const { data: cartData = [], isLoading } = useCartQuery();
  const [quantityChanged, setQuantityChanged] = useState(false);

  const handleQuantityChange = (newQuantity: boolean) => {
    if (newQuantity) {
      setQuantityChanged(true); // Hide the second component when quantity > 1
    } else {
      setQuantityChanged(false); // Show second component if quantity is 1 or less
    }
  };

  return (
    <>
      <PageTitle
        backLabel="Back to homepage"
        backLink={ROUTES.APP.HOMEPAGE}
        title="Shopping Bag"
        breadcrumb={BREADCRUMB_CONFIG.CART}
      />

      <Box
        px={{
          base: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "40px",
        }}
        py={{ base: "24px", lg: "32px", "2xl": "56px" }}
      >
        {isLoading ? (
          <Grid placeItems="center" height="300px">
            <Spinner />
          </Grid>
        ) : cartData?.length > 0 ? (
          <Flex
            flexDirection={{ base: "column", md: "column", lg: "row" }}
            maxWidth={"1280px"}
            mx={"auto"}
            gap={{ md: "20px", lg: "40px", xl: "60px" }}
            alignItems={"stretch"}
          >
            <CartSummary onQuantityChange={handleQuantityChange} />
            <Summary disabled={quantityChanged} />
          </Flex>
        ) : (
          <EmptyState />
        )}
      </Box>
    </>
  );
};

export default Cart;
