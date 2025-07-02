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

interface BrandFilterProps {
  minPrice: number;
  maxPrice: number;
}

export const BrandFilter = ({ minPrice, maxPrice }: BrandFilterProps) => {
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

  return (
    <>
      <GridItem>
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
              resetFilters();
              setPriceRange([minPrice, maxPrice]);
            }}
          >
            Reset
          </Text>
        </HStack>
        <Box p={6} shadow={"lg"}>
          <VStack gap={6} align="stretch">
            <AccordionRoot as={VStack} alignItems="stretch">
              {/* Category Section */}
              <AccordionItem value="category" border="none">
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
              <AccordionItem value="discount" borderBottom="1 px solid #D0D0D0" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Discount
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2} pt={4}>
                    {[10, 20, 30].map((val) => (
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
              <AccordionItem value="price" borderBottom="1 px solid #D0D0D0" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Price
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <Slider.Root
                    maxW="md"
                    value={priceRange}
                    minStepsBetweenThumbs={10}
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
                      <Input size="sm" value={`NPR ${priceRange[0]}`} readOnly bg="white" />
                    </Box>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        To
                      </Text>
                      <Input size="sm" value={`NPR ${priceRange[1]}`} readOnly bg="white" />
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
                        (15)
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
                        (7)
                      </Text>
                    </HStack>
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </VStack>
        </Box>
      </GridItem>
    </>
  );
};
