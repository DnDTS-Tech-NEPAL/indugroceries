"use client";

import { Stack, Input, Text, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components";

const countriesCollection = createListCollection({
  items: [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
  ],
});

const provincesCollection = createListCollection({
  items: [
    { label: "California", value: "ca" },
    { label: "New York", value: "ny" },
    { label: "Texas", value: "tx" },
  ],
});

const ShippingInformation = () => {
  const title = "Shipping Information";

  return (
    <VStack alignItems="stretch">
      <AccordionRoot
        collapsible
        as={VStack}
        alignItems="stretch"
        defaultValue={[title]}
      >
        <AccordionItem value={title} border="none">
          <AccordionItemTrigger hasAccordionIcon isOpen>
            <Text fontSize="xl" fontWeight={500}>
              {title}
            </Text>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <VStack align="start" gap={4} spaceY={4} mt={4}>
              {/* Name Section */}
              <Stack
                direction={{ base: "column", md: "row" }}
                gap={6}
                width="full"
              >
                <FormControl isRequired flex={1}>
                  <FormLabel>Full Name</FormLabel>
                  <Input placeholder="Full Name" mt={2} />
                </FormControl>
                {/* <FormControl isRequired flex={1}>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder="Last Name" mt={2} />
                </FormControl> */}
              </Stack>

              {/* Contact Section */}
              <Stack
                direction={{ base: "column", md: "row" }}
                gap={4}
                width="full"
              >
                <FormControl isRequired flex={1}>
                  <FormLabel>Email Address</FormLabel>
                  <Input type="email" placeholder="Email Address" mt={2} />
                </FormControl>
                <FormControl isRequired flex={1}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="tel" placeholder="Phone Number" mt={2} />
                </FormControl>
              </Stack>

              {/* Date of birth */}
              <Stack width={"full"}>
                <FormControl isRequired flex={1}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    placeholder="Select Date"
                    mt={2}
                    variant="outline"
                    borderRadius="md"
                  />
                  <FormHelperText fontStyle="italic" fontSize={"small"} color={"#7A7A7A"}>
                    You will receive surprise gift from us on the purchase of
                    your birthday month.
                  </FormHelperText>
                </FormControl>
              </Stack>

              {/* Address Section */}
              <Stack
                direction={{ base: "column", md: "row" }}
                gap={4}
                width="full"
              >
                {/* <FormControl isRequired width="full" flex={1}>
                  <FormLabel>Country / Region</FormLabel>
                  <Select.Root
                    collection={countriesCollection}
                    size="sm"
                    mt={2}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText
                          placeholder="Select country"
                          height={"45px"}
                          display={"flex"}
                          alignItems={"center"}
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {countriesCollection.items.map((country) => (
                            <Select.Item item={country} key={country.value}>
                              {country.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </FormControl> */}

                <FormControl isRequired flex={1}>
                  <FormLabel>Delivery Address</FormLabel>
                  <Input placeholder="Delivery Address" mt={2} />
                </FormControl>
              </Stack>

              {/* <Stack
                direction={{ base: "column", md: "row" }}
                gap={4}
                width="full"
              >
                <FormControl isRequired flex={1}>
                  <FormLabel>Province/State</FormLabel>
                  <Select.Root
                    collection={provincesCollection}
                    size="sm"
                    mt={2}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText
                          placeholder="Select province"
                          height={"45px"}
                          display={"flex"}
                          alignItems={"center"}
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {provincesCollection.items.map((province) => (
                            <Select.Item item={province} key={province.value}>
                              {province.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </FormControl>

                <FormControl isRequired flex={1}>
                  <FormLabel>City</FormLabel>
                  <Input placeholder="City" mt={2} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Zip Code</FormLabel>
                  <Input placeholder="Zip Code" mt={2} />
                </FormControl>
              </Stack> */}
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
};

export default ShippingInformation;
