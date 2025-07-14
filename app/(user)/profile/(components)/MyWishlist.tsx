"use client";

import Image from "next/image";
import { Box, Grid, HStack, Spinner, Stack, Text } from "@chakra-ui/react";

import { EmptyStateImage } from "@/assets/image";
import { useConfigQuery, useWishlistQuery } from "@/hooks/api";
import { getOrCreateGuestId } from "@/utils/guest";

export const MyWishlist = () => {
  const guid = getOrCreateGuestId();
  const { data: wishlistData, isLoading } = useWishlistQuery(guid);
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
        My Wishlist
      </Text>

      {isLoading ? (
        <Box textAlign={"center"}>
          <Spinner />
          <Text variant={"paragraphRegular"} mt={4}>
            Loading your Wishlist...
          </Text>
        </Box>
      ) : wishlistData?.length === 0 ? (
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
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor="gray.300"
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
            {wishlistData?.map((item, index) => (
              <Stack key={item.id}>
                <HStack
                  px={4}
                  py={3}
                  borderBottom={
                    index === wishlistData.length - 1 ? "none" : "1px solid"
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
                    <Text variant={"paragraphSmall"}>{item.title}</Text>
                  </HStack>

                  <Text flex="1" textAlign="center" variant={"paragraphSmall"}>
                    {item.quantity}
                  </Text>

                  <Text flex="1" textAlign="right" variant={"paragraphSmall"}>
                    {config.currency} {item.item_price}
                  </Text>
                </HStack>
              </Stack>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};
