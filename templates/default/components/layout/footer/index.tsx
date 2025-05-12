// "use client";
// import Image from "next/image";
// import { Box, Flex, HStack, Text, Link } from "@chakra-ui/react";
// import { useConfigQuery } from "@/hooks/api";
// import { useSocialLinks } from "@/hooks/app";

// export const Footer = () => {
//   const socialLinks = useSocialLinks();
//   const { data: config } = useConfigQuery();
//   const currentYear = new Date().getFullYear();

//   return (
//     <Box bg="#4D524F" color="white">
//       {/* Top Section */}
//       <Flex
//         maxW={"7xl"}
//         mx="auto"
//         px={{ base: 4, sm: 8, md: 2 }}
//         py={{ base: 8, md: 12 }}
//         direction={{ base: "column", md: "row" }}
//         justify="space-between"
//         align="center"
//         gap={4}
//       >
//         {/* Logo */}
//         <Box width={180} height={70} position="relative">
//           {config?.company_details_url && (
//             <Image
//               src={config.company_details_url}
//               alt={config.company_details_name}
//               fill
//               style={{
//                 objectFit: "contain",
//                 filter: "brightness(0) invert(1)",
//               }}
//             />
//           )}
//         </Box>

//         {/* Navigation Links */}
//         <HStack gap={4} flexWrap="wrap" justify="center" color="white">
//           {config.quick_links.map((link, index) => (
//             <Link
//               href={link.route}
//               key={index}
//               fontSize="sm"
//               color="white"
//               _hover={{ color: "gray.300" }}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </HStack>
//         {/* Social Links */}
//         <HStack gap={4}>
//           {socialLinks.map(({ name, href, icon }) => (
//             <Link href={href} key={name} aria-label={name}>
//               <Box fontSize="lg" color="white" _hover={{ color: "gray.300" }}>
//                 {icon}
//               </Box>
//             </Link>
//           ))}
//         </HStack>
//       </Flex>

//       {/* Divider Line */}
//       <Box maxW={"7xl"} mx={"auto"}>
//         <Box borderTop="1px solid white" />
//       </Box>

//       {/* Bottom Section */}
//       <Flex
//         maxW="1280px"
//         mx="auto"
//         px={{ base: 4, sm: 8, md: 12 }}
//         py={10}
//         direction={{ base: "column", md: "row" }}
//         justify="center"
//         align="center"
//         fontSize="sm"
//         color="white"
//         gap={6}
//       >
//         <Text>© {currentYear} Hama Global. All rights reserved.</Text>
//         <HStack gap={4}>
//           <Link
//             href="/privacy-policy"
//             textDecoration="underline"
//             color="white"
//             _hover={{ color: "gray.300" }}
//           >
//             Privacy Policy
//           </Link>
//           <Link
//             href="/terms-of-service"
//             textDecoration="underline"
//             color="white"
//             _hover={{ color: "gray.300" }}
//           >
//             Terms of Service
//           </Link>
//         </HStack>
//       </Flex>
//     </Box>
//   );
// };



"use client";
import Image from "next/image";
import { Box, Flex, HStack, Text, VStack, Stack, Grid } from "@chakra-ui/react";

import { useConfigQuery } from "@/hooks/api";
import { useContactsList, useSocialLinks } from "@/hooks/app";
import { calculateHeightAndWidth } from "@/utils";
import Link from "next/link";

export const Footer = () => {
  const contactsList = useContactsList();
  const socialLinks = useSocialLinks();

  const { data: config } = useConfigQuery();
  const links = config?.quick_links ?? [];

  const { height, width } = calculateHeightAndWidth(
    config?.width,
    config?.height
  );
  return (
    <>
      <Box bg={config.bg_footer} px={{ base: 6, md: 12 }}>
        <Box py={{ base: 6, md: 4 }} color="system.text.normal.light">
          <Grid
            templateColumns={{ base: "1fr", md: "2fr 1fr 2fr" }}
            gap={10}
            maxW="1280px"
            alignItems={"center"}
            mx="auto"
          >
            {/* Company Logo & Description */}
            <VStack align="start">
              <Box
                position="relative"
                width={`${width}px`}
                height={`${height}px`}
              >
                {config?.company_details_url && (
                  <Image
                    src={config.company_details_url}
                    alt={config.company_details_name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                )}
              </Box>
              <Text fontSize="sm" textAlign="justify" w={{ lg: "80%" }}>
                {config?.footer_description || ""}
              </Text>
            </VStack>

            {/* Quick Links */}
            <VStack align="start" spaceX={6}>
              <Text
                fontWeight="bold"
                fontSize="lg"
                pb={2}
                borderBottom="4px solid"
                borderColor="green.200"
              >
                Quick Links
              </Text>
              {links.map(({ route, label }) => (
                <Link key={route} href={route} passHref legacyBehavior>
                  <Text
                    _hover={{
                      color: "green.500",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    fontSize="sm"
                  >
                    {label}
                  </Text>
                </Link>
              ))}
            </VStack>
            {/* Contact */}
            <VStack align="start" spaceX={6}>
              <Text
                fontWeight="bold"
                fontSize="lg"
                pb={2}
                borderBottom="4px solid"
                borderColor="green.200"
              >
                Contact
              </Text>
              {contactsList.map(({ name, label, icon }) => (
                <HStack key={name} align="center">
                  {icon}
                  <Text fontSize="sm">{label}</Text>
                </HStack>
              ))}
            </VStack>
          </Grid>
        </Box>

         {/* Bottom Section */}
      <Box
        mx="auto"
        py={3}
        px={{ base: 6, md: 12 }}
      >
        <Flex
          direction={{ sm: "row", base: "column" }}
          justify="space-between"
          align="center"
          gap={4}
          // color="system.text.normal.dark"
          maxW={"1280px"}
          mx={"auto"}
          flexWrap="wrap"
        >
          <Stack
            direction="row"
            gap={{ base: 4, md: 8 }}
            wrap="wrap"
            justify={{ base: "center", md: "flex-start" }}
          >
            <Text fontSize="sm">
              Copyright © {new Date().getFullYear()} Hama Global
            </Text>
          </Stack>

          <HStack gap={4}>
            <Text fontSize="sm">Follow us:</Text>
            {socialLinks.map(({ name, href, icon }) => (
              <Link key={name} href={href} passHref target="_blank">
                <Box
                  aria-label={name}
                  color="gray.100"
                  _hover={{ color: "blue.500" }}
                >
                  {icon}
                </Box>
              </Link>
            ))}
          </HStack>
        </Flex>
      </Box>
      </Box>
     
    </>
  );
};