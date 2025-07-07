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
} from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Checkbox,
} from "@/components";
import { useProductsFilter } from "@/hooks/app";
import { useSkinTypePageQuery } from "@/hooks/api";
import { useBrandFilterStore } from "@/store/products/brandFilterStore";
import { useEffect } from "react";
import { useSkinConcernPageQuery } from "@/hooks/api/(web)/skin-concern";

interface CategoryFilterProps {
  minPrice: number;
  maxPrice: number;
  inStockCount: number;
  outOfStockCount: number;
  isOpen: boolean;
  slug: string;
}

export const CategoryFilter = ({
  minPrice,
  maxPrice,
  inStockCount,
  outOfStockCount,
  isOpen,
  slug,
}: CategoryFilterProps) => {
  const filter = useProductsFilter();
  const categoryFromURL = slug.toLowerCase();
  const {
    brand,
    item_group,
    priceRange,
    discount,
    inStock,
    skinTypes,
    skinConcern,
    setBrand,
    setItemGroup,
    setPriceRange,
    setSkinConcernTypes,
    setDiscount,
    setInStock,
    setSkinTypes,
    resetFilters,
    setPage,
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
    if (brand.includes(value)) {
      setBrand(brand.filter((b) => b !== value));
    } else {
      setBrand([...brand, value]);
    }
  };

  const handleDiscountSelect = (value: number) => {
    setDiscount(discount === value ? 0 : value);
  };

  const { data: skinTypeData } = useSkinTypePageQuery();
  const uniqueSkinTypes = Array.from(
    new Set((skinTypeData || []).map((s) => s.name))
  );

  const handleSkinTypeToggle = (value: string) => {
    if (skinTypes.includes(value)) {
      setSkinTypes(skinTypes.filter((s) => s !== value));
    } else {
      setSkinTypes([...skinTypes, value]);
    }
  };

    const { data: skinConcernTypeData } = useSkinConcernPageQuery();
    const uniqueSkinConcernTypes = Array.from(
      new Set((skinConcernTypeData || []).map((s) => s.name))
    );
  
    const handleSkinConcernTypeToggle = (value: string) => {
      if (skinConcern.includes(value)) {
        setSkinConcernTypes(skinConcern.filter((s) => s !== value));
      } else {
        setSkinConcernTypes([...skinConcern, value]);
      }
    };

  return (
    <GridItem
      width={{ base: "100%", md: "290px" }}
      height={"fit-content"}
      shadow={"lg"}
      borderRadius={"1rem"}
      overflow={"hidden"}
    >
      <Collapsible.Content hidden={!isOpen}>
        <HStack bg={"#D0D0D080"} justify="space-between" py={4} px={4}>
          <Text fontSize="xl" fontWeight={"medium"}>
            Filter by
          </Text>
          <Text
            color="gray.600"
            fontSize="xl"
            fontWeight={"medium"}
            cursor="pointer"
            onClick={() => {
              resetFilters(maxPrice);
            }}
          >
            Reset
          </Text>
        </HStack>

        <Box p={6} shadow={"lg"}>
          <VStack gap={6} align="stretch">
            <AccordionRoot collapsible as={VStack} alignItems="stretch">
              {/* Brand Section */}
              <AccordionItem value="brand">
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" p={2} fontWeight="medium">
                    Brand
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2} pt={4}>
                    {filter[0].items.map((item) => (
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
              {/* Category Section - show only if subcategories exist */}
              {filter[1]?.items?.some(
                (item) =>
                  item.value.toLowerCase() === categoryFromURL &&
                  item.children &&
                  item.children.length > 0
              ) && (
                <AccordionItem value="categories">
                  <AccordionItemTrigger hasAccordionIcon>
                    <Text fontSize="xl" p={2} fontWeight="medium">
                      Category
                    </Text>
                  </AccordionItemTrigger>
                  <AccordionItemContent>
                    <VStack align="stretch" gap={2} pt={4}>
                      {filter[1]?.items?.map((item) => (
                        <>
                          {item.value.toLowerCase() === categoryFromURL &&
                            item.children &&
                            item.children.length > 0 && (
                              <Box key={item.value}>
                                <VStack align="start" pl={6} pt={2}>
                                  {item.children.map((child) => (
                                    <Checkbox
                                      key={child.name}
                                      py={1}
                                      color="#7A7A7A"
                                      fontSize="sm"
                                      colorScheme="pink"
                                      checked={
                                        item_group &&
                                        item_group.includes(child.name)
                                      }
                                      onChange={() =>
                                        handleSubcategoryClick(child.name)
                                      }
                                    >
                                      {child.name}
                                    </Checkbox>
                                  ))}
                                </VStack>
                              </Box>
                            )}
                        </>
                      ))}
                    </VStack>
                  </AccordionItemContent>
                </AccordionItem>
              )}

              {/* Discount Section */}
              <AccordionItem
                value="discount"
                borderBottom="1px solid #D0D0D0"
                p={2}
              >
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
              <AccordionItem
                value="price"
                borderBottom="1px solid #D0D0D0"
                p={2}
              >
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

                  <HStack py={3}>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        From
                      </Text>
                      <Input
                        size="sm"
                        value={`NPR ${priceRange[0]}`}
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
                        value={`NPR ${priceRange[1]}`}
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
              {/* Skin Type Filter */}
              <AccordionItem value="skin-type" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Skin Type
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2} pt={4}>
                    {uniqueSkinTypes.map((type) => (
                      <Checkbox
                        key={type}
                        color="#7A7A7A"
                        py={2}
                        colorScheme="pink"
                        checked={skinTypes.includes(type)}
                        onChange={() => handleSkinTypeToggle(type)}
                      >
                        {type}
                      </Checkbox>
                    ))}
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>
               {/* Skin concern */}
              <AccordionItem value="skin-concern" p={2} border={"none"}>
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
