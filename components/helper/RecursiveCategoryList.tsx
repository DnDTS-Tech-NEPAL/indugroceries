// components/RecursiveCategoryList.tsx
"use client";

import { Box, VStack } from "@chakra-ui/react";
import { Checkbox } from "../form";

interface CategoryItem {
  name: string;
  children?: CategoryItem[];
}

interface RecursiveCategoryProps {
  items: CategoryItem[];
  selected: string[];
  onToggle: (name: string) => void;
}

const RecursiveCategoryList = ({
  items,
  selected,
  onToggle,
}: RecursiveCategoryProps) => {
  return (
    <VStack align="start" pl={4} gap={2}>
      {items.map((item) => (
        <Box key={item.name} w="full">
          <Checkbox
            py={1}
            color="#7A7A7A"
            fontSize="sm"
            colorScheme="pink"
            checked={selected.includes(item.name)}
            onChange={() => onToggle(item.name)}
          >
            {item.name}
          </Checkbox>

          {item.children && item.children.length > 0 && (
            <RecursiveCategoryList
              items={item.children}
              selected={selected}
              onToggle={onToggle}
            />
          )}
        </Box>
      ))}
    </VStack>
  );
};

export default RecursiveCategoryList;
