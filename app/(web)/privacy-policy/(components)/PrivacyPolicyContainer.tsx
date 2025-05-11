"use client";
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { usePrivacyPolicy } from "@/hooks/api";

export const PrivacyPolicyContainer = () => {
  const { data: PrivacyData } = usePrivacyPolicy();
  return (
    <Box
      px={{ base: "16px", lg: "24px", xl: "32px", "2xl": "40px" }}
      py={{ base: "24px", lg: "40px", "2xl": "60px" }}
      bgGradient="linear(to-b, white, gray.100)"
      minH="100vh"
    >
      <Box
        mx="auto"
        maxW="1280px"
        p={{ base: 6, md: 10 }}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="2xl"
        boxShadow="2xl"
        bg="white"
        transition="all 0.3s ease-in-out"
        _hover={{ boxShadow: "dark-lg" }}
      >
        <Stack gap={12}>
          {/* Page Header */}
          <VStack align="start" gap={4}>
            <Heading
              fontSize={{ base: "2xl", lg: "4xl" }}
              fontWeight="bold"
              color="primary.600"
            >
              {PrivacyData?.data.data.page_title}
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color="gray.600"
              lineHeight="1.8"
            >
              {PrivacyData?.data.data.page_subtitle}
            </Text>
          </VStack>
          {/* Content */}
          <VStack align="start" gap={10}>
            {PrivacyData?.data?.data?.page_content?.map((privacy, index) => (
              <Box key={index} w="full">
                <VStack align="start" gap={4}>
                  <Text
                    fontSize={{ base: "xl", lg: "2xl" }}
                    fontWeight="semibold"
                    color="primary.600"
                  >
                    {privacy.title}
                  </Text>

                  <Text
                    fontSize={{ base: "md", lg: "lg" }}
                    color="gray.500"
                    fontStyle="italic"
                  >
                    {privacy.subtitle}
                  </Text>

                  <Box
                    w="full"
                    bg="gray.50"
                    p={6}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="sm"
                  >
                    <Text
                      fontSize={{ base: "sm", lg: "lg" }}
                      color="gray.700"
                      lineHeight="1.9"
                      dangerouslySetInnerHTML={{ __html: privacy.content }}
                    />
                  </Box>
                </VStack>
              </Box>
            ))}
          </VStack>
        </Stack>
      </Box>
    </Box>
  );
};
