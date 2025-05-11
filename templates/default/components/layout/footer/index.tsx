"use client";
import Image from "next/image";
import { Box, Flex, HStack, Text, Link } from "@chakra-ui/react";
import { useConfigQuery } from "@/hooks/api";
import { useSocialLinks } from "@/hooks/app";

export const Footer = () => {
  const socialLinks = useSocialLinks();
  const { data: config } = useConfigQuery();
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="#4D524F" color="white">
      {/* Top Section */}
      <Flex
        maxW={"7xl"}
        mx="auto"
        px={{ base: 4, sm: 8, md: 2 }}
        py={{ base: 8, md: 12 }}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={4}
      >
        {/* Logo */}
        <Box width={180} height={70} position="relative">
          {config?.company_details_url && (
            <Image
              src={config.company_details_url}
              alt={config.company_details_name}
              fill
              style={{
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          )}
        </Box>

        {/* Navigation Links */}
        <HStack gap={4} flexWrap="wrap" justify="center" color="white">
          {config.quick_links.map((link, index) => (
            <Link
              href={link.route}
              key={index}
              fontSize="sm"
              color="white"
              _hover={{ color: "gray.300" }}
            >
              {link.label}
            </Link>
          ))}
        </HStack>
        {/* Social Links */}
        <HStack gap={4}>
          {socialLinks.map(({ name, href, icon }) => (
            <Link href={href} key={name} aria-label={name}>
              <Box fontSize="lg" color="white" _hover={{ color: "gray.300" }}>
                {icon}
              </Box>
            </Link>
          ))}
        </HStack>
      </Flex>

      {/* Divider Line */}
      <Box maxW={"7xl"} mx={"auto"}>
        <Box borderTop="1px solid white" />
      </Box>

      {/* Bottom Section */}
      <Flex
        maxW="1280px"
        mx="auto"
        px={{ base: 4, sm: 8, md: 12 }}
        py={10}
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        fontSize="sm"
        color="white"
        gap={6}
      >
        <Text>© {currentYear} Hama Global. All rights reserved.</Text>
        <HStack gap={4}>
          <Link
            href="/privacy-policy"
            textDecoration="underline"
            color="white"
            _hover={{ color: "gray.300" }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            textDecoration="underline"
            color="white"
            _hover={{ color: "gray.300" }}
          >
            Terms of Service
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};
