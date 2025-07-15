"use client";

import { chakra, Flex, HStack, Text, Box, Icon } from "@chakra-ui/react";
import { FaTags, FaChevronDown } from "react-icons/fa";

import { useConfigQuery, useUserProfileQuery } from "@/hooks/api";
import { VisibleSection } from "@/components";
import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
import { Profile } from "@/assets/svg";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CITY_OPTIONS = [
  { label: "Highpoint", value: "Highpoint" },
  { label: "Greensboro", value: "Greensboro" },
];

export const Topbar = () => {
  const { data: config, isLoading: configLoading } = useConfigQuery();
  const {
    data: userProfileData,
    isLoading: isUserLoading,
    isError,
  } = useUserProfileQuery();

  const router = useRouter();

  const showLogin = config?.login_visibility === 1;
  const showRegister = config?.register_visibility === 1;

  const { updateSignInOpen } = useLayoutDialogStore();
  const { updateSignUpOpen } = useRegisterDialogStore();

  const [city, setCity] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && !configLoading) {
      const storedCity = localStorage.getItem("city");
      let defaultCity = "Greensboro";

      if (storedCity) {
        defaultCity = storedCity;
      } else if (config?.top_navbar_city) {
        defaultCity = config.top_navbar_city;
      }

      setCity(defaultCity);
    }
  }, [config, configLoading]);

  useEffect(() => {
    if (typeof window !== "undefined" && city) {
      localStorage.setItem("city", city);
    }
  }, [city]);

  if (configLoading) {
    return null;
  }

  return (
    <VisibleSection visibility={config?.top_navbar_visibility}>
      <HStack
        alignItems="center"
        height="40px"
        background="black"
        color="white"
        fontSize="sm"
        px={{ base: "16px", md: "32px", xl: "64px" }}
      >
        <Flex
          justify="space-between"
          align="center"
          w="full"
          maxW="7xl"
          mx="auto"
        >
          {/* LEFT: Label and City Selector */}
          <Flex align="center" gap={6}>
            <Text>Welcome to InduGrocery!</Text>
            <Flex align="center" gap={1}>
              <Text as="b">City:</Text>

              <Box position="relative" display="inline-block">
                <chakra.select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  bg="transparent"
                  color="white"
                  border="none"
                  outline="none"
                  fontSize="sm"
                  fontWeight="normal"
                  appearance="none"
                  pr={6}
                  cursor="pointer"
                  _focus={{ outline: "none", boxShadow: "none" }}
                  _hover={{ textDecoration: "underline" }}
                >
                  {CITY_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      style={{ color: "black" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </chakra.select>
                <Icon
                  as={FaChevronDown}
                  position="absolute"
                  right="4px"
                  top="50%"
                  transform="translateY(-50%)"
                  fontSize="xs"
                  color="white"
                  pointerEvents="none"
                />
              </Box>
            </Flex>
          </Flex>

          {/* RIGHT: Offer + Auth or Profile */}
          <Flex align="center" gap={6}>
            {/* Offer */}
            <Flex align="center" gap={2}>
              <Icon as={FaTags} />
              <Text>Offer</Text>
            </Flex>

            {/* Divider only if needed */}
            {!isUserLoading &&
              !userProfileData &&
              (showLogin || showRegister) && (
                <Box height="16px" borderRight="1px solid gray" />
              )}

            {/* Auth or Profile */}
            <Flex align="center" gap={2}>
              {!isUserLoading && userProfileData && !isError ? (
                // ✅ Show profile if user is logged in
                <Profile
                  cursor="pointer"
                  height={20}
                  width={20}
                  onClick={() => router.push(ROUTES.USER.PROFILE)}
                />
              ) : (
                // ✅ Show login/register if user not logged in
                <>
                  {showLogin && (
                    <chakra.button
                      onClick={() => updateSignInOpen(true)}
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.200"
                      bg="transparent"
                      _hover={{
                        textDecoration: "underline",
                        color: "blue.300",
                      }}
                    >
                      Login
                    </chakra.button>
                  )}
                  {showLogin && showRegister && (
                    <Text fontSize="sm" color="gray.400">
                      |
                    </Text>
                  )}
                  {showRegister && (
                    <chakra.button
                      onClick={() => updateSignUpOpen(true)}
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.200"
                      bg="transparent"
                      _hover={{
                        textDecoration: "underline",
                        color: "blue.300",
                      }}
                    >
                      Sign Up
                    </chakra.button>
                  )}
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </HStack>
    </VisibleSection>
  );
};
