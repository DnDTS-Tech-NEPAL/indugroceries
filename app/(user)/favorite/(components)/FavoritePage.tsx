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
} from "@chakra-ui/react";

import { CartIcon } from "@/assets/svg";
import { Button, TableWithCheckbox, WishlistDeleteButton } from "@/components";
import { useConfigQuery, useWishlistQuery } from "@/hooks/api";
import {
  useProductDetailCartMutation,
  useRemoveFromWishlist,
} from "@/hooks/app";
import { WishlistFormType } from "@/types";

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
              onClick={() => handleSingleItemAddToCart(row.original)}
              loading={isCartPending}
            >
              <CartIcon />
              <Text
                display={{ base: "none", lg: "block" }}
                fontWeight={400}
                fontSize={"14px"}
              >
                Add to Cart
              </Text>
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
            borderRadius="8px"
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
              <CartIcon />
              <Text display={{ base: "none", lg: "block" }}>
                {selectedCount > 0
                  ? `Add to cart (${selectedCount} items)`
                  : "Add to cart"}
              </Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>
      <Box>
        <TableWithCheckbox
          data={wishlistData}
          columns={columns}
          selectedItems={selectedItems}
          onSelectionChange={onSelectionChange}
          setSelectedItems={setSelectedItems}
        />
      </Box>
    </Stack>
  );
};
