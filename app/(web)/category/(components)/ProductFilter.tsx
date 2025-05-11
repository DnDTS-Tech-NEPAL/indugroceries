import { Box, Flex, Text } from "@chakra-ui/react";

import { SortIcon, FilterIcon } from "@/assets/svg";
import { FilterSelect } from "@/components";
import { popularityFilterOptions, priceRangeFilterOptions } from "@/constants";

export const ProductFilters = () => {
  return (
    <Box cursor="pointer" position="relative">
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
          bg="primary.50"
          borderRadius="8px"
          p="8px"
          border="1px solid"
          borderColor="primary.100"
          display={{
            base: "block",
            lg: "none",
          }}
        >
          <Flex align="center">
            <FilterIcon />
            <Text fontSize={"12px"} fontWeight={500}>
              Filter
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
