"use client";

import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";

import { Button, EmptyState, PageTitle, Tooltip } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";
import { useCartQuery } from "@/hooks/api";

import { CartSummary } from "./(components)";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";
import { getOrCreateGuestId } from "@/utils/guest";

const Cart = () => {
  const guid = getOrCreateGuestId();
  const { data: cartData = [], isLoading } = useCartQuery(guid);
  const router = useRouter();
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
            flexDirection={{
              base: "column",
              md: "column",
              lg: "column",
              xl: "column",
            }}
            maxWidth={"1280px"}
            mx={"auto"}
            gap={{ md: "20px", lg: "40px", xl: "60px" }}
            alignItems={"stretch"}
          >
            <CartSummary onQuantityChange={handleQuantityChange} />
            <Box>
              <Flex justify="flex-end" alignContent={"flex-end"} gap={4}>
                {/* <Button
                  variant={"ghost"}
                  height={{ base: "10px", lg: "40px" }}
                  width={"fit-content"}
                  borderRadius={"8px"}
                  bg="#FF6996"
                  color="white"
                  _hover={{ bg: "#FF4F82" }}
                  rounded="full"
                  px={6}
                  onClick={() => {
                    router.push(ROUTES.APP.PRODUCTS);
                  }}
                >
                  Continue Shopping
                </Button> */}

                <Tooltip
                  content={
                    quantityChanged
                      ? "Please apply your change to proceed to checkout"
                      : " "
                  }
                  showArrow={quantityChanged ? true : false}
                  disabled={!quantityChanged}
                  positioning={{ placement: "top" }}
                  contentProps={{ css: { "--tooltip-bg": "#FF6996" } }}
                >
                  <Button
                    variant={"ghost"}
                    height={{ base: "10px", lg: "40px" }}
                    width={"fit-content"}
                    borderRadius={"8px"}
                    bg="#FF6996"
                    color="white"
                    _hover={{ bg: "#FF4F82" }}
                    rounded="full"
                    style={{
                      cursor: quantityChanged ? "not-allowed" : "pointer",
                    }}
                    px={6}
                    onClick={() => router.push(ROUTES.APP.CHECKOUT)}
                  >
                    Proceed to Checkout <BsArrowRight />
                  </Button>
                </Tooltip>
              </Flex>
            </Box>
            {/* <Summary disabled={quantityChanged} /> */}
          </Flex>
        ) : (
          <EmptyState />
        )}
      </Box>
    </>
  );
};

export default Cart;
