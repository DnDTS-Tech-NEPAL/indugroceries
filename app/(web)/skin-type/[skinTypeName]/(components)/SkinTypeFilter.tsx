"use client";

import {
  Box,
  GridItem,
  Text,
  Input,
  VStack,
  HStack,
  Slider,
  Collapsible,
  IconButton,
} from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Checkbox,
} from "@/components";
import { useBrandFilterStore } from "@/store/products/brandFilterStore";
import { useProductsFilter } from "@/hooks/app";
import { useEffect } from "react";
import { useSkinConcernPageQuery } from "@/hooks/api/(web)/skin-concern";
import RecursiveCategoryList from "@/components/helper/RecursiveCategoryList";
// import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { SelectedFilters } from "@/components/ui/filter";

interface BrandFilterProps {
  minPrice: number;
  maxPrice: number;
  inStockCount: number;
  outOfStockCount: number;
  isOpen: boolean;
}

export const SkinTypeFilter = ({
  minPrice,
  maxPrice,
  inStockCount,
  outOfStockCount,
  isOpen,
}: BrandFilterProps) => {
  const filter = useProductsFilter();
  const {
    brand,
    item_group,
    priceRange,
    discount,
    inStock,
    skinConcern,
    setItemGroup,
    setPage,
    setBrand,
    setSkinConcernTypes,
    setPriceRange,
    setDiscount,
    setInStock,
    resetFilters,
  } = useBrandFilterStore();

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice, setPriceRange]);

  const handleSubcategoryClick = (name: string) => {
    const newValue =
      item_group && item_group.includes(name)
        ? item_group.filter((g) => g !== name)
        : [name];

    setItemGroup(newValue);
    setPage(1);
  };

  const handleBrandToggle = (value: string) => {
    setBrand(
      brand.includes(value)
        ? brand.filter((b) => b !== value)
        : [...brand, value]
    );
  };

  const handleDiscountSelect = (value: number) => {
    setDiscount(discount === value ? 0 : value);
  };

  const handleSkinConcernTypeToggle = (value: string) => {
    setSkinConcernTypes(
      skinConcern.includes(value)
        ? skinConcern.filter((s) => s !== value)
        : [...skinConcern, value]
    );
  };

  const { data: skinConcernTypeData } = useSkinConcernPageQuery();
  const uniqueSkinConcernTypes = Array.from(
    new Set((skinConcernTypeData || []).map((s) => s.name))
  );

  const brandItems = filter[0]?.items || [];
  return (
    <GridItem
      width={{ base: "100%", md: "290px" }}
      height="fit-content"
      shadow="lg"
      borderRadius="1rem"
      overflow="hidden"
    >
      <Collapsible.Content hidden={!isOpen}>
        <HStack bg="#D0D0D080" justify="space-between" py={4} px={4}>
          <Text fontSize="xl" fontWeight="medium">
            Filter by
          </Text>
          <Text
            color="gray.600"
            fontSize="xl"
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {
              resetFilters(maxPrice);
            }}
          >
            Reset
          </Text>
        </HStack>

        <Box p={6}>
          <SelectedFilters />
          <VStack gap={6} align="stretch">
            <AccordionRoot collapsible as={VStack} alignItems="stretch">
              {/* Category Section */}

              <AccordionItem value="category" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Category
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="start" gap={2} w="full">
                    {filter[1]?.items?.map((item) => {
                      const hasChildren =
                        Array.isArray(item.children) &&
                        item.children.length > 0;

                      return hasChildren ? (
                        <Collapsible.Root
                          key={item.value}
                          style={{ width: "100%" }}
                        >
                          <HStack justify="space-between" w="full">
                            <Checkbox
                              py={2}
                              color="#7A7A7A"
                              fontSize="sm"
                              colorScheme="pink"
                              checked={
                                item_group?.includes(item.title) ?? false
                              }
                              onChange={() =>
                                handleSubcategoryClick(item.title)
                              }
                            >
                              {/* <Link
                                href={`/category/${encodeURIComponent(item.title)}`}
                              > */}
                              {item.title}
                              {/* </Link> */}
                            </Checkbox>

                            <Collapsible.Trigger asChild>
                              <IconButton
                                size="sm"
                                mt={1}
                                variant="plain"
                                aria-label="Toggle Subcategories"
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
                                selected={item_group ?? []}
                                onToggle={handleSubcategoryClick}
                              />
                            </Box>
                          </Collapsible.Content>
                        </Collapsible.Root>
                      ) : (
                        <Box key={item.value} w="full">
                          <Checkbox
                            py={2}
                            color="#7A7A7A"
                            fontSize="sm"
                            colorScheme="pink"
                            checked={item_group?.includes(item.title) ?? false}
                            onChange={() => handleSubcategoryClick(item.title)}
                          >
                            {item.title}
                          </Checkbox>
                        </Box>
                      );
                    })}
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>
              {/* Brand Section */}
              <AccordionItem value="brand">
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" p={2} fontWeight="medium">
                    Brand
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack
                    align="stretch"
                    gap={2}
                    pt={4}
                    maxH={"500px"}
                    overflow={"auto"}
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "0px",
                        height: "0px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "transparent",
                      },
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {brandItems.map((item) => (
                      <Checkbox
                        key={item.value}
                        color="#7A7A7A"
                        py={2}
                        colorScheme="pink"
                        checked={brand.includes(item.title)}
                        onChange={() => handleBrandToggle(item.title)}
                      >
                        {item.title}
                      </Checkbox>
                    ))}
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>

              {/* Discount Section */}
              <AccordionItem value="discount" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Discount
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2} pt={4}>
                    {[10, 20, 30, 40, 50].map((val) => (
                      <Checkbox
                        key={val}
                        color="#7A7A7A"
                        py={2}
                        colorScheme="pink"
                        checked={discount === val}
                        onChange={() => handleDiscountSelect(val)}
                      >
                        {val}% or more
                      </Checkbox>
                    ))}
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>

              {/* Price Section */}
              <AccordionItem value="price" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Price
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <Slider.Root
                    maxW="md"
                    value={priceRange}
                    step={1}
                    min={minPrice}
                    max={maxPrice}
                    onValueChange={(details: { value: number[] }) => {
                      const value = Array.isArray(details?.value)
                        ? details.value
                        : [minPrice, maxPrice];
                      setPriceRange([value[0], value[1]]);
                    }}
                  >
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumbs />
                    </Slider.Control>
                  </Slider.Root>

                  <HStack width="full" py={3}>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        From
                      </Text>
                      <Input
                        size="sm"
                        borderRadius="full"
                        height="33px"
                        width="full"
                        value={`NPR. ${priceRange[0]}`}
                        readOnly
                        bg="white"
                      />
                    </Box>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        To
                      </Text>
                      <Input
                        size="sm"
                        borderRadius="full"
                        height="33px"
                        width="full"
                        value={`NPR. ${priceRange[1]}`}
                        readOnly
                        bg="white"
                      />
                    </Box>
                  </HStack>
                </AccordionItemContent>
              </AccordionItem>

              {/* Availability Section */}
              <AccordionItem value="availability" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Availability
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2}>
                    <HStack justify="space-between">
                      <Checkbox
                        color="#7A7A7A"
                        py={2}
                        colorScheme="pink"
                        checked={inStock === 1}
                        onChange={() => setInStock(inStock === 1 ? 0 : 1)}
                      >
                        In Stock
                      </Checkbox>
                      <Text fontSize="sm" color="gray.600">
                        ({inStockCount})
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Checkbox
                        color="#7A7A7A"
                        py={2}
                        colorScheme="pink"
                        checked={inStock === 2}
                        onChange={() => setInStock(inStock === 2 ? 0 : 2)}
                      >
                        Out of Stock
                      </Checkbox>
                      <Text fontSize="sm" color="gray.600">
                        ({outOfStockCount})
                      </Text>
                    </HStack>
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>

              {/* Skin Concern Section */}
              <AccordionItem value="skin-concern" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Skin Concern
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2} pt={4}>
                    {uniqueSkinConcernTypes.map((type) => (
                      <Checkbox
                        key={type}
                        color="#7A7A7A"
                        py={2}
                        colorScheme="pink"
                        checked={skinConcern.includes(type)}
                        onChange={() => handleSkinConcernTypeToggle(type)}
                      >
                        {type}
                      </Checkbox>
                    ))}
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </VStack>
        </Box>
      </Collapsible.Content>
    </GridItem>
  );
};
