"use client";
import Image from "next/image";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Stack,
  Grid,
  Link as ChakraLink,
  Separator,
} from "@chakra-ui/react";
import { useConfigQuery } from "@/hooks/api";
import { useSocialLinks } from "@/hooks/app";
import { calculateHeightAndWidth } from "@/utils";
import Link from "next/link";
import { useFeatureQuery } from "@/hooks/api/(web)/features";

export const Footer = () => {
  const socialLinks = useSocialLinks();
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
      bg={config?.bg_footer || "gray.50"}
      px={{ base: 4, md: 8, lg: 12 }}
      pt={10}
    >
      <Box color="system.text.normal.light">
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
          <VStack align="start" gap={4}>
            {config?.company_details_url && (
              <Box
                position="relative"
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
              {config?.footer_description || ""}
            </Text>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" gap={4}>
            <Text fontWeight="bold" fontSize="lg" pb={2}>
              Quick Links
            </Text>
            {links.map(({ route, label }) => (
              <Link key={route} href={route} passHref legacyBehavior>
                <ChakraLink
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
          <VStack align="start" gap={4}>
            <Text fontWeight="bold" fontSize="lg" pb={2}>
              Customer Care
            </Text>
            {customer_care.map(({ route, label }) => (
              <Link key={route} href={route} passHref legacyBehavior>
                <ChakraLink
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
          <VStack align="start" gap={4}>
            <Text fontWeight="bold" fontSize="lg" pb={2}>
              Category
            </Text>
            {featuredData?.map(({ name }) => (
              <Text
                _hover={{
                  color: "pink.500",
                  cursor: "pointer",
                }}
                fontSize="sm"
                display="block"
                py={1}
              >
                {" "}
                {name}
              </Text>
            ))}
          </VStack>
        </Grid>
      </Box>

      <Separator my={{ base: 6, md: 8 }} borderColor="gray.200" />

      {/* Bottom Section */}
      <Box py={4} maxW="7xl" mx="auto">
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm" color="gray.600">
            Copyright &copy; {new Date().getFullYear()} Korean Beauty Points.
            All rights reserved
          </Text>

          <HStack gap={4}>
            <Text fontSize="sm" color="gray.600">
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
                  color="gray.500"
                  _hover={{ color: "blue.500" }}
                  display="flex"
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
