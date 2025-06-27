import { HStack, Text, VStack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components";
import * as RadioGroup from "@radix-ui/react-radio-group";

const deliveryOptions = [
  {
    label: "Free Shipping",
    description: "24-48 hours",
    value: "free",
    price: 0,
  },
  {
    label: "Express Shipping",
    description: "3-5 hours",
    value: "express",
    price: 100,
  },
];

interface DeliveryMethodProps {
  deliveryMethod: string;
  setDeliveryMethod: (value: string) => void;
}

const DeliveryMethod = ({
  deliveryMethod,
  setDeliveryMethod,
}: DeliveryMethodProps) => {
  return (
    <AccordionRoot
      collapsible
      as={VStack}
      alignItems="stretch"
      borderTop="1px solid #D0D0D0"
      pt={10}
    >
      <AccordionItem value="Delivery Method" border="none">
        <AccordionItemTrigger hasAccordionIcon isOpen>
          <Text fontSize="xl" fontWeight={500}>
            Delivery Method
          </Text>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <RadioGroup.Root
            value={deliveryMethod}
            onValueChange={setDeliveryMethod}
            style={{ width: "100%" }}
          >
            <HStack gap={3} pt={4}>
              {deliveryOptions.map((item) => (
                <RadioGroup.Item
                  key={item.value}
                  value={item.value}
                  style={{
                    border: "2px solid",
                    borderColor:
                      deliveryMethod === item.value ? "#D89CA2" : "#E2E8F0",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor:
                      deliveryMethod === item.value ? "#FFFDFD" : "white",
                    gap: "8px",
                  }}
                >
                  {/* Radio indicator at start */}
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border:
                        deliveryMethod === item.value
                          ? "4px solid #D89CA2"
                          : "2px solid #CBD5E0",
                      flexShrink: 0,
                    }}
                  />

                  {/* Label and description - tightly packed */}
                  <VStack align="flex-start" gap={0} flex={1} ml={2}>
                    <Text fontWeight="medium" fontSize="sm">
                      {item.label}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {item.description}
                    </Text>
                  </VStack>

                  {/* Price at end */}
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    whiteSpace="nowrap"
                    ml={2}
                  >
                    Rs {item.price}
                  </Text>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};

export default DeliveryMethod;
