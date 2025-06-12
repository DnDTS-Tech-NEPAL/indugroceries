"use client";

import type React from "react";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useController, useFormContext, useWatch } from "react-hook-form";
import type { FilterAccordionProps, CategoryItem } from "@/types";
import { SearchInput } from "@/components";
import { useState, useEffect } from "react";

import { ChevronRight } from "lucide-react";

import { useFilterStore } from "@/store/products/filterStore";

export const FilterAccordion = ({
  items,
  isFetching,
  name = "filter",
}: FilterAccordionProps) => {
  const { control } = useFormContext();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [childCategories, setChildCategories] = useState<
    Array<{ value: string; title: string }>
  >([]);

  const {
    field: { value = [], onChange },
  } = useController({
    name,
    control,
  });

  // Zustand store
  const { item_group, setItemGroup, setPage } = useFilterStore();

  // Watch the search input value
  const searchTerm = useWatch({
    name: "search",
    control,
    defaultValue: "",
  });

  const selectedValues = Array.isArray(value) ? value : [];

  const handleItemClick = (
    val: string,
    hasChildren: boolean | undefined,
    children: CategoryItem[] = []
  ) => {
    const hasChildrenBoolean = hasChildren === true;

    let newValue: string[];

    if (hasChildrenBoolean) {
      // Toggle expanded state for parent category
      setExpandedCategory(expandedCategory === val ? null : val);

      // Set child categories when expanding
      if (expandedCategory !== val) {
        setChildCategories(
          children.map((child) => ({
            value: child.name,
            title: child.name,
          }))
        );
      } else {
        setChildCategories([]);
      }

      // Toggle selection of the parent category
      newValue = selectedValues[0] === val ? [] : [val];
    } else {
      // Toggle selection of the item without children
      newValue = selectedValues[0] === val ? [] : [val];
    }

    // Update React Hook Form state
    onChange(newValue);

    // Sync Zustand store state
    setItemGroup(newValue);
    setPage(1);
  };

  const handleChildClick = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = selectedValues[0] === val ? [] : [val];

    onChange(newValue);
    setItemGroup(newValue);
    setPage(1);
  };

  const handleClearAll = () => {
    onChange([]);
    setExpandedCategory(null);
    setChildCategories([]);
    setItemGroup([]);
    setPage(1);
  };

  // Reset expanded category when selection changes from outside
  useEffect(() => {
    if (selectedValues.length === 0) {
      setExpandedCategory(null);
      setChildCategories([]);
    }
  }, [selectedValues]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VStack
      align="stretch"
      w="full"
      gap={0}
      borderTop="1px"
      borderColor="gray.200"
    >
      <Box marginBottom={5}>
        <SearchInput name="search" />
      </Box>

      <Box
        py={3}
        px={4}
        borderBottom="1px"
        borderColor="gray.200"
        cursor="pointer"
        onClick={handleClearAll}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          bg: "gray.200",
        }}
      >
        <Text fontWeight="bold">ALL</Text>
      </Box>

      {!isFetching &&
        filteredItems.map(({ value: val, title, hasChildren, children }) => {
          const hasChildrenBoolean = hasChildren === true;
          return (
            <Box key={val}>
              <Flex
                py={5}
                px={4}
                borderBottom="1px"
                borderColor="gray.200"
                justify="space-between"
                align="center"
                cursor="pointer"
                onClick={() => handleItemClick(val, hasChildren, children)}
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  bg: "gray.200",
                }}
              >
                <Flex align="center">
                  <Text>{title}</Text>
                  {hasChildrenBoolean && (
                    <ChevronRight
                      size={16}
                      className={`ml-2 transition-transform ${
                        expandedCategory === val ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </Flex>
                {selectedValues.includes(val) && (
                  <Box w="6px" h="6px" borderRadius="full" bg="red.500" />
                )}
              </Flex>

              {/* Child categories */}
              {expandedCategory === val && childCategories.length > 0 && (
                <VStack align="stretch" pl={6} bg="gray.50">
                  {childCategories.map((child) => (
                    <Flex
                      key={child.value}
                      py={4}
                      px={4}
                      borderBottom="1px"
                      borderColor="gray.100"
                      justify="space-between"
                      align="center"
                      cursor="pointer"
                      onClick={(e) => handleChildClick(child.value, e)}
                    >
                      <Text fontSize="sm">{child.title}</Text>
                      {selectedValues.includes(child.value) && (
                        <Box w="5px" h="5px" borderRadius="full" bg="red.500" />
                      )}
                    </Flex>
                  ))}
                </VStack>
              )}
            </Box>
          );
        })}
    </VStack>
  );
};
