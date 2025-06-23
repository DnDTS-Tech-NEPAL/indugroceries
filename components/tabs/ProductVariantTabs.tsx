// "use client";
// import { Box, VStack, Text } from "@chakra-ui/react";
// import { useVariantStore } from "@/store";
// import { ProductVariantTabsProps } from "@/types";
// import { useEffect, useState, useMemo } from "react";

// export const ProductVariantTabs = ({ variants }: ProductVariantTabsProps) => {
//   const { activeVariant, updateVariant } = useVariantStore();

//   // Dynamically detect all available attributes from variants
//   const allAttributes = useMemo(() => {
//     const attributes = new Set<string>();
//     variants?.forEach((variant) => {
//       variant.attributes?.forEach((attr) => {
//         attributes.add(attr.attribute);
//       });
//     });
//     return Array.from(attributes);
//   }, [variants]);

//   // State for selected values of each attribute
//   const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
//     {}
//   );

//   // Find the cheapest variant
//   const getCheapestVariant = useMemo(() => {
//     if (!variants || variants.length === 0) return null;

//     return variants.reduce((cheapest, current) => {
//       const currentPrice = current.prices?.[0]?.price_list_rate || Infinity;
//       const cheapestPrice = cheapest.prices?.[0]?.price_list_rate || Infinity;
//       return currentPrice < cheapestPrice ? current : cheapest;
//     });
//   }, [variants]);

//   // Get all possible values for each attribute
//   // const attributeValues = useMemo(() => {
//   //   const values: Record<string, string[]> = {};
//   //   allAttributes.forEach((attr) => {
//   //     values[attr] = Array.from(
//   //       new Set(
//   //         variants
//   //           ?.map(
//   //             (v) =>
//   //               v.attributes?.find((a) => a.attribute === attr)?.attribute_value
//   //           )
//   //           .filter(Boolean) as string[]
//   //       )
//   //     );
//   //   });
//   //   return values;
//   // }, [allAttributes, variants]);

//   // Get available values for each attribute based on current selections
//   const getAvailableValues = (attribute: string) => {
//     const matchingVariants = variants?.filter((variant) => {
//       return Object.entries(selectedValues)
//         .filter(([key]) => key !== attribute)
//         .every(([key, value]) =>
//           variant.attributes?.some(
//             (attr) => attr.attribute === key && attr.attribute_value === value
//           )
//         );
//     });

//     return Array.from(
//       new Set(
//         matchingVariants
//           ?.map(
//             (v) =>
//               v.attributes?.find((a) => a.attribute === attribute)
//                 ?.attribute_value
//           )
//           .filter(Boolean) as string[]
//       )
//     );
//   };

//   // Initialize with cheapest variant's attributes
//   useEffect(() => {
//     if (
//       allAttributes.length > 0 &&
//       Object.keys(selectedValues).length === 0 &&
//       getCheapestVariant
//     ) {
//       const initialValues: Record<string, string> = {};
//       allAttributes.forEach((attr) => {
//         const attrValue = getCheapestVariant.attributes?.find(
//           (a) => a.attribute === attr
//         )?.attribute_value;
//         if (attrValue) {
//           initialValues[attr] = attrValue;
//         }
//       });
//       setSelectedValues(initialValues);
//       updateVariant(getCheapestVariant.item_code);
//     }
//   }, [allAttributes, getCheapestVariant, updateVariant]);

//   // Update selected variant when selections change
//   useEffect(() => {
//     if (
//       allAttributes.length > 0 &&
//       Object.keys(selectedValues).length === allAttributes.length
//     ) {
//       const matchingVariant = variants?.find((variant) =>
//         allAttributes.every((attr) =>
//           variant.attributes?.some(
//             (a) =>
//               a.attribute === attr && a.attribute_value === selectedValues[attr]
//           )
//         )
//       );
//       if (matchingVariant) {
//         updateVariant(matchingVariant.item_code);
//       }
//     }
//   }, [selectedValues, variants, updateVariant, allAttributes]);

//   const handleAttributeChange = (attribute: string, value: string) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [attribute]: value,
//     }));
//   };

