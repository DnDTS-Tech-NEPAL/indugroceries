"use client";
import {
  Box,
  GridItem,
  Text,
  Button,
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
import { useState } from "react";
import { useProductsFilter } from "@/hooks/app";

export const BrandFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 2500]);
const filters = useProductsFilter();
  return (
    <>
      <GridItem>
        <HStack bg={"#D0D0D080"} justify="space-between" py={4} px={4}>
          <Text fontSize="xl" fontWeight={"medium"}>
            Filter by
          </Text>
          <Text color="gray.600" fontSize="xl" fontWeight={"medium"}>
            Reset
          </Text>
        </HStack>
        <Box p={6} shadow={"lg"}>
          <VStack gap={6} align="stretch">
            <AccordionRoot
              // allowMultiple
              as={VStack}
              alignItems="stretch"
            >
              {/* Category Section */}
              <AccordionItem value="category" border="none">
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Category
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2} pt={4}>
                  
                      {filters[1].items.map((item) => (
                        <Checkbox
                          key={item.value}
                          color={"#7A7A7A"}
                          py={2}
                          colorScheme="pink"
                        >
                          {item.title}
                        </Checkbox>
                      ))}
                   
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>

              {/* Discount Section */}
              <AccordionItem
                value="discount"
                borderBottom="1 px solid #D0D0D0"
                p={2}
              >
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Discount
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2} pt={4}>
                    <Checkbox color={"#7A7A7A"} py={2} colorScheme="pink">
                      10% or more
                    </Checkbox>
                    <Checkbox color={"#7A7A7A"} py={2} colorScheme="pink">
                      20% or more
                    </Checkbox>
                    <Checkbox color={"#7A7A7A"} py={2} colorScheme="pink">
                      30% or more
                    </Checkbox>
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>

              <AccordionItem
                value="price"
                borderBottom="1 px solid #D0D0D0"
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
                    defaultValue={[20, 60]}
                    minStepsBetweenThumbs={8}
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

              <AccordionItem value="availability" p={2}>
                <AccordionItemTrigger hasAccordionIcon>
                  <Text fontSize="xl" fontWeight="medium">
                    Availability
                  </Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={2}>
                    <HStack justify="space-between">
                      <Checkbox color={"#7A7A7A"} py={2} colorScheme="pink">
                        In Stock
                      </Checkbox>
                      <Text fontSize="sm" color="gray.600">
                        (15)
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Checkbox color={"#7A7A7A"} py={2} colorScheme="pink">
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


