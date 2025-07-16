"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Flex, HStack, Input, InputGroup } from "@chakra-ui/react";

import {
  useCartCountQuery,
  useConfigQuery,
  // useUserProfileQuery,
  useWishlistCountQuery,
} from "@/hooks/api";
import { useNavMenuQuery } from "@/hooks/api/navMenu";
import { useAuthentication } from "@/hooks/app";
import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
import { extractMenu } from "@/utils";
import { getOrCreateGuestId } from "@/utils/guest";

import { ROUTES, navbarIconsList } from "@/constants";
import { NavItem } from "./NavItem";
import { Sidebar } from "../sidebar";
import { VisibleSection } from "@/components/ui/visibleSection";
import { LoginDialog, RegisterDialog } from "@/components";
// import { Profile } from "@/assets/svg"; // ← Uncomment when needed

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const guid = getOrCreateGuestId() ?? ""; // Always a valid string

  const { data: config } = useConfigQuery();
  const { data: NavbarData } = useNavMenuQuery();
  const navItems = extractMenu(NavbarData);

  // const { height, width } = calculateHeightAndWidth(
  //   config?.width,
  //   config?.height
  // );

  const { authenticate } = useAuthentication();
  const { signInOpen, updateSignInOpen } = useLayoutDialogStore();
  const { signUpOpen, updateSignUpOpen } = useRegisterDialogStore();

  const { data: wishlistCount } = useWishlistCountQuery(guid);
  const { data: cartCount } = useCartCountQuery(guid);
  // const { data: userProfileData, isLoading, isError } = useUserProfileQuery();

  const wishlistTotalCount = wishlistCount?.count ?? "";
  const cartTotalCount = cartCount?.count ?? "";

  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed.length > 0) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else if (pathname === "/search") {
      router.push(ROUTES.APP.HOMEPAGE);
    }
  }, [searchInput]);

  return (
    <>
      {/* ----------------------- TOP HEADER ----------------------- */}
      <Flex
        top="0"
        bg="white"
        shadow="sm"
        zIndex={30}
        px={{ base: "16px", lg: "24px", xl: "32px", "2xl": "40px" }}
        py="10px"
        justify="space-between"
        align="center"
      >
        {/* Logo */}
        <Link href={ROUTES.APP.HOMEPAGE}>
          <Box
            position="relative"
            width={config?.width}
            height={config?.height}
          >
            <Image
              src={config?.company_details_url}
              alt={config?.company_details_name}
              loading="eager"
              fill
            />
          </Box>
        </Link>

        {/* Search Input */}
        <InputGroup width="50%">
          <Input
            borderRadius="full"
            placeholder="Search for products"
            borderColor="primary.500"
            borderWidth="1px"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputGroup>

        {/* Icons */}
        <HStack gap="12px">
          {/* Wishlist */}
          <VisibleSection visibility={config?.wishlist_visibility}>
            <Box position="relative" cursor="pointer">
              <Flex
                onClick={() =>
                  authenticate(navbarIconsList[1].href, () =>
                    updateSignInOpen(true)
                  )
                }
              >
                {navbarIconsList[1].icon}
                {wishlistTotalCount !== "" && wishlistTotalCount > 0 && (
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
                    {wishlistTotalCount}
                  </Box>
                )}
              </Flex>
            </Box>
          </VisibleSection>

          {/* Cart */}
          <VisibleSection visibility={config?.cart_visibility}>
            <Box position="relative" cursor="pointer">
              <Flex
                onClick={() =>
                  authenticate(navbarIconsList[2].href, () =>
                    updateSignInOpen(true)
                  )
                }
              >
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
                    {cartTotalCount}
                  </Box>
                )}
              </Flex>
            </Box>
          </VisibleSection>

          {/* Profile Icon (currently commented out) */}
          {/*
          {userProfileData && !isLoading && !isError && (
            <Profile
              cursor="pointer"
              height={22}
              width={22}
              onClick={() => router.push(ROUTES.USER.PROFILE)}
            />
          )}
          */}
        </HStack>
      </Flex>

      {/* --------------------- NAVIGATION MENU --------------------- */}
      <Flex
        justify="center"
        align="center"
        gap="24px"
        py="15px"
        borderTop="1px solid"
        borderColor="gray.100"
        bg="primary.default"
        color="white"
        zIndex={100}
      >
        {navItems?.map(({ href, menuName, subMenus, isMega }) => (
          <NavItem
            key={menuName}
            menu_redirect_link={href}
            menuName={menuName}
            is_mega_menu={isMega}
          >
            {subMenus}
          </NavItem>
        ))}
      </Flex>

      {/* ------------------------ MOBILE SIDEBAR ------------------------ */}
      <Box
        display={{ base: "block", lg: "none" }}
        position="absolute"
        right="20px"
        top="20px"
        cursor="pointer"
        onClick={() => setIsSidebarOpen(true)}
      >
        {navbarIconsList[3].icon}
      </Box>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* ------------------------ AUTH DIALOGS ------------------------ */}
      <LoginDialog open={signInOpen} onClose={() => updateSignInOpen(false)} />
      <RegisterDialog
        open={signUpOpen}
        onClose={() => updateSignUpOpen(false)}
      />
    </>
  );
};
