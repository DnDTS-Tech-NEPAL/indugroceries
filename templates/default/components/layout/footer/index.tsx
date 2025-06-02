"use client";
import Image from "next/image";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Grid,
  Link as ChakraLink,
  Separator,
} from "@chakra-ui/react";
import { useConfigQuery } from "@/hooks/api";
import { calculateHeightAndWidth } from "@/utils";
import Link from "next/link";
import { useFeatureQuery } from "@/hooks/api/(web)/features";
import { useFooterLinks } from "@/hooks/app";
export const Footer = () => {
  const socialLinks = useFooterLinks();
  const { data: config } = useConfigQuery();
  const { data: featuredData } = useFeatureQuery();
  const links = config?.quick_links ?? [];

  const { height, width } = calculateHeightAndWidth(
    config?.width,
    config?.height
  );

  const customer_care = [
    { route: "/my-account", label: "My Account" },
    { route: "/track-order", label: "Track Your Order" },
    { route: "/customer-service", label: "Customer Service" },
    { route: "/returns-exchange", label: "Returns/Exchange" },
    { route: "/product-support", label: "Product Support" },
  ];

  return (
    <Box
      // bg={config?.bg_footer || "#191919"}
      bg={"#191919"}
      px={{ base: 4, md: 8, lg: 12 }}
      pt={10}
    >
      <Box color="system.text.normal.light"  maxW={"5xl"} mx={"auto"}>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "2fr repeat(3, 1fr)",
          }}
          gap={{ base: 8, md: 10 }}
          maxW="7xl"
          mx="auto"
        >
          {/* Company Logo & Description */}
          <VStack align="start" gap={2} color={"#FFFF"}>
            {config?.company_details_url && (
              <Box
                position="relative"
                right={"35px"}
                width={`${width}px`}
                height={`${height}px`}
                minWidth="150px"
              >
                <Image
                  src={config.company_details_url}
                  alt={config.company_details_name || "Company Logo"}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            )}
            <Text fontSize="sm" textAlign="justify" pr={{ lg: 8 }}>
            Phone no:  {config?.contact_number || ""}
            </Text>
             <Text fontSize="sm" textAlign="justify" pr={{ lg: 8 }}>
            Email:  {config?.company_contact_email || ""}
            </Text>
             <Text fontSize="sm" textAlign="justify" pr={{ lg: 8 }}>
            Location:  {config?.location || ""}
            </Text>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" gap={2} color={"#FF6996"}>
            <Text fontWeight="bold" fontSize="lg" pb={2}>
              Quick Links
            </Text>
            {links.map(({ route, label }) => (
              <Link key={route} href={route} passHref legacyBehavior>
                <ChakraLink color={"#D0D0D0"}
                  _hover={{
                    color: "pink.500",
                    textDecoration: "none",
                  }}
                  fontSize="sm"
                  display="block"
                  py={1}
                >
                  {label}
                </ChakraLink>
              </Link>
            ))}
          </VStack>

          {/* Customer Care */}
          <VStack align="start" gap={2} color={"#FF6996"}>
            <Text fontWeight="bold" fontSize="lg" pb={2}>
              Customer Care
            </Text>
            {customer_care.map(({ route, label }) => (
              <Link key={route} href={route} passHref legacyBehavior>
                <ChakraLink color={"#D0D0D0"}
                  _hover={{
                    color: "pink.500",
                    textDecoration: "none",
                  }}
                  fontSize="sm"
                  display="block"
                  py={1}
                >
                  {label}
                </ChakraLink>
              </Link>
            ))}
          </VStack>

          {/* Category */}
          <VStack align="start" gap={2} >
            <Text fontWeight="bold" fontSize="lg" pb={2} color={"#FF6996"}>
              Category
            </Text>
            {featuredData?.map(({ name }, index) => (
              <Text color={"#D0D0D0"}
                key={index}
                _hover={{
                  color: "pink.500",
                  cursor: "pointer",
                }}
                fontSize="sm"
                display="block"
                py={1}
              >
                {name}
              </Text>
            ))}
          </VStack>
        </Grid>
      </Box>

      <Separator my={{ base: 3, md: 4 }} borderColor="#FF6996" />

      {/* Bottom Section */}
      <Box py={4} maxW="7xl" mx="auto" color={"#D0D0D0"}>
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="md" >
             &copy; {new Date().getFullYear()} Korean Beauty Points.
            All rights reserved
          </Text>

          <HStack gap={4}>
            <Text fontSize="sm">
              Follow us:
            </Text>
            {socialLinks.map(({ name, href, icon }) => (
              <Link
                key={name}
                href={href}
                passHref
                target="_blank"
                legacyBehavior
              >
                <ChakraLink
                  aria-label={name}
                  // color="red"
                  _hover={{ color: "blue.500" }}
                  display="flex"
                  color="white"
                  alignItems="center"
                  p={1}
                >
  
                  {icon}
                </ChakraLink>
              </Link>
            ))}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};
