"use client";
import React, { useEffect, useState } from "react";
import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { RadioGroup, Radio } from "@/components/ui/radio";
import { Button } from "@/components";

const CITY_OPTIONS = [
  {
    label: "Highpoint",
    value: "Highpoint",
    icon: "https://cdn-icons-png.flaticon.com/512/3063/3063793.png",
    buildingIcon: "https://cdn-icons-png.flaticon.com/512/489/489870.png",
  },
  {
    label: "Greensboro",
    value: "Greensboro",
    icon: "https://cdn-icons-png.flaticon.com/512/4280/4280317.png",
    buildingIcon: "https://cdn-icons-png.flaticon.com/512/489/489870.png",
  },
];

interface CityPopupProps {
  onCitySaved?: () => void;
}

export default function CityPopup({ onCitySaved }: CityPopupProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [storedCity, setStoredCity] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const city = localStorage.getItem("selectedCity");
      setStoredCity(city);
    }
  }, []);

  if (storedCity) return null;

  function handleSaveCity() {
    if (!selectedCity) {
      alert("Please select a city");
      return;
    }

    // Save directly to localStorage
    localStorage.setItem("city", selectedCity);
    setStoredCity(selectedCity); // To trigger re-render and hide popup
    onCitySaved?.();
  }

  return (
    <Box
      position="fixed"
      inset="0"
      bg="rgba(0, 0, 0, 0.6)"
      zIndex="overlay"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backdropFilter="blur(8px)"
    >
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="2xl"
        shadow="2xl"
        maxWidth={{ base: "90%", md: "2xl" }}
        w="100%"
        bg="white"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          bgGradient: "linear(to-r, primary.400, primary.700)",
          borderTopRadius: "2xl",
        }}
      >
        <VStack align="stretch">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color="gray.800"
            mb={2}
          >
            Select Your City
          </Text>
          <Text textAlign="center" color="gray.600" mb={4}>
            Choose your nearest location for personalized content
          </Text>

          <RadioGroup
            value={selectedCity}
            onValueChange={(details) => setSelectedCity(details.value)}
          >
            <HStack justify="center" flexWrap="wrap">
              {CITY_OPTIONS.map(({ label, value, icon, buildingIcon }) => (
                <Box
                  key={value}
                  as="label"
                  cursor="pointer"
                  borderWidth="2px"
                  borderRadius="xl"
                  p={4}
                  w={{ base: "140px", md: "160px" }}
                  transition="all 0.2s"
                  borderColor={selectedCity === value ? "primary" : "gray.100"}
                  bg={selectedCity === value ? "primary.100" : "white"}
                  _hover={{
                    transform: "translateY(-4px)",
                    shadow: "md",
                    borderColor: "primary.300",
                  }}
                >
                  <VStack>
                    <Image
                      src={icon}
                      alt={label}
                      boxSize="60px"
                      objectFit="contain"
                    />
                    <Image
                      src={buildingIcon}
                      alt="Building"
                      boxSize="30px"
                      objectFit="contain"
                      opacity={0.8}
                    />
                    <Text fontWeight="medium" color="gray.700">
                      {label}
                    </Text>
                    <Radio value={value} />
                  </VStack>
                </Box>
              ))}
            </HStack>
          </RadioGroup>

          <Button
            colorScheme="green"
            onClick={handleSaveCity}
            alignSelf="center"
            borderRadius="full"
            w={32}
            h={12}
            fontSize="lg"
            fontWeight="bold"
            shadow="md"
            _hover={{
              shadow: "lg",
              transform: "translateY(-2px)",
            }}
            _active={{
              transform: "translateY(0)",
            }}
          >
            Save
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
