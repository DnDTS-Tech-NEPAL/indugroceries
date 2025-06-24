"use client";

import { Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export const Highlights = () => {
  const items = [
    // {
    //   icon: FaTruck,
    //   text: "Free Delivery, Free Returns within Kathmandu valley, Nepal",
    // },
    {
      icon: FaCheck,
      text: `Pickup available at Beautymandu usually ready in 24 hours. View store information`,
    },
    // {
    //   icon: FaExchangeAlt,
    //   text: "Secure transactions with hassle-free 7-day exchange and returns",
    // },
    // {
    //   icon: FaPercentage,
    //   text: "Save 5% on all online payments under $500",
    // },
  ];

  return (
    <VStack
      mt={5}
      align="start"
      gap={4}
      color={"#2E2E2E"}
      borderY={"1px solid #E6E6E6"}
      py={6}
    >
      {items.map((item, index) => (
        <Flex key={index} align="center" gap={3}>
          <Icon as={item.icon} boxSize={4} color={"#00C843"} />
          <Text fontSize={"14px"}>{item.text}</Text>
        </Flex>
      ))}
    </VStack>
  );
};
