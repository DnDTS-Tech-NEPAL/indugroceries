"use client";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { useFilterStore } from "@/store/products/filterStore";
import { TagNew } from "../tag";
import { SelectOptionTypes } from "@/types";
import { popularityFilterOptions, priceRangeFilterOptions } from "@/constants";

export const AppliedFilters = () => {
  const {
    brand,
    item_group,
    pricerange,
    bestseller,
    setPriceRange,
    setBrand,
    setItemGroup,
    setBestseller,
    setPage,
  } = useFilterStore();

  const handleRemove = (type: string, value?: string | number) => {
    if (type === "brand") {
      setBrand(brand.filter((b) => b !== value));
    } else if (type === "item_group") {
      setItemGroup(item_group.filter((i) => i !== value));
    } else if (type === "price") {
      setPriceRange(0);
    } else if (type === "bestseller") {
      setBestseller(0);
    }
    setPage(1);
  };

  const hasFilters =
    brand.length || item_group.length || pricerange !== 0 || bestseller !== 0;

  if (!hasFilters) return null;

  const getLabelFromOptions = (
    options: SelectOptionTypes[],
    value: string | number
  ) => {
    return options.find(
      (option) => option.value.toString() === value.toString()
    )?.label;
  };
  return (
    <VStack align="start" w={64} gap={2} mb={4}>
      <Text fontWeight="bold">Filter Applied</Text>
      <Flex wrap="wrap" gap={2}>
        {/* Brands filter Tag */}
        {brand.map((b) => (
          <TagNew
            key={b}
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("brand", b)}
          >
            {b}
          </TagNew>
        ))}
        {/* Categories Tag */}
        {item_group.map((i) => (
          <TagNew
            key={i}
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("item_group", i)}
          >
            {i}
          </TagNew>
        ))}
        {/* Price filter Tag */}
        {pricerange !== 0 && (
          <TagNew
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("price", pricerange)}
          >
            {getLabelFromOptions(priceRangeFilterOptions, pricerange)}
          </TagNew>
        )}
        {/* Bestseller filter Tag */}
        {bestseller !== 0 && (
          <TagNew
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("bestseller", bestseller)}
          >
            {getLabelFromOptions(popularityFilterOptions, bestseller)}
          </TagNew>
        )}
      </Flex>
    </VStack>
  );
};
