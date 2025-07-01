"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  GridItem,
  VStack,
  Box,
  Separator,
  Input,
  Button,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";

import { Checkbox, FormProvider } from "@/components";
import ShippingInformation from "./ShippingInformation";
import DeliveryMethod from "./DeliveryMethod";
import PaymentInformation from "./PaymentInformation";
import SelectedProduct from "./SelectedProduct";
import { FaTags } from "react-icons/fa";
import { useAddPromo, useCartQuery } from "@/hooks/api";
import { useSummary } from "@/hooks/app";
import { usePromoFormStore, usePromoStore } from "@/store";
import { PromoFormData } from "@/types";
import { useForm } from "react-hook-form";
import { InputGroup } from "@/components/form/input/InputGroup";

const CheckoutSection = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("free");
  const { data: selectedProducts = [], isLoading } = useCartQuery();
  const methods = useForm<PromoFormData>();
  const { summaryItems, total } = useSummary();
  const { mutate: applyPromo } = useAddPromo();
  const { setPromoData, promoData } = usePromoStore();
  const {
    resetFlag,
    clearResetFlag,
    deliveryLocation,
    setPromoCode,
    setDeliveryLocation,
  } = usePromoFormStore();
  const promoCode = methods.watch("promoCode");

  useEffect(() => {
    if (!promoData) {
      applyPromo(
        {
          coupon: "",
          delivery_place: deliveryLocation,
          loyalty_points: 0,
        },
        {
          onSuccess: (response) => {
            setPromoData(response.data.data);
          },
        }
      );
    }
  }, [promoCode, promoData]);
  const onSubmit = (data: PromoFormData) => {
    const promo = data.promoCode?.trim() || "";

    setPromoCode(promo);

    applyPromo(
      {
        coupon: promo,
        delivery_place: deliveryLocation,
        loyalty_points: 0,
      },
      {
        onSuccess: (response) => {
          setPromoData(response.data.data);
        },
      }
    );
  };

  useEffect(() => {
    if (resetFlag) {
      methods.reset({
        promoCode: "",
        deliveryLocation: "",
      });

      setPromoCode("");
      setDeliveryLocation("");
      clearResetFlag();
    }
  }, [resetFlag]);
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

              <FormProvider methods={methods} onSubmit={onSubmit}>
                <InputGroup
                  startElement={<FaTags color="#D0D0D0" size={20} />}
                  endElement={
                    <Button
                      type="submit"
                      size="xs"
                      bg={"transparent"}
                      position={"absolute"}
                      right={"1rem"}
                      color={"#D0D0D0"}
                      me="-2"
                      zIndex={5}
                    >
                      Apply
                    </Button>
                  }
                >
                  <Input
                    {...methods.register("promoCode")}
                    placeholder="Discount Code"
                    fontSize="sm"
                    _placeholder={{ color: "gray.400" }}
                    p={3}
                  />
                </InputGroup>
              </FormProvider>
              {/* <VStack gap={2} align="stretch">
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
              </VStack> */}
              <VStack align="stretch" gap={4} mt={{ base: "24px", lg: "32px" }}>
                {summaryItems.map(({ label, value }, index) => (
                  <Flex justify="space-between" key={index} width="full">
                    <Text
                      variant="subtitle1"
                      color="system.neutral.separator.black.dark"
                      fontWeight={500}
                      fontSize={"14px"}
                    >
                      {label}
                    </Text>
                    <Text
                      variant="subtitle1"
                      fontWeight={400}
                      color={"primary.400"}
                    >
                      {value}
                    </Text>
                  </Flex>
                ))}

                <Separator my={2} />

                <Flex justify="space-between" width="full">
                  <Text
                    variant="subtitle2"
                    color="system.neutral.separator.black.dark"
                    fontWeight={500}
                  >
                    Total
                  </Text>
                  <Text
                    variant="subtitle1"
                    fontWeight={400}
                    color="primary.400"
                  >
                    {total}
                  </Text>
                </Flex>
              </VStack>
              <Separator />
              {/* <RelatedProducts products={relatedProducts} /> */}
              <Input
                placeholder="Add Special Note in your order"
                textAlign="center"
                h={20}
              />
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
export default CheckoutSection;
