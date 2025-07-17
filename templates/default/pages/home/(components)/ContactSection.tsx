"use client";
import { useConfigQuery } from "@/hooks/api";
import { Box, Flex, Heading, Text, VStack, Link } from "@chakra-ui/react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

interface ContactItem {
  icon: React.ReactElement;
  label: string;
  value: string;
  href?: string;
  isLink?: boolean;
}

export const HomepageContact = () => {
  const { data: config, isLoading } = useConfigQuery();

  if (isLoading || !config) {
    // Optional: return null or a spinner/loading placeholder here
    return null;
  }

  const contactItems: ContactItem[] = [
    {
      icon: <FiMail color="#4A5568" />,
      label: "Email",
      value: config.company_contact_email || "",
      href: `mailto:${config.company_contact_email || ""}`,
      isLink: true,
    },
    {
      icon: <FiPhone color="#4A5568" />,
      label: "Phone",
      value: config.contact_number || "",
      href: `tel:${config.contact_number || ""}`,
      isLink: true,
    },
    {
      icon: <FiMapPin color="#4A5568" />,
      label: "Office",
      value: config.location || "",
      isLink: false,
    },
  ];

  return (
    <Box maxW={"7xl"} mx={"auto"} py={12} px={{ base: 6, md: 12 }}>
      <Flex
        justifyContent={{ lg: "space-between" }}
        alignItems={{ lg: "flex-start" }}
        mx="auto"
        direction={{ base: "column", md: "row" }}
        gap={12}
      >
        {/* Left Column - Contact Info */}
        <Box>
          <VStack align="start" gap={6}>
            <Heading
              as="h4"
              size="md"
              fontSize={"48px"}
              fontWeight="medium"
              color="gray.700"
            >
              Get in Touch
            </Heading>

            <Text
              color="gray.600"
              lineHeight="tall"
              fontSize={"18px"}
              width={{ lg: "700px" }}
            >
              We’re all about making connections! Whether you have a quick
              question or want to explore a potential partnership, don’t
              hesitate to get in touch.
            </Text>
          </VStack>
        </Box>

        {/* Right Column - Contact Details */}
        <Box>
          <VStack align="start" gap={6}>
            {contactItems.map((item, index) => (
              <Box key={index}>
                <Flex align="center" gap={3} mb={1}>
                  {item.icon}
                  <Text fontWeight="medium" color="gray.700">
                    {item.label}
                  </Text>
                </Flex>
                {item.isLink ? (
                  <Link
                    href={item.href}
                    textDecoration="underline"
                    color="gray.600"
                    display="block"
                    ml="28px"
                  >
                    {item.value}
                  </Link>
                ) : (
                  <Text color="gray.600" display="block" ml="28px">
                    {item.value}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};
