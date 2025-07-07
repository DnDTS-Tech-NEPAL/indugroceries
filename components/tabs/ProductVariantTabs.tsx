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

// "use client";
// import {
//   Box,
//   VStack,
//   Text,
//   Wrap,
//   WrapItem,
//   ColorSwatch,
//   Group,
// } from "@chakra-ui/react";
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
//   const { updateVariant } = useVariantStore();
//   const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
//     {}
//   );

//   const allAttributes = useMemo(() => {
//     const attributes = new Set<string>();
//     variants?.forEach((variant) => {
//       variant.attributes?.forEach((attr) => {
//         attributes.add(attr.attribute);
//       });
//     });
//     return Array.from(attributes);
//   }, [variants]);

//   const getCheapestVariant = useMemo(() => {
//     if (!variants || variants.length === 0) return null;
//     return variants.reduce((cheapest, current) => {
//       const currentPrice = current.prices?.[0]?.price_list_rate || Infinity;
//       const cheapestPrice = cheapest.prices?.[0]?.price_list_rate || Infinity;
//       return currentPrice < cheapestPrice ? current : cheapest;
//     });
//   }, [variants]);

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

//   // Get color for a specific attribute value
//   const getColorForValue = (attribute: string, value: string): string => {
//     const variantWithColor = variants?.find((v) =>
//       v.attributes?.some(
//         (a) =>
//           a.attribute === attribute && a.attribute_value === value && a.color
//       )
//     );

//     return (
//       variantWithColor?.attributes?.find(
//         (a) => a.attribute === attribute && a.attribute_value === value
//       )?.color || "#cccccc"
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

//   // Group attributes by type (size/volume vs shades)
//   const attributeGroups = useMemo(() => {
//     const groups: Record<string, string[]> = {
//       size: [],
//       shade: [],
//     };

//     allAttributes.forEach((attr) => {
//       if (
//         attr.toLowerCase().includes("size") ||
//         attr.toLowerCase().includes("volume")
//       ) {
//         groups.size.push(attr);
//       } else if (
//         attr.toLowerCase().includes("color") ||
//         attr.toLowerCase().includes("shade")
//       ) {
//         groups.shade.push(attr);
//       }
//     });

//     return groups;
//   }, [allAttributes]);

//   return (
//     <VStack align="flex-start" gap={6} w="full">
//       {/* Size/Volume Section */}
//       {attributeGroups.size.length > 0 && (
//         <Box w="full">
//           <Text fontSize="md" fontWeight="medium" mb={3}>
//             Size/Volume
//           </Text>
//           <Wrap gap={3}>
//             {attributeGroups.size.flatMap((attr) =>
//               getAvailableValues(attr).map((value) => (
//                 <WrapItem key={`${attr}-${value}`}>
//                   <Box
//                     as="button"
//                     px={4}
//                     py={1}
//                     border={
//                       selectedValues[attr] === value ? "none" : "1px solid gray"
//                     }
//                     borderRadius={"full"}
//                     bg={selectedValues[attr] === value ? "#FF6996" : "white"}
//                     color={selectedValues[attr] === value ? "white" : "black"}
//                     onClick={() => handleAttributeChange(attr, value)}
//                   >
//                     {value}
//                   </Box>
//                 </WrapItem>
//               ))
//             )}
//           </Wrap>
//         </Box>
//       )}

//       {/* Shades Section */}
//       {attributeGroups.shade.length > 0 && (
//         <Box w="full">
//           <Text fontSize="md" fontWeight="medium" mb={3}>
//             Shades
//           </Text>
//           <Group gap={0} width="full" maxW="container.sm">
//             {attributeGroups.shade.flatMap((attr) =>
//               getAvailableValues(attr).map((value) => {
//                 const color = getColorForValue(attr, value);
//                 return (
//                   <ColorSwatch
//                     key={`${attr}-${value}`}
//                     value={color}
//                     width={selectedValues[attr] === value ? "140px" : "46px"}
//                     height="52px"
//                     rounded="sm"
//                     mr={1}
//                     onClick={() => handleAttributeChange(attr, value)}
//                     cursor="pointer"
//                     position="relative"
//                     _hover={{
//                       transform: "scale(1.1)",
//                       zIndex: 1,
//                       boxShadow: "md",
//                     }}
//                     transition="all 0.2s"
//                   >
//                     <Box
//                       color="white"
//                       p={1}
//                       fontSize="sm"
//                       textAlign="center"
//                       textTransform="capitalize"
//                       lineClamp={1}
//                     >
//                       {selectedValues[attr] === value ? value : ""}
//                     </Box>
//                   </ColorSwatch>
//                 );
//               })
//             )}
//           </Group>
//         </Box>
//       )}

