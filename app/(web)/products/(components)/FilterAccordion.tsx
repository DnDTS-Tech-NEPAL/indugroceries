"use client";

import type React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useController, useFormContext, useWatch } from "react-hook-form";
import type { FilterAccordionProps, CategoryItem } from "@/types";
import { SearchInput } from "@/components";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useFilterStore } from "@/store/products/filterStore";
import { useSearchParams } from "next/navigation";

export const FilterAccordion = ({
  items,
  isFetching,
  name = "filter",
}: FilterAccordionProps) => {
  const { control } = useFormContext();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [childCategories, setChildCategories] = useState<CategoryItem[]>([]);

  const {
    field: { value = [], onChange },
  } = useController({
    name,
    control,
  });

  // Zustand store
  const { item_group, setItemGroup, setPage } = useFilterStore();
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get("category")?.toLowerCase();

  const searchTerm = useWatch({
    name: "search",
    control,
    defaultValue: "",
  });

  const selectedValues = Array.isArray(value) ? value : [];

  const handleItemClick = (
    val: string,
    hasChildren?: boolean,
    children: CategoryItem[] = []
  ) => {
    const isSameCategory = selectedValues[0] === val;
    const newValue = isSameCategory ? [] : [val];

    onChange(newValue);
    setItemGroup(newValue);
    setPage(1);

    if (hasChildren) {
      if (expandedCategory === val) {
        setExpandedCategory(null);
        setChildCategories([]);
      } else {
        setExpandedCategory(val);
        setChildCategories(children);
      }
    } else {
      setExpandedCategory(null);
      setChildCategories([]);
    }
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

  useEffect(() => {
    if (!categoryFromQuery || selectedValues.length > 0 || items.length === 0)
      return;

    const parent = items.find(
      (item) => item.value.toLowerCase() === categoryFromQuery
    );

    if (parent) {
      handleItemClick(parent.value, parent.hasChildren, parent.children);
      return;
    }

    const parentWithChild = items.find((item) =>
      item.children?.some(
        (child) => child.name.toLowerCase() === categoryFromQuery
      )
    );

    if (parentWithChild) {
      setExpandedCategory(parentWithChild.value);
      setChildCategories(parentWithChild.children || []);

      const matchedChild = parentWithChild.children?.find(
        (child) => child.name.toLowerCase() === categoryFromQuery
      );

      if (matchedChild) {
        const childValue = matchedChild.name;
        onChange([childValue]);
        setItemGroup([childValue]);
        setPage(1);
      }
    }
  }, [categoryFromQuery, items]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VStack align="stretch" w="full" borderTop="1px" borderColor="gray.200">
      <Box mb={4}>
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
        filteredItems.map(({ value: val, title, hasChildren, children }) => (
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
                {hasChildren && (
                  <ChevronRight
                    size={16}
                    className={`ml-2 transition-transform ${
                      expandedCategory === val ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Flex>
              {item_group.includes(val) && (
                <Box w="6px" h="6px" borderRadius="full" bg="red.500" />
              )}
            </Flex>

            {expandedCategory === val && childCategories.length > 0 && (
              <VStack align="stretch" pl={6} bg="gray.50">
                {childCategories.map((child) => (
                  <Flex
                    key={child.name}
                    py={4}
                    px={4}
                    borderBottom="1px"
                    borderColor="gray.100"
                    justify="space-between"
                    align="center"
                    cursor="pointer"
                    onClick={(e) => handleChildClick(child.name, e)}
                  >
                    <Text fontSize="sm">{child.name}</Text>
                    {item_group.includes(child.name) && (
                      <Box w="5px" h="5px" borderRadius="full" bg="red.500" />
                    )}
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        ))}
    </VStack>
  );
};
