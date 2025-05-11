import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Flex, Text, useDisclosure, VStack } from "@chakra-ui/react";

import { SortIcon, FilterIcon } from "@/assets/svg";
import { Drawer, FilterSelect } from "@/components";
import { popularityFilterOptions, priceRangeFilterOptions } from "@/constants";
import { useProductsFilter } from "@/hooks/app";

import { FilterAccordion } from "./FilterAccordion";

export const ProductFilters = () => {
  const filters = useProductsFilter();
  const { reset } = useFormContext();

  const { open, onOpen, onClose } = useDisclosure();

  const onReset = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    window.addEventListener("resize", onClose);
    return () => window.removeEventListener("resize", onClose);
  }, []);

  return (
    <Box position="relative">
      <Flex align="center" justifyContent="space-between" width="100%">
        <Flex gap={{ base: "12px", md: "20px" }}>
          <FilterSelect
            name="pricerange"
            options={priceRangeFilterOptions}
            icon={<SortIcon />}
          />

          <FilterSelect name="bestseller" options={popularityFilterOptions} />
        </Flex>

        <Box
          onClick={onOpen}
          bg="primary.50"
          borderRadius="8px"
          p="8px"
          border="1px solid"
          borderColor="primary.100"
          display={{
            base: "block",
            lg: "none",
          }}
          cursor="pointer"
        >
          <Flex align="center" gap={"2px"}>
            <FilterIcon height={"14px"} width={"14px"} />
            <Text fontSize={"12px"} fontWeight={500}>
              Filter
            </Text>
          </Flex>

          <Drawer
            title="Product Filter"
            open={open}
            onClose={onClose}
            hasFooter
            actionButtonText="Reset"
            cancelButtonText="Close"
            hasCloseIcon={false}
            onAction={onReset}
            onEnd={onClose}
          >
            <Box minWidth="240px" p={4}>
              <VStack align="stretch" borderRadius="md">
                {filters.map((filter) => (
                  <FilterAccordion key={filter.title} {...filter} />
                ))}
              </VStack>
            </Box>
          </Drawer>
        </Box>
      </Flex>
    </Box>
  );
};
