"use client";

import Image from "next/image";
import { Box, Grid, HStack, Stack, Text, Spinner } from "@chakra-ui/react";

import { useCartQuery, useConfigQuery } from "@/hooks/api";
import { EmptyStateImage } from "@/assets/image";

export const MyCart = () => {
  const { data: cartData, isLoading } = useCartQuery();

  const { data: config } = useConfigQuery();

  return (
    <Box
      flex="1"
      borderRadius="16px"
      p="20px"
      border="1px solid"
      borderColor="gray.200"
    >
      <Text variant={"subtitle1"} mb={4}>
        My Cart
      </Text>

      {isLoading ? (
        <Box textAlign="center">
          <Spinner />
          <Text mt={4} variant={"paragraphRegular"}>
            Loading your cart...
          </Text>
        </Box>
      ) : cartData?.length === 0 ? (
        <Box textAlign="center" placeItems={"center"}>
          <Image
            src={EmptyStateImage}
            alt="Empty State"
            width={304}
            height={272}
          />
          <Grid>
            <Text mt={4} variant={"subtitle1"}>
              No Items!
            </Text>
            <Text variant={"paragraphRegular"} color={"primary.300"}>
              It seems you have not added anything on your wishlist yet.
            </Text>
          </Grid>
        </Box>
      ) : (
        <>
          <HStack
            px={4}
            py={2}
            borderBottom="1px solid"
            borderColor="gray.300"
            fontWeight="bold"
          >
            <Text flex="2">Product Name</Text>
            <Text flex="1" textAlign="center">
              Quantity
            </Text>
            <Text flex="1" textAlign="right">
              Price
            </Text>
          </HStack>

          <Stack gap={4} mt={2}>
            {cartData?.map((item, index) => (
              <HStack
                key={item.id}
                px={4}
                py={3}
                borderBottom={
                  index === cartData.length - 1 ? "none" : "1px solid"
                }
                borderColor="gray.200"
                alignItems="center"
              >
                <HStack flex="2" gap={4}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                  <Stack gap={0}>
                    <Text variant={"paragraphSmall"}>{item.title}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {item.type} / {item.subType}
                    </Text>
                  </Stack>
                </HStack>

                <Text flex="1" textAlign="center" variant={"paragraphSmall"}>
                  {item.quantity}
                </Text>

                <Text flex="1" textAlign="right" variant={"paragraphSmall"}>
                  {config.currency} {parseFloat(item.price) * item.quantity}
                </Text>
              </HStack>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};
