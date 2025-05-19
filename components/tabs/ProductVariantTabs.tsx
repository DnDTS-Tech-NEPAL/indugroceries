"use client";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useVariantStore } from "@/store";
import { ProductVariantTabsProps } from "@/types";
import { useEffect } from "react";

export const ProductVariantTabs = ({ variants }: ProductVariantTabsProps) => {
  const { activeVariant, updateVariant } = useVariantStore();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateVariant(e.target.value);
  };
  // Find the lowest priced variant
  const getLowestPricedVariant = () => {
    if (!variants || variants.length === 0) return null;

    return variants.reduce((lowest, current) => {
      const currentPrice = current.prices?.[0]?.price_list_rate;
      const lowestPrice = lowest.prices?.[0]?.price_list_rate;
      return currentPrice < lowestPrice ? current : lowest;
    });
  };

  // Initialize with lowest priced variant if none is selected
  useEffect(() => {
    if (variants?.length > 0 && !activeVariant) {
      const lowestPriced = getLowestPricedVariant();
      if (lowestPriced) {
        updateVariant(lowestPriced.item_code);
      }
    }
  }, [variants, activeVariant, updateVariant]);
  const attributes = variants?.find(
    (variant) => variant.item_code === activeVariant
  )?.attributes;

  return (
    <VStack align="flex-start" gap={4}>
      <Box w="full">
        <Box
          border="1px solid #CBD5E0"
          borderRadius="md"
          overflow="hidden"
          bg="white"
        >
          <select
            id="variant-select"
            value={activeVariant}
            onChange={handleChange}
            style={{
              padding: "10px",
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {variants?.map((variant) => (
              <option key={variant.item_code} value={variant.item_code}>
                {variant.item_name}
              </option>
            ))}
          </select>
        </Box>
      </Box>

      {activeVariant && Array.isArray(attributes) && (
        <Box>
          {attributes.map((attr, idx) => (
            <Box key={idx} display="flex" gap={4} mt={2}>
              <Text fontWeight="medium" minW="80px">
                {attr.attribute}
              </Text>
              <Text color="gray.600">{attr.attribute_value}</Text>
            </Box>
          ))}
        </Box>
      )}
    </VStack>
  );
};
