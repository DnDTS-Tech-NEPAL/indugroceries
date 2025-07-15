import { Text, Flex, Box } from "@chakra-ui/react";
import React from "react";

interface BenefitItemProps {
  icon: () => React.ReactElement;
  title: string;
  subtitle: string;
}

export const BenefitItem = ({ icon, title, subtitle }: BenefitItemProps) => (
  <Flex
    gap={4}
    align="flex-start"
    p={3}
    borderRadius="md"
    _hover={{
      bg: "gray.50",
      transform: "translateY(-2px)",
      transition: "all 0.2s",
    }}
  >
    <Box mt={1}>{icon()}</Box>
    <Box textAlign="left">
      <Text fontWeight="semibold" fontSize={["sm", "md"]} color="gray.800">
        {title}
      </Text>
      <Text fontSize={["xs", "sm"]} color="gray.500" lineHeight="tight">
        {subtitle}
      </Text>
    </Box>
  </Flex>
);
