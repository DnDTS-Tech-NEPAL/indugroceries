import { Box, Flex, Grid, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components";

import { usePaymentMethods } from "@/hooks/app";
import { PaymentMethodProps } from "@/types";

export const PaymentMethod = ({
  selectedPaymentMethod,
  handlePaymentMethodChange,
}: PaymentMethodProps) => {
  const { items } = usePaymentMethods();

  return (
    <Box flex={1}>
      <Stack gap={2}>
        <Heading
          fontWeight={400}
          fontSize={{ base: "20px", lg: "24px", xl: "28px" }}
        >
          Payment Details
        </Heading>
        <Text variant={"paragraphSmall"} color={"primary.300"} mb={"16px"}>
          Please select payment method to confirm order.
        </Text>
      </Stack>
      <Box
        border={"1px solid"}
        borderColor={"primary.100"}
        borderRadius={"24px"}
        p={"24px"}
      >
        <Text mb={4} variant="subtitle1">
          Payment Method
        </Text>
        <RadioGroup
          value={selectedPaymentMethod}
          onValueChange={handlePaymentMethodChange}
        >
          <Grid templateColumns="repeat(1, 1fr)" gap={"24px"}>
            {items.map(({ value, description, icon }, index) => (
              <Radio
                key={value}
                value={value}
                borderBottom={index === items.length - 1 ? "none" : "1px solid"}
                borderBottomColor="primary.100"
                pb={index === items.length - 1 ? "0" : "24px"}
              >
                <Flex align="center" gap={4} flex={1}>
                  <Image mb="2" h="53.5px" w="128px" src={icon} alt={value} />
                  <Stack>
                    <Text variant={{ base: "subtitle2", lg: "subtitle1" }}>
                      {value}
                    </Text>
                    <Text
                      variant={{ base: "subtitle3", lg: "paragraphSmall" }}
                      color={"primary.300"}
                    >
                      {description}
                    </Text>
                  </Stack>
                </Flex>
              </Radio>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
    </Box>
  );
};
