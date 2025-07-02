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
import Link from "next/link";
import { useConfigQuery } from "@/hooks/api";
import { calculateHeightAndWidth } from "@/utils";
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

  const customerCare = [
    { route: "/my-account", label: "My Account" },
    { route: "/track-order", label: "Track your Order" },
    { route: "/customer-service", label: "Customer Service" },
    { route: "/returns-exchange", label: "Returns/Exchange" },
    { route: "/product-support", label: "Product Support" },
  ];

  return (
    <Box bg="#191919" px={{ base: 4, md: 8, lg: 12 }} pt={10}>
      <Box color="#D0D0D0" maxW="4xl" mx="auto">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "2fr repeat(3, 1fr)" }}
          gap={{ base: 8, md: 10, lg: 12  }}
        >
          <VStack align="start" gap={2} color="white">
            {config?.footer_logo_url && (
              <Box position="relative" w={`${width}px`} h={`${height}px`}>
                <Image
                  src={config.footer_logo_url}
                  alt={config.company_details_name || "Company Logo"}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            )}
          
              <Text fontSize="sm">Phone No: {config?.contact_number || ""}</Text>
            <Text fontSize="sm">Email: {config?.company_contact_email || ""}</Text>
            <Text fontSize="sm">Location: {config?.location || ""}</Text>
           
          </VStack>

          <VStack align="start" gap={2} color="#FF6996">
            <Text fontWeight="bold" fontSize="lg">Quick Links</Text>
            {links.map(({ route, label }) => (
              <Link key={label} href={route} passHref legacyBehavior>
                <ChakraLink
                  color="#D0D0D0"
                  _hover={{ color: "pink.500", textDecoration: "none" }}
                  fontSize="sm"
                  py={1}
                >
                  {label}
                </ChakraLink>
              </Link>
            ))}
          </VStack>

          <VStack align="start" gap={2} color="#FF6996">
            <Text fontWeight="bold" fontSize="lg">Customer Care</Text>
            {customerCare.map(({ route, label }) => (
              <Link key={route} href={route} passHref legacyBehavior>
                <ChakraLink
                  color="#D0D0D0"
                  _hover={{ color: "pink.500", textDecoration: "none" }}
                  fontSize="sm"
                  py={1}
                >
                  {label}
                </ChakraLink>
              </Link>
            ))}
          </VStack>

          <VStack align="start" gap={2} color="#FF6996">
            <Text fontWeight="bold" fontSize="lg">Category</Text>
            {featuredData?.map(({ name }, index) => (
              <Text
                key={index}
                color="#D0D0D0"
                _hover={{ color: "pink.500", cursor: "pointer" }}
                fontSize="sm"
                py={1}
              >
                {name}
              </Text>
            ))}
          </VStack>
        </Grid>
      </Box>

      <Separator my={2} borderColor="#FF6996" />

      <Box py={2} maxW="6xl" mx="auto" color="#D0D0D0">
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Korean Beauty Point. All rights reserved.
          </Text>

          <HStack gap={4} align="center">
            <Text fontSize="sm">Follow Us On:</Text>
            {socialLinks.map(({ name, href, icon }) => (
              <Link key={name} href={href} target="_blank" passHref legacyBehavior>
                <ChakraLink
                  aria-label={name}
                  color="white"
                  display="flex"
                  alignItems="center"
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

