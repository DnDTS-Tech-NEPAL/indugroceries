"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Image,
  Badge,
  Flex,
  Grid,
  createListCollection,
  Select,
  Portal,
} from "@chakra-ui/react";

type Order = {
  id: string;
  total: string;
  quantity: number;
  status: string;
  date: string;
  image: string;
};
const orderStatusOptions = createListCollection({
  items: [
    { label: "All Orders", value: "all" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ],
});

export default function Orders({ orders }: { orders: Order[] }) {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg="white"
      rounded="lg"
      border="1px"
      borderColor={borderColor}
    >
      <Box mb={8}>
        <Text fontSize={"2xl"} fontWeight={"medium"} mb={8}>Orders ({orders.length} items)</Text>
        <HStack>
          <Text fontSize="sm" color={textColor}>
            Show :
          </Text>
        <Select.Root
      collection={orderStatusOptions}
      size="sm"
      width="200px"
    >
      <Select.HiddenSelect />
      <Flex>
    
      <Select.Control>
        <Select.Trigger width={"140px"}>
          <Select.ValueText placeholder="Select Status"/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      </Flex>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {orderStatusOptions.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
        </HStack>
      </Box>

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
          <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="center">
            Quantity
          </Text>
          <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="center">
            Status
          </Text>
          <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="right">
            Date & Time
          </Text>
        </Grid>

        {orders.map((order, index) => (
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
                src={order.image}
                alt="Product"
                boxSize="60px"
                rounded="lg"
                border="1px"
                borderColor={borderColor}
              />
              <VStack align="start" gap={1}>
                <Text fontWeight="medium">{order.id}</Text>
                <Text fontSize="sm" color={textColor}>
                  Grand Total: {order.total}
                </Text>
              </VStack>
            </HStack>
            <Text textAlign="center">{order.quantity}</Text>
          <Flex justify="center">
  <Badge
    borderRadius="full"
    px={5}
    bg={order.status === "Delivered" ? "#EAFFF1" : "#FF0A0A0A"}
    color={order.status === "Delivered" ? "#09AD00" : "#FF0000"}
  >
    {order.status}
  </Badge>
</Flex>

            <Text fontSize="sm" color={textColor} textAlign="right">
              {order.date}
            </Text>
          </Grid>
        ))}
      </VStack>
    </Box>
  );
}
