"use client";

import { Box, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react";

import { useConfigQuery } from "@/hooks/api";
import { useSocialLinks } from "@/hooks/app";
import { MapLocationProps } from "@/types";

export const MapLocation = ({ data }: MapLocationProps) => {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(data?.latitude)},${encodeURIComponent(data?.longitude)}&hl=en&z=14&output=embed`;
  const { data: config } = useConfigQuery();
  const socialLinks = useSocialLinks();

  return (
    <Box
      w={{
        base: "full",
        lg: "450px",
        xl: "630px",
      }}
      h={{ base: "500px", md: "600px", lg: "auto" }}
      mt={["20px", "20px", "50px"]}
      position="relative"
      flexShrink={0}
    >
      {/* Map iframe */}
      <iframe
        width="100%"
        height="100%"
        src={mapSrc}
        style={{ border: "none" }}
        data-testid="iframe"
      />

      {/* Contact info box - now positioned better */}
      <Box
        position="absolute"
        bottom={{ base: "16px", md: "24px" }}
        left={{ base: "16px", md: "24px" }}
        right={{ base: "16px", md: "auto" }}
        bg="rgba(228, 228, 228, 0.9)" // slightly transparent
        p={4}
        borderRadius="md"
        boxShadow="lg"
        maxW={{
          base: "calc(100% - 32px)",
          md: "280px",
          lg: "300px",
          xl: "380px",
        }}
      >
        <VStack align="start">
          {" "}
          {/* Changed gap to spacing for better consistency */}
          {[
            { label: "Mail", value: `${config.company_contact_email}` },
            { label: "Location", value: `${config.location}` },
            { label: "Contact Number", value: `${config.contact_number}` },
          ].map(({ label, value }) => (
            <Flex justify="space-between" width="full" key={label}>
              <Text
                variant="subtitle2"
                color="system.neutral.separator.black.dark"
                flexShrink={0}
                mr={2}
              >
                {label}
              </Text>
              <Text
                variant="subtitle2"
                color="primary.300"
                textAlign="right"
                maxW="180px"
              >
                {value}
              </Text>
            </Flex>
          ))}
          <Box width="full" pt={2}>
            <Text
              variant="subtitle2"
              color="system.neutral.separator.black.dark"
              mb={2}
            >
              Follow us
            </Text>
            <HStack>
              {" "}
              {/* Changed gap to spacing */}
              {socialLinks.map(({ name, href, icon }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  _hover={{ transform: "scale(1.1)" }}
                  transition="transform 0.2s"
                >
                  <Box
                    bg="white"
                    borderRadius="full"
                    p={2}
                    display="inline-flex"
                    boxShadow="md"
                  >
                    {icon}
                  </Box>
                </Link>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
