"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  GridItem,
  VStack,
  Box,
  Input,
  Button,
  Text,
  Spinner,
  Flex,
  HStack,
  Icon,
  Separator,
} from "@chakra-ui/react";

import { Checkbox, FormProvider, toaster } from "@/components";
import ShippingInformation from "./ShippingInformation";
import PaymentInformation from "./PaymentInformation";
import SelectedProduct from "./SelectedProduct";
import { FaCrown, FaTags } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useAddPromo, useCartQuery, useUserProfileQuery } from "@/hooks/api";
import { useSummary } from "@/hooks/app";
import { usePromoFormStore, usePromoStore } from "@/store";
import { PromoFormData } from "@/types";
import { useForm } from "react-hook-form";
import { InputGroup } from "@/components/form/input/InputGroup";
import { DeliveryNote } from "./DeliveryNote";

const CheckoutSection = () => {
  const [deliveryNote, setDeliveryNote] = useState<string>("");

  const { data: profileData } = useUserProfileQuery();
  const totalPoints = profileData?.data?.[0]?.total_points || 0;

  const { data: selectedProducts = [], isLoading } = useCartQuery();
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

  const methods = useForm<PromoFormData>({
    defaultValues: {
      promoCode: "",
      LoyaltyPoints: 0,
      deliveryLocation: "",
    },
  });

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
    const loyaltyPoints = data.LoyaltyPoints || 0;

    setPromoCode(promo);

    applyPromo(
      {
        coupon: promo,
        delivery_place: deliveryLocation,
        loyalty_points: loyaltyPoints,
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
        LoyaltyPoints: 0,
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
        {/* Left Side - Form Section */}
        <GridItem>
          <VStack gap={8} align="stretch">
            <ShippingInformation />
            {/* <DeliveryMethod
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
            /> */}
            <PaymentInformation />
            {/* <RememberMeSection /> */}
            <Box borderTop="1px solid #D0D0D0" pt={10} spaceY={4}>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Please review order details and shipping address prior to
                submitting your purchase. Once an order has been placed we are
                unable to make changes or cancel. We appreciate your
                understanding!
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
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <VStack align="stretch" gap={6}>
                {isLoading ? (
                  <Grid placeItems="center" height="300px">
                    <Spinner />
                  </Grid>
                ) : (
                  <SelectedProduct products={selectedProducts} />
                )}

                {/* Membership Program & Loyalty Points Display */}
                <VStack align="start" gap={4}>
                  <HStack gap={1}>
                    <Icon color="yellow.500" boxSize={6}>
                      <FaCrown />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Membership Program :
                    </Text>
                    <Text fontWeight="bold" color="yellow.600">
                      {profileData?.data?.[0]?.custom_membership_program ||
                        "Standard"}
                    </Text>
                  </HStack>

                  <HStack gap={1}>
                    <Icon color="pink.500" boxSize={7}>
                      <RiVerifiedBadgeFill />
                    </Icon>
                    <Text fontWeight="medium" color="gray.700">
                      Loyalty Points:
                    </Text>
                    <Text fontWeight="bold" color="pink.500">
                      {totalPoints}
                    </Text>
                  </HStack>
                </VStack>

                {/* Discount Code */}
                <InputGroup
                  startElement={<FaTags color="#D0D0D0" size={20} />}
                  endElement={
                    <Button
                      size="xs"
                      bg={"transparent"}
                      position={"absolute"}
                      right={"1rem"}
                      color={"black"}
                      me="-2"
                      zIndex={5}
                      onClick={methods.handleSubmit((data) => {
                        const promo = data.promoCode?.trim() || "";
                        const loyaltyPoints = data.LoyaltyPoints || 0;
                        setPromoCode(promo);

                        applyPromo(
                          {
                            coupon: promo,
                            delivery_place: deliveryLocation,
                            loyalty_points: loyaltyPoints,
                          },
                          {
                            onSuccess: (response) => {
                              setPromoData(response.data.data);
                            },
                          }
                        );
                      })}
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

                {/* Loyalty Points Section */}
                <Box
                  w="full"
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="gray.50"
                >
                  <Text fontWeight="medium" mb={2}>
                    Redeem Loyalty Points
                  </Text>
                  <HStack>
                    <Input
                      {...methods.register("LoyaltyPoints", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="Enter points to redeem"
                      size="sm"
                      borderRadius="md"
                      bg="white"
                      w="200px"
                    />
                    <Button
                      mt={0}
                      bgColor={"#FF6996"}
                      colorScheme="pink"
                      px={5}
                      borderRadius={"md"}
                      onClick={methods.handleSubmit((data) => {
                        const loyaltyPoints = data.LoyaltyPoints || 0;
                        if (loyaltyPoints > totalPoints) {
                          toaster.create({
                            title: "You don't have that many loyalty points.",
                            duration: 3000,
                            type: "error",
                          });
                          return;
                        }

                        const promo = data.promoCode?.trim() || "";

                        applyPromo(
                          {
                            coupon: promo,
                            delivery_place: deliveryLocation,
                            loyalty_points: loyaltyPoints,
                          },
                          {
                            onSuccess: (response) => {
                              setPromoData(response.data.data);
                            },
                          }
                        );
                      })}
                    >
                      Apply Points
                    </Button>
                  </HStack>
                </Box>

                {/* Summary Section */}
                <VStack
                  align="stretch"
                  gap={4}
                  mt={{ base: "24px", lg: "32px" }}
                >
                  {summaryItems.map(({ label, value }, index) => (
                    <Flex justify="space-between" key={index} width="full">
                      <Text fontWeight={500} fontSize={"14px"}>
                        {label}
                      </Text>
                      <Text fontWeight={400} color={"primary.400"}>
                        {value}
                      </Text>
                    </Flex>
                  ))}

                  <Separator my={2} />

                  <Flex justify="space-between" width="full">
                    <Text fontWeight={500}>Total</Text>
                    <Text fontWeight={400} color="primary.400">
                      {total}
                    </Text>
                  </Flex>
                </VStack>

                <Separator />
                {/* <Input
                  placeholder="Add Special Note in your order"
                  textAlign="center"
                  h={20}
                /> */}
                <DeliveryNote deliveryNote={deliveryNote} setDeliveryNote={setDeliveryNote} />
              </VStack>
            </FormProvider>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default CheckoutSection;
