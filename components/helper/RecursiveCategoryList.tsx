"use client";

import { Box, VStack, HStack, IconButton, Collapsible } from "@chakra-ui/react";
import { Checkbox } from "../form";
import { LuChevronDown } from "react-icons/lu";
// import Link from "next/link";

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
    <VStack align="start" gap={2} pl={2} w="full">
      {items.map((item) => {
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;

        return (
          <Box key={item.name} w="full">
            {hasChildren ? (
              <Collapsible.Root>
                <HStack justify="space-between" w="full">
                  <Checkbox
                    color="#7A7A7A"
                    fontSize="sm"
                    colorScheme="pink"
                    checked={selected.includes(item.name)}
                    onChange={() => onToggle(item.name)}
                  >
                    {/* <Link href={`/category/${encodeURIComponent(item.name)}`}> */}
                    {item.name}
                    {/* </Link> */}
                  </Checkbox>

                  <Collapsible.Trigger asChild>
                    <IconButton
                      aria-label="Toggle Subcategory"
                      variant={"plain"}
                      size="sm"
                      _expanded={{ transform: "rotate(180deg)" }}
                    >
                      <LuChevronDown />
                    </IconButton>
                  </Collapsible.Trigger>
                </HStack>

                <Collapsible.Content>
                  <Box pl={4} pt={1}>
                    <RecursiveCategoryList
                      items={item.children!}
                      selected={selected}
                      onToggle={onToggle}
                    />
                  </Box>
                </Collapsible.Content>
              </Collapsible.Root>
            ) : (
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
            )}
          </Box>
        );
      })}
    </VStack>
  );
};

export default RecursiveCategoryList;
