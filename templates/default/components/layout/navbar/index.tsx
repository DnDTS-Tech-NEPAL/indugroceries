import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Box, Button, Flex, HStack, useDisclosure } from "@chakra-ui/react";

import { LoginDialog, RegisterDialog, SearchDialog } from "@/components";
import { navbarIconsList, ROUTES } from "@/constants";
import {
  useCartCountQuery,
  useConfigQuery,
  useUserProfileQuery,
  useWishlistCountQuery,
} from "@/hooks/api";
import { useAuthentication } from "@/hooks/app";
import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
import { calculateHeightAndWidth, extractMenu } from "@/utils";

import { NavItem } from "./NavItem";
import { Sidebar } from "../sidebar";
import { VisibleSection } from "@/components/ui/visibleSection";
import { Profile } from "@/assets/svg";

export const Navbar = () => {
  const { data: config } = useConfigQuery();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    open: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const navItems = extractMenu(config.menu_table);

  const { height, width } = calculateHeightAndWidth(
    config.width,
    config.height
  );

  const { authenticate } = useAuthentication();

  const { signInOpen, updateSignInOpen } = useLayoutDialogStore();
  const { signUpOpen, updateSignUpOpen } = useRegisterDialogStore();

  const { data: wishlistCount } = useWishlistCountQuery();

  const { data: cartCount } = useCartCountQuery();

  const wishlistTotalCount = wishlistCount?.count ?? "";

  const cartTotalCount = cartCount?.count ?? "";
  const { data: userProfileData, isLoading, isError } = useUserProfileQuery();

  return (
    <>
      <HStack
        position="sticky"
        top="0"
        bg={"white"}
        shadow={"sm"}
        zIndex={10}
        alignItems="center"
        px={{
          base: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "40px",
        }}
      >
        <HStack
          justifyContent="space-between"
          mx="auto"
          maxWidth="1280px"
          width="full"
          color="system.text.normal.dark"
        >
          <Link href={ROUTES.APP.HOMEPAGE}>
            <Box
              position="relative"
              // width={`${width}px`}
              // height={`${height}px`}
              width={180}
              height={70}
            >
              <Image
                src={config.company_details_url}
                alt={config.company_details_name}
                loading="eager"
                fill
              />
            </Box>
          </Link>

          <HStack
            display={{
              base: "none",
              lg: "flex",
            }}
            gap="16px"
          >
            {navItems.map(({ href, menuName, subMenus }) => (
              <NavItem
                key={menuName}
                href={href}
                menuName={menuName}
                subMenus={subMenus}
              />
            ))}
            {/* display either authentication menu or profile after user profile api has been fetched */}
            {!isLoading && (
              <>
                {userProfileData && !isError ? (
                  <>
                    <HStack gap="24px" color="primary.400">
                      {/* Search Icon */}
                      <VisibleSection
                        // visibility={config?.search_box_visibility}
                      >
                        <Box cursor="pointer" onClick={onSearchOpen}>
                          {navbarIconsList[0].icon}
                        </Box>
                      </VisibleSection>
                      <VisibleSection 
                      // visibility={config?.wishlist_visibility}
                      >
                        {/* Favorite Icon */}
                        <Box
                          cursor="pointer"
                          position="relative"
                          onClick={() =>
                            authenticate(navbarIconsList[1].href, () =>
                              updateSignInOpen(true)
                            )
                          }
                        >
                          {/* Icon with badge */}
                          <Flex position="relative">
                            {navbarIconsList[1].icon}
                            {wishlistTotalCount !== "" &&
                              wishlistTotalCount > 0 && (
                                <Box
                                  position="absolute"
                                  top="-1"
                                  right="-1"
                                  bg="red.500"
                                  color="white"
                                  fontSize="8px"
                                  borderRadius="full"
                                  w="3.5"
                                  h="3.5"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  {wishlistCount?.count}
                                </Box>
                              )}
                          </Flex>
                        </Box>
                      </VisibleSection>
                      {/* Cart Icon */}
                      <VisibleSection visibility={config?.cart_visibility}>
                        <Box
                          cursor="pointer"
                          onClick={() =>
                            authenticate(navbarIconsList[2].href, () =>
                              updateSignInOpen(true)
                            )
                          }
                        >
                          <Flex position="relative">
                            {navbarIconsList[2].icon}
                            {cartTotalCount !== "" && cartTotalCount > 0 && (
                              <Box
                                position="absolute"
                                top="-1"
                                right="-1"
                                bg="red.500"
                                color="white"
                                fontSize="8px"
                                borderRadius="full"
                                w="3.5"
                                h="3.5"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                {cartCount?.count}
                              </Box>
                            )}
                          </Flex>{" "}
                        </Box>
                      </VisibleSection>
                    </HStack>
                    <Link href="/profile">
                      <Button
                        bg={"white"}
                        w={"24px"}
                        h={"24px"}
                        color={"black"}
                        cursor="pointer"
                      >
                        <Profile />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Box display="flex" gap="8px">
                      <VisibleSection visibility={config?.login_visibility}>
                        <Button
                          color="black"
                          bg="gray.200"
                          borderRadius={"sm"}
                          cursor="pointer"
                          onClick={() => updateSignInOpen(true)}
                        >
                          Login
                        </Button>
                      </VisibleSection>
                      <VisibleSection visibility={config?.register_visibility}>
                        <Button
                          color="white"
                          bg="#16CA5E"
                          cursor="pointer"
                          borderRadius={"sm"}
                          onClick={() => updateSignUpOpen(true)}
                        >
                          Partner With Us
                        </Button>
                      </VisibleSection>
                    </Box>
                  </>
                )}
              </>
            )}
          </HStack>

          <Box
            display={{
              base: "block",
              lg: "none",
            }}
            cursor="pointer"
            color={"black"}
            onClick={() => setIsSidebarOpen(true)}
          >
            {navbarIconsList[3].icon}
          </Box>
        </HStack>
      </HStack>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <SearchDialog open={isSearchOpen} onClose={onSearchClose} />
      <LoginDialog open={signInOpen} onClose={() => updateSignInOpen(false)} />

      <RegisterDialog
        open={signUpOpen}
        onClose={() => updateSignUpOpen(false)}
      />
    </>
  );
};
