import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";

import { useVariantStore } from "@/store";
import { ProductVariantTabsProps } from "@/types";

import { Tag } from "../ui";

export const ProductVariantTabs = ({ variants }: ProductVariantTabsProps) => {
  const { activeVariant, updateVariant } = useVariantStore();

  const attributes = variants?.find(
    (variant) => variant.item_code === activeVariant
  )?.attributes;

  return (
    <VStack align={"flex-start"}>
      <HStack gap="12px">
        {variants?.map((variant, index) => {
          const variantCode = variant.item_code;
          return (
            <Tag
              key={index}
              name={variant.item_name}
              backgroundColor={
                variantCode === activeVariant ? "gray.200" : undefined
              }
              onClick={() => updateVariant(variant.item_code)}
            />
          );
        })}
      </HStack>

      {activeVariant && (
        <Stack gap={1}>
          {Array.isArray(attributes) &&
            attributes.map((attribute, index) => (
              <Box key={index}>
                <HStack gap={8}>
                  <Text fontSize={"14px"} width={"64px"} fontWeight="bold">
                    {attribute.attribute}
                  </Text>
                  <Text fontSize={"13px"}>{attribute.attribute_value}</Text>
                </HStack>
              </Box>
            ))}
        </Stack>
      )}
    </VStack>
  );
};
