"use client";
import {
  Box,
  GridItem,
  Text,
  Input,
  VStack,
  HStack,
  Slider,
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
import { useEffect } from "react";

interface BrandFilterProps {
  minPrice: number;
  maxPrice: number;
  inStockCount: number;
  outOfStockCount: number;
}

export const BrandFilter = ({
  minPrice,
  maxPrice,
  inStockCount,
  outOfStockCount,
}: BrandFilterProps) => {
  const filter = useProductsFilter();
  const {
    category,
    priceRange,
    discount,
    inStock,
    setCategory,
    setPriceRange,
    setDiscount,
    setInStock,
    resetFilters,
  } = useBrandFilterStore();

  // Initialize price range when component mounts or maxPrice changes
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice, setPriceRange]);

  const handleCategoryToggle = (value: string) => {
    if (category.includes(value)) {
      setCategory(category.filter((c) => c !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleDiscountSelect = (value: number) => {
    setDiscount(discount === value ? 0 : value);
  };

  const { data: skinTypeData } = useSkinTypePageQuery();
  const uniqueSkinTypes = Array.from(
    new Set((skinTypeData || []).map((s) => s.name))
  );
  const { skinTypes, setSkinTypes } = useBrandFilterStore();

  const handleSkinTypeToggle = (value: string) => {
    if (skinTypes.includes(value)) {
      setSkinTypes(skinTypes.filter((s) => s !== value));
    } else {
      setSkinTypes([...skinTypes, value]);
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
            {/* Category Section */}
            <AccordionItem value="category" p={2}>
              <AccordionItemTrigger hasAccordionIcon>
                <Text fontSize="xl" fontWeight="medium">
                  Category
                </Text>
              </AccordionItemTrigger>
              <AccordionItemContent>
                <VStack align="stretch" gap={2} pt={4}>
                  {filter[1].items.map((item) => (
                    <Checkbox
                      key={item.value}
                      color={"#7A7A7A"}
                      py={2}
                      colorScheme="pink"
                      checked={category.includes(item.title)}
                      onChange={() => handleCategoryToggle(item.title)}
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
                      color={"#7A7A7A"}
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
                  // minStepsBetweenThumbs={Math.min(
                  //   10,
                  //   Math.floor((maxPrice - minPrice) / 1)
                  // )}
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
                      borderRadius={"full"}
                      minH={0}
                      height={"33px"}
                      width={"full"}
                      size="sm"
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
                      color={"#7A7A7A"}
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
                      color={"#7A7A7A"}
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
            <AccordionItem value="skin-type" border={"none"} p={2}>
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
          </AccordionRoot>
        </VStack>
      </Box>
    </GridItem>
  );
};
