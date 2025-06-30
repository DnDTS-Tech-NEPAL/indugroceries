"use client";

import { useState } from "react";
import {
  Container,
  Grid,
  GridItem,
  VStack,
  Box,
  Separator,
  HStack,
  Input,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";

import { Checkbox } from "@/components";
import ShippingInformation from "./ShippingInformation";
import DeliveryMethod from "./DeliveryMethod";
import PaymentInformation from "./PaymentInformation";
import RelatedProducts from "./RelatedProducts";
import SelectedProduct from "./SelectedProduct";
import { InputGroup } from "@/components/form/input/InputGroup";
import { FaTags } from "react-icons/fa";
import { useCartQuery } from "@/hooks/api";

const CheckoutSection = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("free");
  const { data: selectedProducts = [], isLoading } = useCartQuery();
  console.log("hello selected products", selectedProducts);

  const products = [
    {
      id: "1",
      name: "Dark Spot Glow Cream",
      image: "/placeholder.svg?height=80&width=80",
      originalPrice: 2500,
      discountedPrice: 2000,
      quantity: 1,
    },
    {
      id: "2",
      name: "CICA Houttuynia Tea Tree",
      image: "/placeholder.svg?height=80&width=80",
      originalPrice: 2000,
      discountedPrice: 1800,
      quantity: 1,
    },
    {
      id: "3",
      name: "Probio CICA Enrich Cream",
      image: "/placeholder.svg?height=80&width=80",
      originalPrice: 1200,
      discountedPrice: 900,
      quantity: 1,
    },
  ];

  // const selectedProducts = [
  //   {
  //     id: "4",
  //     name: "Radiant Glow Vitamin C",
  //     image: "/placeholder.svg?height=60&width=60",
  //     originalPrice: 3500,
  //     discountedPrice: 2000,
  //   },
  //   {
  //     id: "5",
  //     name: "Hydra Boost Serum",
  //     image: "/placeholder.svg?height=60&width=60",
  //     originalPrice: 3000,
  //     discountedPrice: 1800,
  //   },
  // ];

  const relatedProducts = [
    {
      id: "4",
      name: "Radiant Glow Vitamin C",
      image: "/placeholder.svg?height=60&width=60",
      originalPrice: 3500,
      discountedPrice: 2000,
    },
    {
      id: "5",
      name: "Hydra Boost Serum",
      image: "/placeholder.svg?height=60&width=60",
      originalPrice: 3000,
      discountedPrice: 1800,
    },
  ];

  const subtotal = products.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const shipping = deliveryMethod === "express" ? 100 : 0;
  const discountCode = 50;
  const membershipPoints = 50;
  const totalDiscount = 100;
  const total =
    subtotal + shipping - discountCode - membershipPoints - totalDiscount;

  return (
    <Container maxW="7xl" py={8} spaceY={6}>
      <Text
        fontSize={"2xl"}
        fontWeight={500}
        borderBottom={"1px solid #D0D0D0"}
        pb={10}
      >
        Check Out
      </Text>
      <Grid templateColumns={{ base: "1fr", lg: "60% 40%" }} gap={8}>
        {/* Left Side - Form Section  */}
        <GridItem>
          <VStack gap={8} align="stretch">
            <ShippingInformation />
            <DeliveryMethod
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
            />
            <PaymentInformation />
            {/* <RememberMeSection /> */}

            <Box borderTop="1px solid #D0D0D0" pt={10} spaceY={4}>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Please review order details and shipping address prior to
                submitting your purchase. Once an order has been placed we are
                unable to make changes or cancel. We appreciate your
                understanding!Please review your order details and shipping
                address before placing the order.
              </Text>
              <Button
                bg={"#FF6996"}
                colorScheme="pink"
                size="lg"
                borderRadius="full"
                px={8}
              >
                Place Order Now
              </Button>
              <Checkbox color={"#7A7A7A"} py={8} colorScheme="pink">
                Your info will be saved to a Shop account. By continuing, you
                agree to Shop&apos;s Terms of Service and acknowledge the
                Privacy Policy.
              </Checkbox>
            </Box>
          </VStack>
        </GridItem>

        {/* Right Side - Summary */}
        <GridItem>
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="lg"
            p={6}
            bg="white"
          >
            <VStack align="stretch" gap={6}>
              {isLoading ? (
                <Grid placeItems="center" height="300px">
                  <Spinner />
                </Grid>
              ) : (
                <SelectedProduct products={selectedProducts} />
              )}

              <InputGroup
                startElement={<FaTags color="#D0D0D0" size={20} />}
                endElement="Apply"
              >
                <Input
                  placeholder="Discount Code"
                  fontSize="sm"
                  _placeholder={{ color: "gray.400" }}
                  p={3}
                />
              </InputGroup>

              <VStack gap={2} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="sm">Subtotal</Text>
                  <Text fontSize="sm">Rs {subtotal}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Shipping</Text>
                  <Text fontSize="sm">Rs {shipping}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Discount Code</Text>
                  <Text fontSize="sm" color="pink.500">
                    -Rs {discountCode}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Membership Points</Text>
                  <Text fontSize="sm" color="pink.500">
                    -Rs {membershipPoints}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm">Discount</Text>
                  <Text fontSize="sm" color="pink.500">
                    -Rs {totalDiscount}
                  </Text>
                </HStack>
              </VStack>

              <Separator />

              <HStack justify="space-between">
                <Text fontWeight="medium">Total</Text>
                <Text fontWeight="medium" fontSize="lg">
                  Rs {total}
                </Text>
              </HStack>

              <RelatedProducts products={relatedProducts} />
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
export default CheckoutSection;