//   return (
//     <>
//       <VStack flexDirection={["column", "row"]} align="flex-start" gap={4}>
//         {allAttributes.map((attribute) => (
//           <Box key={attribute} w="full">
//             <Text variant="subtitle1" color="system.text.normal.light" mb={2}>
//               Choose {attribute}
//             </Text>
//             <Box
//               border="1px solid #CBD5E0"
//               borderRadius="md"
//               overflow="hidden"
//               bg="white"
//             >
//               <select
//                 value={selectedValues[attribute] || ""}
//                 onChange={(e) =>
//                   handleAttributeChange(attribute, e.target.value)
//                 }
//                 style={{
//                   padding: "10px",
//                   width: "100%",
//                   border: "none",
//                   outline: "none",
//                   background: "transparent",
//                   fontSize: "14px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {getAvailableValues(attribute).map((value) => (
//                   <option key={value} value={value}>
//                     {value}
//                   </option>
//                 ))}
//               </select>
//             </Box>
//           </Box>
//         ))}
//       </VStack>
//       <VStack align="flex-start" gap={4} w="full">
//         {activeVariant && (
//           <Box mt={4}>
//             {variants
//               ?.find((v) => v.item_code === activeVariant)
//               ?.attributes?.map((attr, idx) => (
//                 <Box key={idx} display="flex" gap={4} mt={2}>
//                   <Text fontWeight="medium" minW="80px">
//                     {attr.attribute}:
//                   </Text>
//                   <Text color="gray.600">{attr.attribute_value}</Text>
//                 </Box>
//               ))}
//           </Box>
//         )}
//       </VStack>
//     </>
//   );
// };

// "use client";
// import { Box, VStack, Text } from "@chakra-ui/react";
// import { useVariantStore } from "@/store";
// import { ProductVariantTabsProps } from "@/types";
// import { useEffect, useState, useMemo } from "react";

// export const ProductVariantTabs = ({
//   variants,
//   onVariantSelect,
// }: ProductVariantTabsProps & {
//   onVariantSelect?: (
//     variant: ProductVariantTabsProps["variants"][number]
//   ) => void;
// }) => {
//   const { activeVariant, updateVariant } = useVariantStore();

//   // Dynamically detect all available attributes from variants
//   const allAttributes = useMemo(() => {
//     const attributes = new Set<string>();
//     variants?.forEach((variant) => {
//       variant.attributes?.forEach((attr) => {
//         attributes.add(attr.attribute);
//       });
//     });
//     return Array.from(attributes);
//   }, [variants]);

//   // State for selected values of each attribute
//   const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
//     {}
//   );

//   // Find the cheapest variant
//   const getCheapestVariant = useMemo(() => {
//     if (!variants || variants.length === 0) return null;

//     return variants.reduce((cheapest, current) => {
//       const currentPrice = current.prices?.[0]?.price_list_rate || Infinity;
//       const cheapestPrice = cheapest.prices?.[0]?.price_list_rate || Infinity;
//       return currentPrice < cheapestPrice ? current : cheapest;
//     });
//   }, [variants]);

//   // Get available values for each attribute based on current selections
//   const getAvailableValues = (attribute: string) => {
//     const matchingVariants = variants?.filter((variant) => {
//       return Object.entries(selectedValues)
//         .filter(([key]) => key !== attribute)
//         .every(([key, value]) =>
//           variant.attributes?.some(
//             (attr) => attr.attribute === key && attr.attribute_value === value
//           )
//         );
//     });

//     return Array.from(
//       new Set(
//         matchingVariants
//           ?.map(
//             (v) =>
//               v.attributes?.find((a) => a.attribute === attribute)
//                 ?.attribute_value
//           )
//           .filter(Boolean) as string[]
//       )
//     );
//   };

//   // Initialize with cheapest variant's attributes
//   useEffect(() => {
//     if (
//       allAttributes.length > 0 &&
//       Object.keys(selectedValues).length === 0 &&
//       getCheapestVariant
//     ) {
//       const initialValues: Record<string, string> = {};
//       allAttributes.forEach((attr) => {
//         const attrValue = getCheapestVariant.attributes?.find(
//           (a) => a.attribute === attr
//         )?.attribute_value;
//         if (attrValue) {
//           initialValues[attr] = attrValue;
//         }
//       });
//       setSelectedValues(initialValues);
//       updateVariant(getCheapestVariant.item_code);
//       if (onVariantSelect) {
//         onVariantSelect(getCheapestVariant);
//       }
//     }
//   }, [allAttributes, getCheapestVariant, updateVariant]);

