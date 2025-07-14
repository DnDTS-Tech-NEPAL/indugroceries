"use client";

import { Flex, Text, VStack } from "@chakra-ui/react";
import { TagNew } from "../tag";
import { useBrandFilterStore } from "@/store/products/brandFilterStore";

export const SelectedFilters = () => {
  const {
    brand = [],
    item_group = [],
    priceRange = [0, 0],
    discount = 0,
    inStock = 0,
    skinTypes = [],
    skinConcern = [],
    setBrand,
    setItemGroup,
    setPriceRange,
    setDiscount,
    setInStock,
    setSkinTypes,
    setSkinConcernTypes,
    setPage,
  } = useBrandFilterStore();

  const handleRemove = (type: string, value?: string | number) => {
    switch (type) {
      case "brand":
        setBrand(brand.filter((b) => b !== value));
        break;
      case "item_group":
        setItemGroup(item_group.filter((g) => g !== value));
        break;
      case "price":
        setPriceRange([0, 0]);
        break;
      case "discount":
        setDiscount(0);
        break;
      case "inStock":
        setInStock(0);
        break;
      case "skinType":
        setSkinTypes(skinTypes.filter((s) => s !== value));
        break;
      case "skinConcern":
        setSkinConcernTypes(skinConcern.filter((s) => s !== value));
        break;
    }
    setPage(1);
  };

  const hasFilters =
    brand.length ||
    item_group.length ||
    discount !== 0 ||
    inStock !== 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 0 ||
    skinTypes.length ||
    skinConcern.length;

  if (!hasFilters) return null;

  return (
    <VStack align="start" w={64} gap={2} mb={4}>
      {/* <Text fontWeight="bold">Filter Applied</Text> */}
      <Flex wrap="wrap" gap={2}>
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
        {/* {(priceRange[0] !== 0 || priceRange[1] !== 0) && (
          <TagNew
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("price")}
          >
            NPR. {priceRange[0]} - NPR. {priceRange[1]}
          </TagNew>
        )} */}
        {discount !== 0 && (
          <TagNew
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("discount", discount)}
          >
            {discount}% or more
          </TagNew>
        )}
        {inStock !== 0 && (
          <TagNew
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("inStock", inStock)}
          >
            {inStock === 1 ? "In Stock" : "Out of Stock"}
          </TagNew>
        )}
        {skinTypes.map((type) => (
          <TagNew
            key={type}
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("skinType", type)}
          >
            {type}
          </TagNew>
        ))}
        {skinConcern.map((type) => (
          <TagNew
            key={type}
            variant="subtle"
            colorScheme="gray"
            onClose={() => handleRemove("skinConcern", type)}
          >
            {type}
          </TagNew>
        ))}
      </Flex>
    </VStack>
  );
};