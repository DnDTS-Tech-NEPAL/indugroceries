import { Box, Flex } from "@chakra-ui/react";
import { FilterIcon } from "@/assets/svg";
import { FilterSelect } from "@/components";
import { priceRangeFilterOptions } from "@/constants";

export const ProductFilters = () => {
  return (
    <Box position="relative">
      <Flex align="center" justifyContent="space-between" width="100%">
        <Flex gap={{ base: "12px", md: "20px" }}>
          <FilterSelect
            name="pricerange"
            options={priceRangeFilterOptions}
            icon={<FilterIcon />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