//       {activeVariant && (
//         <Box mt={4} w="full">
//           <Text fontSize="lg" fontWeight="bold" mb={3}>
//             Selected Variant:
//           </Text>
//           <Box
//             p={4}
//             borderWidth="1px"
//             borderRadius="md"
//             bg="white"
//           >
//             {variants
//               ?.find((v) => v.item_code === activeVariant)
//               ?.attributes?.map((attr, idx) => (
//                 <Flex key={idx} mb={2}>
//                   <Text fontWeight="medium" minW="100px">
//                     {attr.attribute}:
//                   </Text>
//                   <Text color="gray.700">{attr.attribute_value}</Text>
//                 </Flex>
//               ))}
//           </Box>
//         </Box>
//       )}
//     </VStack>
//   );
// };

"use client";
import {
  Box,
  VStack,
  Text,
  Wrap,
  WrapItem,
  ColorSwatch,
  Group,
} from "@chakra-ui/react";
import { useVariantStore } from "@/store";
import { ProductVariantTabsProps } from "@/types";
import { useEffect, useState, useMemo } from "react";
import { Tooltip } from "../tooltip";

export const ProductVariantTabs = ({
  variants,
  onVariantSelect,
}: ProductVariantTabsProps & {
  onVariantSelect?: (
    variant: ProductVariantTabsProps["variants"][number]
  ) => void;
}) => {
  const { updateVariant } = useVariantStore();
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  const allAttributes = useMemo(() => {
    const attributes = new Set<string>();
    variants?.forEach((variant) => {
      variant.attributes?.forEach((attr) => {
        attributes.add(attr.attribute);
      });
    });
    return Array.from(attributes);
  }, [variants]);

  const getAllValuesForAttribute = (attribute: string): string[] => {
    return Array.from(
      new Set(
        variants
          ?.map(
            (v) =>
              v.attributes?.find((a) => a.attribute === attribute)
                ?.attribute_value
          )
          .filter(Boolean) as string[]
      )
    );
  };

  const getAvailableValues = (attribute: string): Set<string> => {
    const matchingVariants = variants?.filter((variant) => {
      return Object.entries(selectedValues)
        .filter(([key]) => key !== attribute)
        .every(([key, value]) =>
          variant.attributes?.some(
            (attr) => attr.attribute === key && attr.attribute_value === value
          )
        );
    });

    return new Set(
      matchingVariants
        ?.map(
          (v) =>
            v.attributes?.find((a) => a.attribute === attribute)
              ?.attribute_value
        )
        .filter(Boolean) as string[]
    );
  };

  const getColorForValue = (attribute: string, value: string): string => {
    const variantWithColor = variants?.find((v) =>
      v.attributes?.some(
        (a) =>
          a.attribute === attribute && a.attribute_value === value && a.color
      )
    );
    return (
      variantWithColor?.attributes?.find(
        (a) => a.attribute === attribute && a.attribute_value === value
      )?.color || "#cccccc"
    );
  };

  const getCheapestVariant = useMemo(() => {
    if (!variants || variants.length === 0) return null;
    return variants.reduce((cheapest, current) => {
      const currentPrice = current.prices?.[0]?.price_list_rate || Infinity;
      const cheapestPrice = cheapest.prices?.[0]?.price_list_rate || Infinity;
      return currentPrice < cheapestPrice ? current : cheapest;
    });
  }, [variants]);

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
    // const isDisabled = !getAvailableValues(attribute).has(value);
    // if (isDisabled) return;
    setSelectedValues((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const attributeGroups = useMemo(() => {
    const groups: Record<string, string[]> = {
      size: [],
      shade: [],
    };
    allAttributes.forEach((attr) => {
      if (
        attr.toLowerCase().includes("size") ||
        attr.toLowerCase().includes("volume")
      ) {
        groups.size.push(attr);
      } else if (
        attr.toLowerCase().includes("color") ||
        attr.toLowerCase().includes("shade")
      ) {
        groups.shade.push(attr);
      }
    });
    return groups;
  }, [allAttributes]);

  return (
    <VStack align="flex-start" gap={6} w="full">
      {/* Size/Volume Section */}
      {attributeGroups.size.length > 0 && (
        <Box w="full">
          <Text fontSize="md" fontWeight="medium" mb={3}>
            Size/Volume
          </Text>
          <Wrap gap={3}>
            {attributeGroups.size.flatMap((attr) =>
              getAllValuesForAttribute(attr).map((value) => {
                const isSelected = selectedValues[attr] === value;
                const isAvailable = getAvailableValues(attr).has(value);

                return (
                  <WrapItem key={`${attr}-${value}`}>
                    <Tooltip
                      content={
                        !isAvailable
                          ? `The ${value} ${attr} is not available for selected Shade/color`
                          : null
                      }
                      showArrow={!isAvailable ? true : false}
                      disabled={isAvailable}
                      positioning={{ placement: "top" }}
                      contentProps={{ css: { "--tooltip-bg": "#FF6996" } }}
                    >
                      <Box
                        as="button"
                        px={2}
                        py={5}
                        border={isSelected ? "none" : "1px solid gray"}
                        borderRadius="lg"
                        width={"fit-content"}
                        bg={
                          isSelected
                            ? "#FF6996"
                            : isAvailable
                              ? "white"
                              : "#f2f2f2"
                        }
                        color={
                          isSelected
                            ? "white"
                            : isAvailable
                              ? "black"
                              : "gray.400"
                        }
                        cursor={isAvailable ? "pointer" : "not-allowed"}
                        opacity={isAvailable ? 1 : 0.6}
                        onClick={() => handleAttributeChange(attr, value)}
                      >
                        {value}
                      </Box>
                    </Tooltip>
                  </WrapItem>
                );
              })
            )}
          </Wrap>
        </Box>
      )}

      {/* Shades Section */}
      {attributeGroups.shade.length > 0 && (
        <Box w="full">
          <Text fontSize="md" fontWeight="medium" mb={3}>
            Shades
          </Text>
          <Group gap={0} width="full" maxW="container.sm">
            {attributeGroups.shade.flatMap((attr) =>
              getAllValuesForAttribute(attr).map((value) => {
                const color = getColorForValue(attr, value);
                const isSelected = selectedValues[attr] === value;
                const isAvailable = getAvailableValues(attr).has(value);

                return (
                  <Tooltip
                    key={`${attr}-${value}`}
                    content={
                      !isAvailable
                        ? `${attr} ${value} is not available for selected size/volume`
                        : null
                    }
                    showArrow={!isAvailable ? true : false}
                    disabled={isAvailable}
                    positioning={{ placement: "top" }}
                    contentProps={{ css: { "--tooltip-bg": "#FF6996" } }}
                  >
                    <ColorSwatch
                      value={color}
                      width={isSelected ? "140px" : "46px"}
                      height="52px"
                      rounded="sm"
                      mr={1}
                      cursor={isAvailable ? "pointer" : "not-allowed"}
                      opacity={isAvailable ? 1 : 0.4}
                      onClick={() => handleAttributeChange(attr, value)}
                      position="relative"
                      _hover={
                        isAvailable
                          ? {
                              transform: "scale(1.1)",
                              zIndex: 1,
                              boxShadow: "md",
                            }
                          : undefined
                      }
                      transition="all 0.2s"
                    >
                      <Box
                        color="white"
                        p={1}
                        fontSize="sm"
                        textAlign="center"
                        textTransform="capitalize"
                        lineClamp={1}
                      >
                        {isSelected ? value : ""}
                      </Box>
                    </ColorSwatch>
                  </Tooltip>
                );
              })
            )}
          </Group>
        </Box>
      )}
    </VStack>
  );
};
