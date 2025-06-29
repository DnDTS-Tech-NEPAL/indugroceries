"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Button,
  Checkbox,
  TableWithCheckbox,
  WishlistDeleteButton,
} from "@/components";
import { useConfigQuery, useWishlistQuery } from "@/hooks/api";
import {
  useProductDetailCartMutation,
  useRemoveFromWishlist,
} from "@/hooks/app";
import { WishlistFormType } from "@/types";
import { BsCart3 } from "react-icons/bs";

export const FavouritePage = () => {
  const { data: wishlistData = [] } = useWishlistQuery();

  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(
    new Set()
  );
  const { handleRemoveWishlist, isPending: isRemovingFromWishlist } =
    useRemoveFromWishlist({
      wishlistData,
      selectedItems,
      setSelectedItems,
    });

  const selectedCount = useMemo(() => selectedItems.size, [selectedItems]);

  const { handleAddToCart, isPending: isCartPending } =
    useProductDetailCartMutation();

  const { data: config } = useConfigQuery();

  const handleSingleItemAddToCart = (item: WishlistFormType) => {
    const payload = {
      item_code: item.title,
      item_price: item.item_price,
      quantity: item.quantity,
    };
    handleAddToCart(payload);
  };

  const columns = useMemo(() => {
    const columnsList: ColumnDef<WishlistFormType>[] = [
      {
        accessorKey: "title",
        header: "Product Name",
        cell: ({ row }) => (
          <HStack gap={"12px"}>
            <Image
              height={{ base: "30px", md: "40px", lg: "60px", xl: "80px" }}
              width={{ base: "30px", md: "40px", lg: "60px", xl: "80px" }}
              src={row.original.image || config.company_details_url}
              alt={row.original.title}
            />
            <Stack gap={0}>
              <Text
                fontWeight={800}
                fontSize={{ base: "11px", md: "14px", lg: "16px" }}
              >
                {row.original.title}
              </Text>
              <Text
                fontWeight={500}
                fontSize={{ base: "10px", lg: "14px" }}
                color={"primary.300"}
              >
                {row.original.category}
              </Text>
            </Stack>
          </HStack>
        ),
      },
      {
        accessorKey: "item_price",
        header: "Unit Price",
        cell: ({ row }) => (
          <HStack>
            <Text fontWeight={500} fontSize={{ base: "12px", lg: "16px" }}>
              {config?.currency} {row.original.item_price}
            </Text>
          </HStack>
        ),
      },
      {
        accessorKey: "addedDate",
        header: "Added Date",
        cell: ({ row }) => (
          <Text
            fontWeight={500}
            fontSize={{ base: "10px", md: "12px", lg: "14px" }}
            color={"primary.300"}
          >
            {row.original.addedDate}
          </Text>
        ),
      },
      {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <HStack>
            <Button
              variant={"ghost"}
              height={{ base: "10px", lg: "40px" }}
              width={{ base: "10px", lg: "140px" }}
              borderRadius={"8px"}
              bg="#FF6996"
              color="white"
              _hover={{ bg: "#FF4F82" }}
              rounded="full"
              onClick={() => handleSingleItemAddToCart(row.original)}
              loading={isCartPending}
            >
              <BsCart3 />
              Add To Bag
            </Button>
          </HStack>
        ),
      },
    ];
    return columnsList;
  }, []);

  const onSelectionChange = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  return (
    <Stack minHeight={"100vh"} gap={"12px"}>
      <Flex justifyContent={"space-between"}>
        <Stack fontWeight={400} fontFamily={"roboto"}>
          <Heading
            variant={{
              base: "heading5",
              "2xl": "heading4",
            }}
          >
            Wishlist {`(${wishlistData.length} Items)`}
          </Heading>
          <Text variant="paragraphSmall" color="system.text.light.light">
            Review your items and add to cart
          </Text>
        </Stack>
        <HStack fontSize={"14px"} fontWeight={400} gap={4}>
          <WishlistDeleteButton
            onClick={handleRemoveWishlist}
            count={selectedCount}
            isLoading={isRemovingFromWishlist}
          />
          <Button
            variant={"ghost"}
            bg="#FF6996"
            color="white"
            _hover={{ bg: "#FF4F82" }}
            rounded="full"
            disabled={!selectedCount}
            onClick={() => {
              const selectedProducts = wishlistData.filter((item) =>
                selectedItems.has(item.id)
              );

              const payloads = selectedProducts.map((item) => ({
                item_code: item.title,
                item_price: item.item_price,
                quantity: item.quantity,
              }));

              payloads.forEach((payload) => {
                handleAddToCart(payload);
              });
            }}
          >
            <HStack>
              <BsCart3 />
              <Text display={{ base: "none", lg: "block" }}>
                {selectedCount > 0
                  ? `Add to bag (${selectedCount} items)`
                  : "Add to bag"}
              </Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>
      <Box display={{ base: "none", md: "block" }}>
        <TableWithCheckbox
          data={wishlistData}
          columns={columns}
          selectedItems={selectedItems}
          onSelectionChange={onSelectionChange}
          setSelectedItems={setSelectedItems}
        />
      </Box>
      {/* Mobile View */}
      <Box display={{ base: "block", md: "none" }} mb={2}>
        <Stack gap={4}>
          {wishlistData.map((item) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="md"
              position={"relative"}
              overflow={"hidden"}
              padding={4}
            >
              {/* Discount Ribbon */}
              {/* {item.discounted_percentage &&
              Number(item.discounted_percentage) > 0 ? (
                <Box
                  position="absolute"
                  top=" -17px"
                  right="-68px"
                  width="162px"
                  height="74px"
                  bg="green.500"
                  color="white"
                  textAlign="center"
                  lineHeight="1"
                  fontSize="sm"
                  fontWeight="bold"
                  transform="rotate(45deg)"
                  py={1}
                  zIndex="1"
                >
                  <HStack
                    gap="0.6rem"
                    align="center"
                    position={"absolute"}
                    top=" 2.4rem"
                    dropShadow={"md"}
                    right="3.4rem"
                    rotate={"-45deg"}
                  >
                    <Box
                      textShadow="9px 1px 3px #22c55e"
                      css={{
                        WebkitTextStrokeWidth: "3px",
                        WebkitTextStrokeColor: "#22c55e",
                      }}
                      letterSpacing="-6px"
                      fontSize="3.5rem"
                    >
                      {item.discounted_percentage}
                    </Box>
                    <VStack gap="0">
                      <Text>%</Text>
                      <Text>OFF</Text>
                    </VStack>
                  </HStack>
                </Box>
              ) : null} */}

              <Checkbox
                height={"16px"}
                width={"16px"}
                checked={selectedItems.has(item.id)}
                onChange={() => onSelectionChange(item.id)}
              />

              <HStack align="center" gap={4}>
                <Box position={"relative"}>
                  <Image
                    src={item.image || config?.company_details_url || ""}
                    alt={item.title}
                    width={90}
                    height={90}
                    objectFit="cover"
                  />
                </Box>

                <Stack gap={1} flex="1">
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    // w={
                    //   item.discounted_percentage &&
                    //   Number(item.discounted_percentage) > 0
                    //     ? "80%"
                    //     : "auto"
                    // }
                  >
                    {item.title?.length > 40
                      ? `${item.title.slice(0, 40)}...`
                      : item.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.category}
                  </Text>

                  <HStack mt={2}>
                    <Button
                      variant={"ghost"}
                      bg="#FF6996"
                      color="white"
                      _hover={{ bg: "#FF4F82" }}
                      rounded="full"
                      onClick={() => handleSingleItemAddToCart(item)}
                    >
                      <BsCart3 />
                      <Text fontSize={"12px"} ml={1}>
                        Add to Cart
                      </Text>
                    </Button>
                  </HStack>
                </Stack>
              </HStack>

              <Flex justifyContent="space-between" alignItems="center" mt={3}>
                <VStack gap="0" alignItems="flex-start">
                  <Text>
                    {config?.currency} {item.item_price}
                  </Text>
                  {/* {item.discounted_price !== item.item_price ? (
                    <Text color="red.400" textDecoration={"line-through"}>
                      {config?.currency} {item.item_price}
                    </Text>
                  ) : null} */}
                </VStack>

                <Text fontSize="sm" color="primary.300">
                  Added: {item.addedDate}
                </Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
