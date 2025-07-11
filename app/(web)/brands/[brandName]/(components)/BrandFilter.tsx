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
import { useSkinTypePageQuery } from "@/hooks/api";
import { useSkinConcernPageQuery } from "@/hooks/api/(web)/skin-concern";
import { useEffect } from "react";
import RecursiveCategoryList from "@/components/helper/RecursiveCategoryList";
import { LuChevronDown } from "react-icons/lu";
import Link from "next/link";

interface BrandFilterProps {
  minPrice: number;
  maxPrice: number;
  inStockCount: number;
  outOfStockCount: number;
  isOpen: boolean;
}

export const BrandFilter = ({
  minPrice,
  maxPrice,
  inStockCount,
  outOfStockCount,
  isOpen,
}: BrandFilterProps) => {
  const filter = useProductsFilter();

  const {
    item_group,
    priceRange,
    discount,
    inStock,
    skinTypes,
    skinConcern,
    setItemGroup,
    setSkinTypes,
    setSkinConcernTypes,
    setPriceRange,
    setDiscount,
    setInStock,
    resetFilters,
    setPage,
  } = useBrandFilterStore();

  useEffect(() => {
    if (minPrice < maxPrice) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, setPriceRange]);

  const handleSubcategoryClick = (name: string) => {
    const newValue = item_group?.includes(name)
      ? item_group.filter((g) => g !== name)
      : [...(item_group ?? []), name];

    setItemGroup(newValue);
    setPage(1);
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

  // clamp value between min and max
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);

  // priceRange to ensure valid slider input
  const sanitizedPriceRange =
    Array.isArray(priceRange) && priceRange.length === 2
      ? [
          clamp(priceRange[0], minPrice, maxPrice),
          clamp(priceRange[1], minPrice, maxPrice),
        ]
      : [minPrice, maxPrice];

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

        <Box p={6}>
          <VStack gap={6} align="stretch">
            <AccordionRoot collapsible as={VStack} alignItems="stretch">
              {/* Category  */}
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
                              <Link
                                href={`/category/${encodeURIComponent(item.title)}`}
                              >
                                {item.title}
                              </Link>
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

              {/* Discount */}
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

              {/* Price */}
              <AccordionItem value="price" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Price
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  {minPrice < maxPrice ? (
                    <Slider.Root
                      maxW="md"
                      value={sanitizedPriceRange}
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
                  ) : (
                    <Text color="gray.500">Price filter not available</Text>
                  )}

                  <HStack width={"full"} py={3}>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        From
                      </Text>
                      <Input
                        size="sm"
                        borderRadius={"full"}
                        minH={0}
                        height={"33px"}
                        width={"full"}
                        value={`NPR. ${sanitizedPriceRange[0]}`}
                        readOnly
                        bg="white"
                      />
                    </Box>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        To
                      </Text>
                      <Input
                        borderRadius={"full"}
                        minH={0}
                        height={"33px"}
                        width={"full"}
                        size="sm"
                        value={`NPR. ${sanitizedPriceRange[1]}`}
                        readOnly
                        bg="white"
                      />
                    </Box>
                  </HStack>
                </AccordionItemContent>
              </AccordionItem>

              {/* Availability */}
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

              {/* Skin Type */}
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

              {/* Skin Concern */}
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
