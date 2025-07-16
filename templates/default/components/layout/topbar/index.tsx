"use client";

import { chakra, Flex, HStack, Text, Box, Icon } from "@chakra-ui/react";
import { FaTags, FaChevronDown, FaUser } from "react-icons/fa";

import { useConfigQuery, useUserProfileQuery } from "@/hooks/api";
import { VisibleSection } from "@/components";
import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
import { Profile } from "@/assets/svg";
import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
const CITY_OPTIONS = createListCollection({
  items: [
    { label: "Highpoint", value: "Highpoint" },
    { label: "Greensboro", value: "Greensboro" },
  ],
});

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

              <Box position="relative" display="inline-block" color={"white"}>
                {/* <chakra.select
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
                      style={{ color: "black", padding: "10px" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </chakra.select> */}
                {/* <Select.Root
                  collection={CITY_OPTIONS}
                  size="sm"
                  width="320px"
                  defaultValue={["pro"]}
                  border="none"
                >
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {CITY_OPTIONS.items.map((city) => (
                          <Select.Item item={city} key={city.value}>
                            {city.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root> */}

                <Select.Root
                  collection={CITY_OPTIONS}
                  size="sm"
                  width="120px"
                  value={[city]}
                  onValueChange={(details) => {
                    const newCity = details?.value?.[0];
                    if (newCity) setCity(newCity);
                  }}
                  outline={"none"}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {CITY_OPTIONS.items.map((city) => (
                          <Select.Item item={city} key={city.value}>
                            <Select.ItemText>{city.label}</Select.ItemText>

                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
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
                      <Icon as={FaUser} mr={1} />
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

// const Demo = () => {
//   return (
//     <Select.Root collection={frameworks} size="sm" width="320px">
//       <Select.HiddenSelect />
//       <Select.Label>Select framework</Select.Label>
//       <Select.Control>
//         <Select.Trigger>
//           <Select.ValueText placeholder="Select framework" />
//         </Select.Trigger>
//         <Select.IndicatorGroup>
//           <Select.Indicator />
//         </Select.IndicatorGroup>
//       </Select.Control>
//       <Portal>
//         <Select.Positioner>
//           <Select.Content>
//             {frameworks.items.map((framework) => (
//               <Select.Item item={framework} key={framework.value}>
//                 {framework.label}
//                 <Select.ItemIndicator />
//               </Select.Item>
//             ))}
//           </Select.Content>
//         </Select.Positioner>
//       </Portal>
//     </Select.Root>
//   );
// };

// const frameworks = createListCollection({
//   items: [
//     { label: "React.js", value: "react" },
//     { label: "Vue.js", value: "vue" },
//     { label: "Angular", value: "angular" },
//     { label: "Svelte", value: "svelte" },
//   ],
// });
