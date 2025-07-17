"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react";

import { PageTitle } from "@/components";
import { BREADCRUMB_CONFIG } from "@/config";
import { ROUTES } from "@/constants";

import { PaymentMethod, Summary } from "./(components)";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * This component renders the payment method selection and
 * summary page.
 *
 * State:
 * - selectedPaymentMethod: The selected payment method.
 * - deliveryNote: The delivery note entered by the user.
 *
 * Props:
 * - selectedPaymentMethod: The selected payment method.
 * - handlePaymentMethodChange: A function to handle
 *   payment method change.
 * - setDeliveryNote: A function to set the delivery note.
 *
 * @returns {JSX.Element} The rendered component.
 */
/*******  21013334-966f-488f-be9d-038916905265  *******/
const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("Cash On Delivery");
  const [deliveryNote, setDeliveryNote] = useState<string>("");

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
          setDeliveryNote={setDeliveryNote}
        />
        <Summary
          selectedPaymentMethod={selectedPaymentMethod}
          delivery_note={deliveryNote}
        />
      </Flex>
    </>
  );
};

export default Payment;