//   // Update selected variant when selections change
//   useEffect(() => {
//     if (
//       allAttributes.length > 0 &&
//       Object.keys(selectedValues).length === allAttributes.length
//     ) {
//       const matchingVariant = variants?.find((variant) =>
//         allAttributes.every((attr) =>
//           variant.attributes?.some(
//             (a) =>
//               a.attribute === attr && a.attribute_value === selectedValues[attr]
//           )
//         )
//       );
//       if (matchingVariant) {
//         updateVariant(matchingVariant.item_code);
//         if (onVariantSelect) {
//           onVariantSelect(matchingVariant);
//         }
//       }
//     }
//   }, [selectedValues, variants, updateVariant, allAttributes]);

//   const handleAttributeChange = (attribute: string, value: string) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [attribute]: value,
//     }));
//   };

//   return (
//     <>
//       <VStack
//         flexDirection={["column", "row"]}
//         align="flex-start"
//         gap={4}
//         w="full"
//       >
//         {allAttributes.map((attribute) => (
//           <Box key={attribute} w="full">
//             <Text variant="subtitle1" color="system.text.normal.light" mb={2}>
//               Choose {attribute}
//             </Text>
//             <Box
//               border="1px solid #CBD5E0"
//               borderRadius="md"
//               overflow="hidden"
//               bg="white"
//             >
//               <select
//                 value={selectedValues[attribute] || ""}
//                 onChange={(e) =>
//                   handleAttributeChange(attribute, e.target.value)
//                 }
//                 style={{
//                   padding: "10px",
//                   width: "100%",
//                   border: "none",
//                   outline: "none",
//                   background: "transparent",
//                   fontSize: "14px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {getAvailableValues(attribute).map((value) => (
//                   <option key={value} value={value}>
//                     {value}
//                   </option>
//                 ))}
//               </select>
//             </Box>
//           </Box>
//         ))}
//       </VStack>
//       <VStack align="flex-start" gap={4} w="full">
//         {activeVariant && (
//           <Box mt={4}>
//             {variants
//               ?.find((v) => v.item_code === activeVariant)
//               ?.attributes?.map((attr, idx) => (
//                 <Box key={idx} display="flex" gap={4} mt={2}>
//                   <Text fontWeight="medium" minW="80px">
//                     {attr.attribute}:
//                   </Text>
//                   <Text color="gray.600">{attr.attribute_value}</Text>
//                 </Box>
//               ))}
//           </Box>
//         )}
//       </VStack>
//     </>
//   );
// };


"use client";
import { 
  Box, 
  VStack, 
  Text, 
  Flex, 
  Wrap, 
  WrapItem, 
  ColorSwatch,
  Group
} from "@chakra-ui/react";
import { useVariantStore } from "@/store";
import { ProductVariantTabsProps } from "@/types";
import { useEffect, useState, useMemo } from "react";

