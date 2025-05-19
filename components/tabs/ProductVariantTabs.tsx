"use client";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useVariantStore } from "@/store";
import { ProductVariantTabsProps } from "@/types";
import { useEffect, useState, useMemo } from "react";

export const ProductVariantTabs = ({ variants }: ProductVariantTabsProps) => {
  const { activeVariant, updateVariant } = useVariantStore();

  // Dynamically detect all available attributes from variants
  const allAttributes = useMemo(() => {
    const attributes = new Set<string>();
    variants?.forEach((variant) => {
      variant.attributes?.forEach((attr) => {
        attributes.add(attr.attribute);
      });
    });
    return Array.from(attributes);
  }, [variants]);

  // State for selected values of each attribute
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  // Get all possible values for each attribute
  const attributeValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    allAttributes.forEach((attr) => {
      values[attr] = Array.from(
        new Set(
          variants
            ?.map(
              (v) =>
                v.attributes?.find((a) => a.attribute === attr)?.attribute_value
            )
            .filter(Boolean) as string[]
        )
      );
    });
    return values;
  }, [allAttributes, variants]);

  // Get available values for each attribute based on current selections
  const getAvailableValues = (attribute: string) => {
    // Filter variants that match all currently selected attributes (except the current one)
    const matchingVariants = variants?.filter((variant) => {
      return Object.entries(selectedValues)
        .filter(([key]) => key !== attribute)
        .every(([key, value]) =>
          variant.attributes?.some(
            (attr) => attr.attribute === key && attr.attribute_value === value
          )
        );
    });

    // Extract available values for the requested attribute
    return Array.from(
      new Set(
        matchingVariants
          ?.map(
            (v) =>
              v.attributes?.find((a) => a.attribute === attribute)
                ?.attribute_value
          )
          .filter(Boolean) as string[]
      )
    );
  };

  // Update selected variant when selections change
  useEffect(() => {
    if (
      allAttributes.length > 0 &&
      Object.keys(selectedValues).length === allAttributes.length
    ) {
      const matchingVariant = variants?.find((variant) =>
        allAttributes.every((attr) =>
          variant.attributes?.some(
            (a) =>
              a.attribute === attr && a.attribute_value === selectedValues[attr]
          )
        )
      );
      if (matchingVariant) {
        updateVariant(matchingVariant.item_code);
      }
    }
  }, [selectedValues, variants, updateVariant, allAttributes]);

  // Initialize with first available values
  useEffect(() => {
    if (allAttributes.length > 0 && Object.keys(selectedValues).length === 0) {
      const initialValues: Record<string, string> = {};
      allAttributes.forEach((attr) => {
        if (attributeValues[attr]?.length > 0) {
          initialValues[attr] = attributeValues[attr][0];
        }
      });
      setSelectedValues(initialValues);
    }
  }, [allAttributes, attributeValues]);

  const handleAttributeChange = (attribute: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  return (
    <>
      <VStack
        flexDirection={["column", "row"]}
        align="flex-start"
        gap={4}
        w="full"
      >
        {allAttributes.map((attribute) => (
          <Box key={attribute} w="full">
            <Text variant="subtitle1" color="system.text.normal.light" mb={2}>
              Choose {attribute}
            </Text>
            <Box
              border="1px solid #CBD5E0"
              borderRadius="md"
              overflow="hidden"
              bg="white"
            >
              <select
                value={selectedValues[attribute] || ""}
                onChange={(e) =>
                  handleAttributeChange(attribute, e.target.value)
                }
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
                {getAvailableValues(attribute).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Box>
          </Box>
        ))}
      </VStack>
      <VStack align="flex-start" gap={4} w="full">
        {activeVariant && (
          <Box mt={4}>
            {variants
              ?.find((v) => v.item_code === activeVariant)
              ?.attributes?.map((attr, idx) => (
                <Box key={idx} display="flex" gap={4} mt={2}>
                  <Text fontWeight="medium" minW="80px">
                    {attr.attribute}:
                  </Text>
                  <Text color="gray.600">{attr.attribute_value}</Text>
                </Box>
              ))}
          </Box>
        )}
      </VStack>
    </>
  );
};
