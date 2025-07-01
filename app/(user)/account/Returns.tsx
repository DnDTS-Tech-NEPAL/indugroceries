"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  VStack,
  Grid,
  Text,
  HStack,
  Image,
  Badge,
  Flex,
} from "@chakra-ui/react";

type ReturnItem = {
  name: string;
  price: string;
  quantity: number;
  status: string;
  date: string;
  image: string;
};

export default function Returns({ returns }: { returns: ReturnItem[] }) {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg="white" rounded="lg" border="1px" borderColor={borderColor}>
      <Text fontSize={"2xl"} fontWeight={"medium"} mb={8}>
        Returns & Cancellations ({returns.length} items)
      </Text>

      <VStack gap={6} align="stretch">
        <Grid
          templateColumns="5fr 2fr 2fr 3fr"
          gap={4}
          pb={4}
          borderBottom="1px"
          borderColor={borderColor}
        >
          <Text fontSize="sm" fontWeight="medium" color={textColor}>
            Items
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={textColor}
            textAlign="center"
          >
            Quantity
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={textColor}
            textAlign="center"
          >
            Status
          </Text>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={textColor}
            textAlign="right"
          >
            Date & Time
          </Text>
        </Grid>

        {returns.map((item, index) => (
          <Grid
            key={index}
            templateColumns="5fr 2fr 2fr 3fr"
            gap={4}
            py={4}
            borderBottom="1px"
            borderColor={borderColor}
            _last={{ borderBottom: "none" }}
          >
            <HStack>
              <Image
                src={item.image}
                alt="Product"
                boxSize="60px"
                rounded="lg"
                border="1px"
                borderColor={borderColor}
              />
              <VStack align="start" gap={1}>
                <Text fontWeight="medium">{item.name}</Text>
                <Text fontSize="sm" color={textColor}>
                  {item.price}
                </Text>
              </VStack>
            </HStack>
            <Text textAlign="center">{item.quantity}</Text>
            <Flex justify="center">
              <Badge borderRadius="full" px={5} bg="#2C8FFF1A" color="#0077FF">
                {item.status}
              </Badge>
            </Flex>
            <Text fontSize="sm" color={textColor} textAlign="right">
              {item.date}
            </Text>
          </Grid>
        ))}
      </VStack>
    </Box>
  );
}
