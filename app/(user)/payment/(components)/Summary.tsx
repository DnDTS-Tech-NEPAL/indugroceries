import { Box, Flex, Heading, Separator, Text, VStack } from "@chakra-ui/react";
// import { CloseCircleIcon, DiscountIcon } from "@/assets/svg";
// import { useColors } from "@/config";
import { useOrderMutation } from "@/hooks/api";
import { useSummary } from "@/hooks/app";
import { useItemStore } from "@/store";
import { Button } from "@/components";
import { SummaryProps } from "@/types";

export const Summary = ({ selectedPaymentMethod }: SummaryProps) => {
  // const { THEME_COLORS } = useColors();
  const { summaryItems, total } = useSummary();
  const { items } = useItemStore();

  const { mutate: postOrder, isPending: isProceedPending } = useOrderMutation(
    selectedPaymentMethod
  );

  const handleProceed = async () => {
    const formattedItems = items.map(({ title, quantity, price }) => ({
      item_code: title,
      qty: quantity,
      rate: Number(price),
    }));

    postOrder({ items: formattedItems });
  };

  return (
    <>
      <Box
        w={{
          base: "full",
          lg: "420px",
        }}
        mt={["20px", "20px", "50px"]}
        position="relative"
        flexShrink={0}
        border={"1px solid"}
        borderColor={"primary.100"}
        borderRadius={"24px"}
        p={"24px"}
      >
        <Heading variant="heading5" mb={4}>
          Summary
        </Heading>

        {/* <Box
          border={"1px solid"}
          borderColor={"primary.100"}
          p={"16px"}
          borderRadius={"8px"}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={3}>
            <DiscountIcon />
            <Box>
              <Text
                variant="paragraphSmall"
                fontWeight={600}
                color={"primary.400"}
              >
                Promo applied
              </Text>
              <Text variant="paragraphSmall" color={"primary.300"}>
                1x shipping discount used
              </Text>
            </Box>
          </Flex>
          <CloseCircleIcon
            stroke={THEME_COLORS.danger[100].value}
            color="white"
          />
        </Box> */}

        <VStack align="stretch" gap={4} mt={{ base: "24px", lg: "32px" }}>
          {summaryItems.map(({ label, value }, index) => (
            <Flex justify="space-between" key={index} width="full">
              <Text
                variant="subtitle2"
                color="system.neutral.separator.black.dark"
                fontWeight={500}
                fontSize={"16px"}
              >
                {label}
              </Text>
              <Text
                variant="subtitle1"
                fontWeight={400}
                color={label === "Discount" ? "#FF0000" : "primary.400"}
              >
                {value}
              </Text>
            </Flex>
          ))}

          <Separator my={2} />

          <Flex justify="space-between" width="full">
            <Text
              variant="subtitle2"
              color="system.neutral.separator.black.dark"
              fontWeight={500}
            >
              Total
            </Text>
            <Text variant="subtitle1" fontWeight={400} color="primary.400">
              {total}
            </Text>
          </Flex>
        </VStack>

        <Separator my={4} mb={6} />

        <Button variant={"outline"} w={"full"} mb={2}>
          Continue Shopping
        </Button>
        <Button
          w={"full"}
          mb={{ base: "8px", lg: 0 }}
          onClick={handleProceed}
          loading={isProceedPending}
        >
          Proceed
        </Button>
      </Box>
    </>
  );
};
