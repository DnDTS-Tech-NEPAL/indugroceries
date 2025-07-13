// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   HStack,
//   Input,
//   useDisclosure,
// } from "@chakra-ui/react";

// import { LoginDialog, RegisterDialog, SearchDialog } from "@/components";
// import { navbarIconsList, ROUTES } from "@/constants";
// import {
//   useCartCountQuery,
//   useConfigQuery,
//   useUserProfileQuery,
//   useWishlistCountQuery,
// } from "@/hooks/api";
// import { useAuthentication } from "@/hooks/app";
// import { useLayoutDialogStore, useRegisterDialogStore } from "@/store";
// import { calculateHeightAndWidth, extractMenu } from "@/utils";

// import { NavItem } from "./NavItem";
// import { Sidebar } from "../sidebar";
// import { VisibleSection } from "@/components/ui/visibleSection";
// import { Login, Profile, Register } from "@/assets/svg";
// import { useNavMenuQuery } from "@/hooks/api/navMenu";
// import { ProfileDropdown } from "@/app/(user)/profile";

// export const Navbar = () => {
//   const { data: config } = useConfigQuery();
//   const { data: NavbarData } = useNavMenuQuery();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const {
//     open: isSearchOpen,
//     onOpen: onSearchOpen,
//     onClose: onSearchClose,
//   } = useDisclosure();

//   const navItems = extractMenu(NavbarData);

//   const { height, width } = calculateHeightAndWidth(
//     config.width,
//     config.height
//   );

//   const { authenticate } = useAuthentication();

//   const { signInOpen, updateSignInOpen } = useLayoutDialogStore();
//   const { signUpOpen, updateSignUpOpen } = useRegisterDialogStore();

//   const { data: wishlistCount } = useWishlistCountQuery();

//   const { data: cartCount } = useCartCountQuery();

//   const wishlistTotalCount = wishlistCount?.count ?? "";

//   const cartTotalCount = cartCount?.count ?? "";
//   const { data: userProfileData, isLoading, isError } = useUserProfileQuery();

//   return (
//     <>
//       <HStack
//         position="sticky"
//         top="0"
//         bg={"white"}
//         shadow={"sm"}
//         zIndex={30}
//         alignItems="center"
//         px={{
//           base: "16px",
//           lg: "24px",
//           xl: "32px",
//           "2xl": "40px",
//         }}
//       >
//         <HStack
//           justifyContent="space-between"
//           mx="auto"
//           maxWidth="1280px"
//           width="full"
//           color="system.text.normal.dark"
//         >
//           <Link href={ROUTES.APP.HOMEPAGE}>
//             <Box
//               position="relative"
//               // width={`${width}px`}
//               // height={`${height}px`}
//               width={180}
//               height={70}
//             >
//               <Image
//                 src={config.company_details_url}
//                 alt={config.company_details_name}
//                 loading="eager"
//                 fill
//               />
//             </Box>
//           </Link>

//           <HStack
//             display={{
//               base: "none",
//               lg: "flex",
//             }}
//             gap="16px"
//           >
//             {navItems?.map(({ href, menuName, subMenus, isMega }) => (
//               <NavItem
//                 key={menuName}
//                 menu_redirect_link={href}
//                 menuName={menuName}
//                 is_mega_menu={isMega}
//                 children={subMenus}
//               />
//             ))}

//             {/* display either authentication menu or profile after user profile api has been fetched */}
//             {!isLoading && (
//               <>
//                 {/* Search Input */}
//                 <VisibleSection
//                 // visibility={config?.search_box_visibility}
//                 >
//                   <Box
//                     display="flex"
//                     alignItems="center"
//                     gap="8px"
//                     pl={"15px"}
//                     borderRadius="full"
//                     border="1px solid"
//                     borderColor="gray.200"
//                     width="200px"
//                   >
//                     {navbarIconsList[0].icon}
//                     <Input
//                       border={"none"}
//                       borderRadius={"2rem"}
//                       width={"100%"}
//                       px={"16px"}
//                       placeholder="Search your style"
//                       fontSize="sm"
//                       color="gray.500"
//                       _placeholder={{ color: "gray.500" }}
//                       onClick={onSearchOpen}
//                     />
//                   </Box>
//                 </VisibleSection>

