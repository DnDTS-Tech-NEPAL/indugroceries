"use client";

import { Stack, Input, Text, VStack, Box, HStack } from "@chakra-ui/react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
// import { Portal, Select, createListCollection } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  // FormProvider,
} from "@/components";
import { useAddPromo, useDeliveryLocationsQuery } from "@/hooks/api";
import { useForm } from "react-hook-form";
import { usePromoFormStore, usePromoStore } from "@/store";
import { useEffect } from "react";

// const countriesCollection = createListCollection({
//   items: [
//     { label: "United States", value: "us" },
//     { label: "Canada", value: "ca" },
//     { label: "United Kingdom", value: "uk" },
//   ],
// });

// const provincesCollection = createListCollection({
//   items: [
//     { label: "California", value: "ca" },
//     { label: "New York", value: "ny" },
//     { label: "Texas", value: "tx" },
//   ],
// });

const ShippingInformation = () => {
  const title = "Shipping Information";
  const { data: deliveryData } = useDeliveryLocationsQuery();
  const { mutate: applyPromo } = useAddPromo();
  const { setPromoData, promoData } = usePromoStore();
  const { setDeliveryLocation } = usePromoFormStore();
  const methods = useForm({
    defaultValues: {
      deliveryLocation: {
        district: "",
        place: "",
      },
    },
  });

  //  const promoCode = methods.watch("promoCode");
  const deliveryLocation = methods.watch("deliveryLocation");

  useEffect(() => {
    const selectedPlace = deliveryLocation?.place || "";

    if (!promoData) {
      applyPromo(
        {
          coupon: "",
          delivery_place: selectedPlace,
          loyalty_points: 0,
        },
        {
          onSuccess: (response) => {
            setPromoData(response.data.data);
          },
        }
      );
    }
  }, [deliveryLocation.place, promoData]);

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
                  <FormHelperText
                    fontStyle="italic"
                    fontSize={"small"}
                    color={"#7A7A7A"}
                  >
                    You will receive surprise gift from us on the purchase of
                    your birthday month.
                  </FormHelperText>
                </FormControl>
              </Stack>

              {/* new address section */}
              {deliveryData && (
                <HStack
                  mt={4}
                  gap={4}
                  align="flex-start"
                  w={"full"}
                  flexWrap="wrap"
                >
                  {/* District Dropdown */}
                  <Box flex="1">
                    <label htmlFor="district">District*</label>
                    <select
                      id="district"
                      onChange={(e) => {
                        methods.setValue(
                          "deliveryLocation.district",
                          e.target.value
                        );
                        methods.setValue("deliveryLocation.place", "");
                        setDeliveryLocation(e.target.value);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginTop: "4px",
                        cursor: "pointer",
                      }}
                      value={methods.watch("deliveryLocation.district") || ""}
                    >
                      <option value="" disabled>
                        Select District
                      </option>
                      {Array.isArray(deliveryData) &&
                        [
                          ...new Set(deliveryData.map((item) => item.district)),
                        ].map((district, index) => (
                          <option key={`district-${index}`} value={district}>
                            {district}
                          </option>
                        ))}
                    </select>
                  </Box>

                  {/* Place Dropdown */}
                  <Box flex="1">
                    <label htmlFor="place">Place*</label>
                    <select
                      id="place"
                      {...methods.register("deliveryLocation.place")}
                      onChange={(e) => {
                        const selectedPlace = e.target.value;

                        methods.setValue(
                          "deliveryLocation.place",
                          selectedPlace
                        );

                        // Apply promo immediately when a place is selected
                        applyPromo(
                          {
                            coupon: "",
                            delivery_place: selectedPlace,
                            loyalty_points: 0,
                          },
                          {
                            onSuccess: (response) => {
                              setDeliveryLocation(selectedPlace);
                              setPromoData(response.data.data);
                            },
                          }
                        );
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginTop: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <option value="" disabled>
                        Select Place
                      </option>
                      {deliveryData
                        .filter(
                          (item) =>
                            item.district ===
                            methods.watch("deliveryLocation.district")
                        )
                        .map((item, index) => (
                          <option key={`place-${index}`} value={item.place}>
                            {item.place}
                          </option>
                        ))}
                    </select>
                  </Box>
                </HStack>
              )}
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
};

export default ShippingInformation;

{
  /* Address Section */
}
{
  /* <Stack direction={{ base: "column", md: "row" }} gap={4}  width="full" >
                 <FormControl isRequired width="full" flex={1}>
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
                </FormControl> 
                <FormControl isRequired flex={1}>
                  <FormLabel>Delivery Address</FormLabel>
                  <Input placeholder="Delivery Address" mt={2} />
                </FormControl>
              </Stack>
              <Stack
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
              </Stack>  */
}
