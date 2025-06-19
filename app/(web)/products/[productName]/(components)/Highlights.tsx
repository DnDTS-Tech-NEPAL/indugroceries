"use client";

import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FaTruck, FaCheck, FaExchangeAlt, FaPercentage } from "react-icons/fa";

export const Highlights = () => {
  const items = [
    {
      icon: FaTruck,
      text: "Free Delivery, Free Returns within Kathmandu valley, Nepal",
    },
    {
      icon: FaCheck,
      text: "COD available for orders below $500",
    },
    {
      icon: FaExchangeAlt,
      text: "Secure transactions with hassle-free 7-day exchange and returns",
    },
    {
      icon: FaPercentage,
      text: "Save 5% on all online payments under $500",
    },
  ];

  return (
    <VStack
      mt={5}
      align="start"
      gap={4}
      color={"#2E2E2E"}
      borderTop={"1px solid #E6E6E6"}
      pt={6}
    >
      {items.map((item, index) => (
        <Flex key={index} align="center" gap={3}>
          <Icon as={item.icon} boxSize={5} />
          <Text>{item.text}</Text>
        </Flex>
      ))}
    </VStack>
  );
};
