"use client";
import React, { useEffect, useState } from "react";

import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { RadioGroup, Radio } from "@/components/ui/radio";

const CITY_OPTIONS = [
  { label: "Highpoint", value: "Highpoint" },
  { label: "Greensboro", value: "Greensboro" },
];

interface CityPopupProps {
  onCitySaved?: () => void;
}

export default function CityPopup({ onCitySaved }: CityPopupProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const [savedCity, setSavedCity] = useState(
    () =>
      (typeof window !== "undefined" && localStorage.getItem("savedCity")) || ""
  );

  useEffect(() => {
    if (savedCity) {
      localStorage.setItem("savedCity", savedCity);
    } else {
      localStorage.removeItem("savedCity");
    }
  }, [savedCity]);

  if (savedCity) {
    return null;
  }

  function handleSaveCity() {
    if (!selectedCity) {
      alert("Please select a city");
      return;
    }
    setSavedCity(selectedCity);

    // Notify parent (Layout) that city has been saved
    onCitySaved?.();

    // Optionally, you can also redirect or do something else here
    // e.g. router.push("/") if you want to force navigation
  }

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      shadow="lg"
      maxWidth="md"
      mx="auto"
      my={8}
      bg="white"
    >
      <VStack align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Select Your City
        </Text>
        <RadioGroup
          value={selectedCity}
          onValueChange={(details) => setSelectedCity(details.value)}
        >
          <VStack align="stretch">
            {CITY_OPTIONS.map(({ label, value }) => (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
        <HStack justifyContent="flex-end">
          <Button colorScheme="blue" onClick={handleSaveCity}>
            Save
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