//                 {userProfileData && !isError ? (
//                   <>
//                     <HStack gap="24px" color="primary.400">
//                       <VisibleSection
//                       // visibility={config?.wishlist_visibility}
//                       >
//                         {/* Favorite Icon */}
//                         <Box
//                           cursor="pointer"
//                           position="relative"
//                           onClick={() =>
//                             authenticate(navbarIconsList[1].href, () =>
//                               updateSignInOpen(true)
//                             )
//                           }
//                         >
//                           {/* Icon with badge */}
//                           <Flex position="relative">
//                             {navbarIconsList[1].icon}
//                             {wishlistTotalCount !== "" &&
//                               wishlistTotalCount > 0 && (
//                                 <Box
//                                   position="absolute"
//                                   top="-1"
//                                   right="-1"
//                                   bg="red.500"
//                                   color="white"
//                                   fontSize="8px"
//                                   borderRadius="full"
//                                   w="3.5"
//                                   h="3.5"
//                                   display="flex"
//                                   alignItems="center"
//                                   justifyContent="center"
//                                 >
//                                   {wishlistCount?.count}
//                                 </Box>
//                               )}
//                           </Flex>
//                         </Box>
//                       </VisibleSection>
//                       {/* Cart Icon */}
//                       <VisibleSection visibility={config?.cart_visibility}>
//                         <Box
//                           cursor="pointer"
//                           onClick={() =>
//                             authenticate(navbarIconsList[2].href, () =>
//                               updateSignInOpen(true)
//                             )
//                           }
//                         >
//                           <Flex position="relative">
//                             {navbarIconsList[2].icon}
//                             {cartTotalCount !== "" && cartTotalCount > 0 && (
//                               <Box
//                                 position="absolute"
//                                 top="-1"
//                                 right="-1"
//                                 bg="red.500"
//                                 color="white"
//                                 fontSize="8px"
//                                 borderRadius="full"
//                                 w="3.5"
//                                 h="3.5"
//                                 display="flex"
//                                 alignItems="center"
//                                 justifyContent="center"
//                               >
//                                 {cartCount?.count}
//                               </Box>
//                             )}
//                           </Flex>{" "}
//                         </Box>
//                       </VisibleSection>
//                       <ProfileDropdown />
//                     </HStack>
//                   </>
//                 ) : (
//                   <>
//                     <Box display="flex" gap="8px">
//                       <VisibleSection visibility={config?.login_visibility}>
//                         <Button
//                           color="black"
//                           bg="gray.200"
//                           borderRadius={"sm"}
//                           cursor="pointer"
//                           onClick={() => updateSignInOpen(true)}
//                         >
//                          <Login/> Login
//                         </Button>
//                       </VisibleSection>
//                       <VisibleSection visibility={config?.register_visibility}>
//                         <Button
//                           color="white"
//                           bg="#FF6996"
//                           cursor="pointer"
//                           borderRadius={"sm"}
//                           onClick={() => updateSignUpOpen(true)}
//                         >
//                        <Register/>   Register
//                         </Button>
//                       </VisibleSection>
//                     </Box>
//                   </>
//                 )}
//               </>
//             )}
//           </HStack>

//           <Box
//             display={{
//               base: "block",
//               lg: "none",
//             }}
//             cursor="pointer"
//             color={"black"}
//             onClick={() => setIsSidebarOpen(true)}
//           >
//             {navbarIconsList[3].icon}
//           </Box>
//         </HStack>
//       </HStack>

//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//       <SearchDialog open={isSearchOpen} onClose={onSearchClose} />
//       <LoginDialog open={signInOpen} onClose={() => updateSignInOpen(false)} />

//       <RegisterDialog
//         open={signUpOpen}
//         onClose={() => updateSignUpOpen(false)}
//       />
//     </>
//   );
// };
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Box, Button, Flex, HStack, Input, InputGroup } from "@chakra-ui/react";

import { LoginDialog, RegisterDialog } from "@/components";
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

import { Sidebar } from "../sidebar";
import { VisibleSection } from "@/components/ui/visibleSection";
import { Login, Profile, Register } from "@/assets/svg";
import { useNavMenuQuery } from "@/hooks/api/navMenu";
import { NavItem } from "./NavItem";

export const Navbar = () => {
  const router = useRouter();
  const { data: config } = useConfigQuery();
  const { data: NavbarData } = useNavMenuQuery();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = extractMenu(NavbarData);

  const { height, width } = calculateHeightAndWidth(
    config.width,
    config.height
  );

  const { authenticate } = useAuthentication();
  const { signInOpen, updateSignInOpen } = useLayoutDialogStore();
  const { signUpOpen, updateSignUpOpen } = useRegisterDialogStore();

  const { data: wishlistCount } = useWishlistCountQuery();
  const { data: cartCount } = useCartCountQuery();
  const { data: userProfileData, isLoading, isError } = useUserProfileQuery();

  const wishlistTotalCount = wishlistCount?.count ?? "";
  const cartTotalCount = cartCount?.count ?? "";
  const [searchInput, setSearchInput] = useState("");

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
      {/* Top Header */}
      <Flex
        position="sticky"
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
          <Box position="relative" width={180} height={70}>
            <Image
              src={config.company_details_url}
              alt={config.company_details_name}
              loading="eager"
              fill
            />
          </Box>
        </Link>
        {/* Search Input */}
        <InputGroup
          // flex="1"
          width={"50%"}
          startElement={navbarIconsList[0].icon}
          // width={"560px"}
        >
          <Input
            borderRadius={"full"}
            placeholder="Search for products"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputGroup>

        {/* Icons + Auth */}
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
          {/* Auth Section */}
          {!isLoading && userProfileData && !isError ? (
            // ✅ Show profile icon if logged in
            <Profile
              cursor={"pointer"}
              height={22}
              width={22}
              onClick={() => router.push(ROUTES.USER.PROFILE)}
            />
          ) : (
            // ✅ Show Login/Register buttons if not logged in
            <>
              <Button
                bg="gray.200"
                color="black"
                borderRadius="full"
                px="20px"
                onClick={() => updateSignInOpen(true)}
              >
                <Login />
                Login
              </Button>
              <Button
                bg="#FF6996"
                color="white"
                borderRadius="full"
                px="20px"
                onClick={() => updateSignUpOpen(true)}
              >
                <Register />
                Register
              </Button>
            </>
          )}

       
        </HStack>
      </Flex>

      {/* Bottom Navigation */}
      <Flex
        justify="center"
        align="center"
        gap="24px"
        py="18px"
        borderTop="1px solid"
        borderColor="gray.100"
        bg="white"
        zIndex={100}
      >
        {navItems?.map(({ href, menuName, subMenus, isMega }) => (
          <NavItem
            key={menuName}
            menu_redirect_link={href}
            menuName={menuName}
            is_mega_menu={isMega}
            children={subMenus}
          />
        ))}
      </Flex>

      {/* Mobile Sidebar */}
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

      <LoginDialog open={signInOpen} onClose={() => updateSignInOpen(false)} />
      <RegisterDialog
        open={signUpOpen}
        onClose={() => updateSignUpOpen(false)}
      />
    </>
  );
};
