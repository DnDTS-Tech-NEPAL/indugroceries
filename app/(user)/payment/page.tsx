"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react";

import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { PaymentMethod, Summary } from "./(components)";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("Cash On Delivery");

  // const handlePaymentMethodChange = (details: { value: string }) => {
  //   setSelectedPaymentMethod(details.value);
  // };
  const handlePaymentMethodChange = (details: { value: string | null }) => {
    if (details.value) {
      setSelectedPaymentMethod(details.value);
    }
  };

  return (
    <>
      <PageTitle
        backLabel="Back to Cart Summary"
        backLink={ROUTES.USER.CART}
        title="Checkout"
        breadcrumb={BREADCRUMB_CONFIG.PAYMENT}
      />

      <Flex
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        maxWidth={"1280px"}
        mx={"auto"}
        gap={{ md: "20px", lg: "40px", xl: "60px" }}
        alignItems={"stretch"}
        py={8}
        px={{
          base: "20px",
          lg: "40px",
        }}
      >
        <PaymentMethod
          selectedPaymentMethod={selectedPaymentMethod}
          handlePaymentMethodChange={handlePaymentMethodChange}
        />
        <Summary selectedPaymentMethod={selectedPaymentMethod} />
      </Flex>
    </>
  );
};

export default Payment;