export const ProductVariantTabs = ({
  variants,
  onVariantSelect,
}: ProductVariantTabsProps & {
  onVariantSelect?: (
    variant: ProductVariantTabsProps["variants"][number]
  ) => void;
}) => {
  const { activeVariant, updateVariant } = useVariantStore();
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

  // Enhanced color map with hex values
  const colorMap: Record<string, string> = {
    "Ruby Woo": "#9F1F31",  // MAC Ruby Woo red
    "Velvet Teddy": "#B1876B", // MAC Velvet Teddy
    "Whirl": "#C6A493", // MAC Whirl
    "Pillow Talk": "#D4B8B5", // Charlotte Tilbury
    "Snob": "#D8C9D3", // MAC Snob
    // Add more color mappings as needed
  };

  const allAttributes = useMemo(() => {
    const attributes = new Set<string>();
    variants?.forEach((variant) => {
      variant.attributes?.forEach((attr) => {
        attributes.add(attr.attribute);
      });
    });
    return Array.from(attributes);
  }, [variants]);

  const getCheapestVariant = useMemo(() => {
    if (!variants || variants.length === 0) return null;
    return variants.reduce((cheapest, current) => {
      const currentPrice = current.prices?.[0]?.price_list_rate || Infinity;
      const cheapestPrice = cheapest.prices?.[0]?.price_list_rate || Infinity;
      return currentPrice < cheapestPrice ? current : cheapest;
    });
  }, [variants]);

  const getAvailableValues = (attribute: string) => {
    const matchingVariants = variants?.filter((variant) => {
      return Object.entries(selectedValues)
        .filter(([key]) => key !== attribute)
        .every(([key, value]) =>
          variant.attributes?.some(
            (attr) => attr.attribute === key && attr.attribute_value === value 
          )
        );
    });

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

  // Initialize with cheapest variant's attributes
  useEffect(() => {
    if (
      allAttributes.length > 0 &&
      Object.keys(selectedValues).length === 0 &&
      getCheapestVariant
    ) {
      const initialValues: Record<string, string> = {};
      allAttributes.forEach((attr) => {
        const attrValue = getCheapestVariant.attributes?.find(
          (a) => a.attribute === attr
        )?.attribute_value;
        if (attrValue) {
          initialValues[attr] = attrValue;
        }
      });
      setSelectedValues(initialValues);
      updateVariant(getCheapestVariant.item_code);
      if (onVariantSelect) {
        onVariantSelect(getCheapestVariant);
      }
    }
  }, [allAttributes, getCheapestVariant, updateVariant]);

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
        if (onVariantSelect) {
          onVariantSelect(matchingVariant);
        }
      }
    }
  }, [selectedValues, variants, updateVariant, allAttributes]);

  const handleAttributeChange = (attribute: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  return (
    <VStack align="flex-start" gap={6} w="full">
      {allAttributes.map((attribute) => {
        const availableValues = getAvailableValues(attribute);
        console.log("avialable values",availableValues);
        const isColorAttribute = attribute.toLowerCase().includes('color') || 
                                attribute.toLowerCase().includes('shade');
        console.log("isColorAttribute",isColorAttribute);

        return (
          <Box key={attribute} w="full">
            <Text fontSize="md" fontWeight="medium" mb={3}>
              Select {attribute}:
            </Text>
            
            {isColorAttribute ? (
              <Group gap={0} width="full" maxW="container.sm">
                {availableValues.map((value) => {
                  const hexColor = colorMap[value] || "#cccccc";
                  return (
                    <ColorSwatch
                      key={value}
                      value={value}
                      color={hexColor}
                      size="2xl"
                      rounded="none"
                      borderWidth="2px"
                      borderColor={
                        selectedValues[attribute] === value 
                          ? "blue.500" 
                          : "transparent"
                      }
                      onClick={() => handleAttributeChange(attribute, value)}
                      cursor="pointer"
                      position="relative"
                      _hover={{
                        transform: "scale(1.1)",
                        zIndex: 1,
                        boxShadow: "md"
                      }}
                      transition="all 0.2s"
                    >
                      <Box
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        // bg={attr.color}
                        color="white"
                        p={1}
                        fontSize="xs"
                        textAlign="center"
                        textTransform="capitalize"
                        lineClamp={1}
                      >
                        {value}ttt
                      </Box>
                    </ColorSwatch>
                  );
                })}
              </Group>
            ) : (
              <Wrap gap={3}>
                {availableValues.map((value) => (
                  <WrapItem key={value}>
                    <Box
                      as="button"
                      px={4}
                      py={2}
                      borderRadius="md"
                      borderWidth="2px"
                      borderColor={
                        selectedValues[attribute] === value 
                          ? "blue.500" 
                          : "gray.200"
                      }
                      bg="white"
                      fontWeight={
                        selectedValues[attribute] === value 
                          ? "bold" 
                          : "normal"
                      }
                      onClick={() => handleAttributeChange(attribute, value)}
                      _hover={{
                        bg: "gray.50"
                      }}
                    >
                      {value}
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            )}
          </Box>
        );
      })}

      {/* {activeVariant && (
        <Box mt={4} w="full">
          <Text fontSize="lg" fontWeight="bold" mb={3}>
            Selected Variant:
          </Text>
          <Box 
            p={4} 
            borderWidth="1px" 
            borderRadius="md" 
            bg="white"
          >
            {variants
              ?.find((v) => v.item_code === activeVariant)
              ?.attributes?.map((attr, idx) => (
                <Flex key={idx} mb={2}>
                  <Text fontWeight="medium" minW="100px">
                    {attr.attribute}:
                  </Text>
                  <Text color="gray.700">{attr.attribute_value}</Text>
                  <Text color="gray.700">{attr.color}</Text>
                </Flex>
              ))}
          </Box>
        </Box>
      )} */}
    </VStack>
  );
};