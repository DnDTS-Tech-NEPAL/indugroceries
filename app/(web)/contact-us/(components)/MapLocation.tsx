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
      <iframe
        width="100%"
        height="100%"
        src={mapSrc}
        style={{ border: "none" }}
        data-testid="iframe"
      />
      <Box
        position="absolute"
        bottom="16px"
        left="16px"
        bg="#E4E4E4"
        p={4}
        borderRadius="md"
        boxShadow="lg"
        w={{ md: "280px", lg: "300px", xl: "380px" }}
      >
        <VStack align="start" gap={4}>
          {[
            { label: "Mail", value: `${config.company_contact_email}` },
            { label: "Location", value: `${config.location}` },
            { label: "Contact Number", value: `${config.contact_number}` },
          ].map(({ label, value }) => (
            <Flex justify="space-between" width="full" key={label}>
              <Text
                variant="subtitle2"
                color="system.neutral.separator.black.dark"
              >
                {label}
              </Text>
              <Text variant="subtitle2" color="primary.300">
                {value}
              </Text>
            </Flex>
          ))}

          <Flex justify="space-between" width="full">
            <Text
              variant="subtitle2"
              color="system.neutral.separator.black.dark"
            >
              Follow us
            </Text>
            <HStack gap={2}>
              {socialLinks.map(({ name, href, icon }) => (
                <Box
                  key={name}
                  bg="white"
                  borderRadius="full"
                  p={1}
                  display="inline-flex"
                >
                  <Link
                    key={name}
                    href={href}
                    aria-label={name}
                    target="_blank"
                  >
                    {icon}
                  </Link>
                </Box>
              ))}
            </HStack>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};
