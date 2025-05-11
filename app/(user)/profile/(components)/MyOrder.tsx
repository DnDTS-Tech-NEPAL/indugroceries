"use client";

import Image from "next/image";
import {
  Badge,
  Box,
  Flex,
  Grid,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { EmptyStateImage } from "@/assets/image";
import { Button } from "@/components";
import { useConfigQuery, useOrderListQuery } from "@/hooks/api";

export const MyOrder = () => {
  const { data: orderData, isLoading } = useOrderListQuery();
  const { data: config } = useConfigQuery();

  return (
    <Box
      flex="1"
      borderRadius="16px"
      p="20px"
      border="1px solid"
      borderColor="gray.200"
    >
      <Text variant="subtitle1" mb={4}>
        My Order
      </Text>

      {isLoading ? (
        <Box textAlign="center">
          <Spinner />
          <Text mt={4} variant="paragraphRegular">
            Loading your order...
          </Text>
        </Box>
      ) : orderData?.length === 0 ? (
        <Box textAlign="center" placeItems={"center"}>
          <Image
            src={EmptyStateImage}
            alt="Empty State"
            width={304}
            height={272}
          />
          <Grid>
            <Text mt={4} variant="subtitle1">
              No Items!
            </Text>
            <Text variant="paragraphRegular" color="primary.300">
              It seems you have not added anything to your cart yet.
            </Text>
          </Grid>
        </Box>
      ) : (
        <>
          {/* Desktop View (lg) */}
          <Box display={{ base: "none", md: "none", lg: "block" }}>
            <HStack
              px={4}
              py={2}
              borderBottom="1px solid"
              borderColor="gray.300"
              fontWeight="bold"
            >
              <Text flex="2">Order Name</Text>
              <Text flex="1" textAlign="right">
                Price
              </Text>
              <Text flex="1" textAlign="right">
                Order Date
              </Text>
              <Text flex="1" textAlign="right">
                Payment Status
              </Text>
            </HStack>

            <Stack gap={4} mt={2}>
              {orderData?.map((item, index) => (
                <HStack
                  key={index}
                  px={4}
                  py={3}
                  borderBottom={
                    index === orderData.length - 1 ? "none" : "1px solid"
                  }
                  borderColor="gray.200"
                  alignItems="center"
                >
                  <HStack flex="2" gap={4}>
                    <Image
                      src={config.company_details_url}
                      alt={config.company_details_name}
                      width={50}
                      height={50}
                    />
                    <Stack gap={0}>
                      <Text variant="paragraphSmall">{item.name}</Text>
                    </Stack>
                  </HStack>

                  <Text flex="1" textAlign="right" variant="paragraphSmall">
                    {config.currency} {item.grand_total}
                  </Text>
                  <Text flex="1" textAlign="right" variant="paragraphSmall">
                    {item.transaction_date}
                  </Text>
                  <Flex flex="1" justify="flex-end" align="center" gap={4}>
                    <Badge
                      variant={
                        item.payment_status === "Pending" ? "solid" : "primary"
                      }
                    >
                      {item.payment_status}
                    </Badge>
                    {item.payment_status !== "Paid" && (
                      <Button
                        borderRadius={3}
                        onClick={() =>
                          (window.location.href = item.payment_url)
                        }
                      >
                        Pay Now
                      </Button>
                    )}
                  </Flex>
                </HStack>
              ))}
            </Stack>
          </Box>

          {/* Tablet View (md) */}
          <Box display={{ base: "none", md: "block", lg: "none" }}>
            <HStack
              px={4}
              py={2}
              borderBottom="1px solid"
              borderColor="gray.300"
              fontWeight="bold"
            >
              <Text flex="2">Order Name</Text>
              <Text flex="1" textAlign="center">
                Price
              </Text>
              <Text flex="1" textAlign="start">
                Order Date
              </Text>
              <Text flex="1" textAlign="center">
                Payment Status
              </Text>
            </HStack>

            <Stack gap={4} mt={2}>
              {orderData?.map((item, index) => (
                <HStack
                  key={index}
                  px={4}
                  py={3}
                  borderBottom={
                    index === orderData.length - 1 ? "none" : "1px solid"
                  }
                  borderColor="gray.200"
                  alignItems="center"
                >
                  <HStack flex="2" gap={4}>
                    <Image
                      src={config.company_details_url}
                      alt={config.company_details_name}
                      width={50}
                      height={50}
                    />
                    <Stack gap={0}>
                      <Text variant="paragraphSmall">{item.name}</Text>
                    </Stack>
                  </HStack>

                  <Text flex="1" textAlign="right" variant="paragraphSmall">
                    {config.currency} {item.grand_total}
                  </Text>
                  <Text flex="1" textAlign="right" variant="paragraphSmall">
                    {item.transaction_date}
                  </Text>
                  <Flex flex="1" justify="flex-end" align="center" gap={4}>
                    <Badge
                      variant={
                        item.payment_status === "Pending" ? "solid" : "primary"
                      }
                    >
                      {item.payment_status}
                    </Badge>
                    {item.payment_status !== "Paid" && (
                      <Button
                        borderRadius={3}
                        onClick={() =>
                          (window.location.href = item.payment_url)
                        }
                      >
                        Pay Now
                      </Button>
                    )}
                  </Flex>
                </HStack>
              ))}
            </Stack>
          </Box>

          {/* Mobile View (base) */}
          <Box display={{ base: "block", md: "none", lg: "none" }}>
            <Stack gap={4}>
              {orderData?.map((item, index) => (
                <VStack
                  key={index}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="8px"
                  align="stretch"
                >
                  <HStack>
                    <Image
                      src={config.company_details_url}
                      alt={config.company_details_name}
                      width={50}
                      height={50}
                    />
                    <Text>{item.name}</Text>
                  </HStack>

                  <Text variant="paragraphSmall">
                    <strong>Price:</strong> {config.currency} {item.grand_total}
                  </Text>
                  <Text variant="paragraphSmall">
                    <strong>Order Date:</strong> {item.transaction_date}
                  </Text>
                  <HStack justify="space-between">
                    <Badge
                      variant={
                        item.payment_status === "Pending" ? "solid" : "primary"
                      }
                    >
                      {item.payment_status}
                    </Badge>
                    {item.payment_status !== "Paid" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          (window.location.href = item.payment_url)
                        }
                      >
                        Pay Now
                      </Button>
                    )}
                  </HStack>
                </VStack>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};
