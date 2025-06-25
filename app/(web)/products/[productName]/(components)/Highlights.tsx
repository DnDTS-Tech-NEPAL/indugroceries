"use client";

import { Pickup, ProductDelivery } from "@/assets/svg";
import { Flex, Icon, Text, VStack } from "@chakra-ui/react";

export const Highlights = () => {
  const items = [
    {
      icon: Pickup,
      text: `Pickup available at Beautymandu usually ready in 24 hours. View store information`,
    },
    {
      icon: ProductDelivery,
      text: "Express delivery available, get it by tomorrow with express delivery.",
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
      bg="linear-gradient(to right, #FFC1D4, #FFECF2)"
      borderRadius={"md"}
      px={2}
      py={6}
    >
      {items.map((item, index) => (
        <Flex key={index} align="center" gap={3}>
          <Icon as={item.icon} boxSize={6} color={"#2E2E2E"} />
          <Text fontSize={"14px"}>{item.text}</Text>
        </Flex>
      ))}
    </VStack>
  );
};
