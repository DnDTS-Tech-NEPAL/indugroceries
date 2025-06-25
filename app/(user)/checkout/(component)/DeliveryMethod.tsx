import { HStack, RadioGroup, Text, VStack } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,

} from "@/components";
import { useColorModeValue } from "@/components/ui/color-mode";

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

const DeliveryMethod = ({ deliveryMethod, setDeliveryMethod }: any) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const activeBorderColor = "#D89CA2";
  const activeBgColor = "#FFFDFD";

  const title = "Delivery Method";

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
          <RadioGroup.Root 
            value={deliveryMethod} 
            onValueChange={setDeliveryMethod}
          >
            <HStack gap={4} flexWrap="wrap" pt={4}>
              {deliveryOptions.map((item) => (
                <RadioGroup.Item 
                  key={item.value}
                  value={item.value}
                  style={{
                    border: "1px solid",
                    borderColor: deliveryMethod === item.value ? activeBorderColor : borderColor,
                    borderRadius: "8px",
                    background: deliveryMethod === item.value ? activeBgColor : bgColor,
                    padding: "16px",
                    flex: 1,
                    
                    cursor: "pointer",
                  }}
                >
                  <VStack align="start" gap={1}>
                    <Text fontWeight="medium" fontSize="md">
                      {item.label}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {item.description}
                    </Text>
                    <Text fontWeight="bold" fontSize="md">
                      Rs {item.price}
                    </Text>
                  </VStack>
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