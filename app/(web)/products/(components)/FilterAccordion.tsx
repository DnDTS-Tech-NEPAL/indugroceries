"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useController, useFormContext, useWatch } from "react-hook-form";
import type { FilterAccordionProps } from "@/types";
import { SearchInput } from "@/components";

export const FilterAccordion = ({
  items,
  isFetching,
  name = "filter",
}: FilterAccordionProps) => {
  const { control } = useFormContext();

  const {
    field: { value = [], onChange },
  } = useController({
    name,
    control,
  });

  // Watch the search input value
  const searchTerm = useWatch({
    name: "search",
    control,
    defaultValue: "",
  });

  const selectedValues = Array.isArray(value) ? value : [];

  const handleItemClick = (val: string) => {
    const newValue = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];

    onChange(newValue);
  };

  const handleClearAll = () => {
    onChange([]);
  };

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
        filteredItems.map(({ value: val, title }) => (
          <Flex
            key={val}
            py={5}
            px={4}
            borderBottom="1px"
            borderColor="gray.200"
            justify="space-between"
            align="center"
            cursor="pointer"
            onClick={() => handleItemClick(val)}
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
            <Text>{title}</Text>
            {selectedValues.includes(val) && (
              <Box w="6px" h="6px" borderRadius="full" bg="red.500" />
            )}
          </Flex>
        ))}
    </VStack>
  );
};
