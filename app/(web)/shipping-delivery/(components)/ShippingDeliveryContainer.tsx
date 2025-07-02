"use client";

import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { useShippingDelivery } from "@/hooks/api";

const ShippingDelivery = () => {
  const { data: ReturnData } = useShippingDelivery();

  const title =
    ReturnData?.data?.data.page_title?.trim() || "Shipping & Delivery";
  const content = ReturnData?.data?.data.content || "";
  const lastUpdated = ReturnData?.data?.data.last_updated || "";

  if (!ReturnData?.data) return null; // Optional: avoid rendering empty page

  return (
    <Box
      px={{ base: "16px", lg: "24px", xl: "32px", "2xl": "40px" }}
      py={{ base: "24px", lg: "32px", "2xl": "56px" }}
    >
      <Box maxW="1280px" mx="auto" px={{ base: "20px", lg: "0" }}>
        <Stack gap={8}>
          {/* Title and last updated */}
          <VStack align="start" gap={1}>
            <Heading variant="heading4" fontWeight={400}>
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Last updated: {lastUpdated}
            </Text>
          </VStack>

          {/* Main HTML Content */}
          <Box w="100%">
            <Box
              className="ql-editor"
              fontSize="sm"
              fontWeight={400}
              color="primary.400"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
export default ShippingDelivery;
