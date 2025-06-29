"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Text, HStack, Input, VStack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components";
import { useState } from "react";
import { CashOnDelivery, Esewa, ImePay, Khalti } from "@/assets/image";
import Image from "next/image";

const paymentMethods = [
  {
    id: "esewa",
    name: "eSewa",
    image: Esewa,
    fields: [
      { label: "eSewa Id", placeholder: "eSewa Id", type: "text" },
      { label: "Password", placeholder: "Password", type: "password" },
      { label: "OTP", placeholder: "OTP", type: "text" },
    ],
  },
  {
    id: "khalti",
    name: "Khalti",
    image: Khalti,
    fields: [
      { label: "Khalti ID", placeholder: "Khalti ID", type: "text" },
      { label: "MPIN", placeholder: "MPIN", type: "password" },
    ],
  },
  {
    id: "imepay",
    name: "IME Pay",
    image: ImePay,
    fields: [
      { label: "IME Pay ID", placeholder: "IME Pay ID", type: "text" },
      { label: "Password", placeholder: "Password", type: "password" },
    ],
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    image: CashOnDelivery,
    fields: [],
  },
];

export default function PaymentInformation() {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const activeBorderColor = "#D89CA2";
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const title = "Payment Information";

  const currentMethod = paymentMethods.find(
    (method) => method.id === selectedMethod
  );

  return (
    <AccordionRoot
      collapsible
      as={VStack}
      alignItems="stretch"
      defaultValue={[title]}
      borderTop={"1px solid #D0D0D0"}
      pt={10}
    >
      <AccordionItem value={title} border="none">
        <AccordionItemTrigger hasAccordionIcon isOpen>
          <Text fontSize="xl" fontWeight={500}>
            {title}
          </Text>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <VStack align="start" gap={4} mt={4}>
            <Text fontSize="sm" color="gray.600">
              Choose payment method
            </Text>

            <HStack gap={4} flexWrap="wrap" width={"full"}>
              {paymentMethods.map((method) => (
                <Box
                  key={method.id}
                  border="2px"
                  borderColor={
                    selectedMethod === method.id
                      ? activeBorderColor
                      : borderColor
                  }
                  borderRadius="md"
                  p={4}
                  cursor="pointer"
                  onClick={() => setSelectedMethod(method.id)}
                  _hover={{ borderColor: activeBorderColor }}
                  flex={1}
                  minW="150px"
                  transition="border-color 0.2s ease"
                >
                  <Image
                    src={method.image}
                    alt={method.name}
                    width={150}
                    height={40}
                    style={{
                      opacity: selectedMethod === method.id ? 1 : 0.8,
                      border:
                        selectedMethod === method.id ? "2px solid #D89CA2" : "",
                      transition: "opacity 0.2s ease",
                    }}
                  />
                </Box>
              ))}
            </HStack>

            {selectedMethod &&
              currentMethod &&
              currentMethod.fields.length > 0 && (
                <HStack gap={4} width="full" flexWrap="wrap" mt={4}>
                  {currentMethod.fields.map((field, index) => (
                    <FormControl key={index} flex={1} minW="200px">
                      <FormLabel fontSize="sm" color="gray.600">
                        {field.label}
                      </FormLabel>
                      <Input
                        placeholder={field.placeholder}
                        type={field.type}
                      />
                    </FormControl>
                  ))}
                </HStack>
              )}
          </VStack>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
