"use client";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { FaShippingFast, FaCreditCard, FaGift, FaHeadset } from "react-icons/fa";
import { BenefitItem } from "./BenefitItem";

const benefits = [
  {
    icon: FaShippingFast,
    title: "Free Shipping",
    subtitle: "On order above $35",
  },
  {
    icon: FaCreditCard,
    title: "Secured Payment",
    subtitle: "Online support always",
  },
  {
    icon: FaGift,
    title: "Gift Card",
    subtitle: "Get a gift voucher",
  },
  {
    icon: FaHeadset,
    title: "24/7 Online Support",
    subtitle: "Online support ready",
  },
];

export const BenefitsSection = () => (
  <Box maxW={"6xl"} mx={"auto"} my={[8, 12]}>
    <SimpleGrid 
      columns={{ base: 1, sm: 2, lg: 4 }} 
      gap={[6, 8, 10]}
      px={[2, 4, 6]}
    >
      {benefits.map((item, index) => (
        <BenefitItem
          key={index}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}
    </SimpleGrid>
  </Box>
);