"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

import {
  CartDeleteButton,
  Checkbox,
  QuantityInput,
  TableWithCheckbox,
} from "@/components";
import { ROUTES } from "@/constants";
import {
  useAddPromo,
  // useCartMutation,
  useCartMutationNew,
  useCartQuery,
  useConfigQuery,
} from "@/hooks/api";
import { useRemoveFromCart } from "@/hooks/app";
import { useItemStore, usePromoFormStore, usePromoStore } from "@/store";
import { ProductDetail } from "@/types";
interface CartSummaryProps {
  onQuantityChange: (newQuantity: boolean) => void;
}

export const CartSummary = ({ onQuantityChange }: CartSummaryProps) => {
  const router = useRouter();

  const { data: config } = useConfigQuery();
  const { data: cartData } = useCartQuery();

  const { items: originalItems, setItems } = useItemStore();
  const { resetPromoForm } = usePromoFormStore();

  // const { mutate: handleAddToCart } = useCartMutation();
  const { mutate: handleAddToCartNew } = useCartMutationNew();
  const { mutate: applyPromo } = useAddPromo();

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [localItems, setLocalItems] = useState<ProductDetail[]>([]);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const { setPromoData } = usePromoStore();

  const { handleRemoveFromCart, isPending: isRemovingFromCart } =
    useRemoveFromCart({
      items: originalItems,
      selectedItems,
      setSelectedItems,
    });

  useEffect(() => {
    if (cartData) {
      setItems(cartData);
      setLocalItems(cartData);
    }
    applyPromo(
      {
        coupon: "",
        delivery_charge: "",
      },
      {
        onSuccess: (res) => {
          setPromoData(res.data.data);
        },
        onError: () => {},
      }
    );
  }, [cartData, applyPromo, setItems, setPromoData]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setLocalItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    setHasPendingChanges(true);
    onQuantityChange(true);
  };

  const handleApplyChanges = () => {
    if (!hasPendingChanges) return;

    const changes: { item_code: string; quantity: number }[] = [];

    localItems.forEach((localItem) => {
      const originalItem = originalItems.find(
        (item) => item.id === localItem.id
      );
      if (originalItem && localItem.quantity !== originalItem.quantity) {
        changes.push({
          item_code: localItem.title,
          // quantity: localItem.quantity - originalItem.quantity,
          quantity: localItem.quantity,
        });
      }
    });

    if (changes.length > 0) {
      // Apply all changes at once
      changes.forEach((change) => {
        // handleAddToCart(change, {
        handleAddToCartNew(change, {
          onSuccess: () => {
            resetPromoForm();
            applyPromo(
              {
                coupon: "",
                delivery_charge: "",
              },
              {
                onSuccess: (res) => {
                  setPromoData(res.data.data);
                },
              }
            );
          },
        });
      });

      // Update the original items with local changes
      setItems(localItems);
    }
    setHasPendingChanges(false);
    onQuantityChange(false);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedCount = useMemo(() => selectedItems.size, [selectedItems]);

  const columns = useMemo(() => {
    const columnsList: ColumnDef<ProductDetail>[] = [
      {
        header: "Items",
        accessorKey: "title",
        cell: ({ row }) => (
          <HStack alignItems="stretch">
            <Flex
              alignItems="center"
              justifyContent="center"
              boxSize="80px"
              background="grey.100"
            >
              <Image
                src={row.original.image || config.company_details_url}
                alt={row.original.title}
                width={80}
                height={80}
              />
            </Flex>
            <Stack
              justifyContent="center"
              onClick={() =>
                router.push(`${ROUTES.APP.PRODUCTS}/${row.original.title}`)
              }
              cursor={"pointer"}
            >
              <Heading variant="heading7" color="primary.400">
                {row.original.title?.length > 80
                  ? `${row.original.title?.slice(0, 18)}...`
                  : row.original.title}
              </Heading>
              {/* <Text variant="subtitle3" color="primary.300">
                {row.original.type}
                {row.original.subType && ` / ${row.original.subType}`}
              </Text> */}
              <Text variant="subtitle3" fontSize={"md"} color="primary.300">
                {config.currency} {row.original.discountedPrice}
              </Text>
              <HStack gap={2}>
                <Text
                  variant="subtitle3"
                  color="gray.500"
                  textDecoration="line-through"
                >
                  {config.currency} {row.original.price}
                </Text>
                <Text variant="subtitle3" color="pink.400">
                  {row.original.discountPercentage} % Off
                </Text>
              </HStack>
            </Stack>
          </HStack>
        ),
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        meta: { textAlign: "center" },
        cell: ({ row }) => {
          const minimumQuantity = row.original.minimumQuantity || 1;
          const maximumQuantity = row.original.maximumQuantity || 100;
          const incrementStep = row.original.incrementStep || 1;
          return (
            <QuantityInput
              value={row.original.quantity}
              onChange={(value) => handleQuantityChange(row.original.id, value)}
              quantityPayload={(quantityChange) =>
                handleQuantityChange(
                  row.original.id,
                  row.original.quantity + quantityChange
                )
              }
              minimum={minimumQuantity}
              maximum={maximumQuantity}
              incrementStep={incrementStep}
            />
          );
        },
      },
      // {
      //   header: "Rate",
      //   accessorKey: "price",
      //   cell: ({ row }) => (
      //     <HStack gap="0">
      //       <Text>
      //         {config.currency} {row.original.price}
      //       </Text>
      //     </HStack>
      //   ),
      // },
      {
        header: "Subtotal",
        accessorFn: (row: ProductDetail) => {
          return parseInt(row.discountedPrice) * row.quantity;
        },
        cell: ({ row }) => {
          const total =
            parseFloat(row.original.discountedPrice) * row.original.quantity;
          const formattedTotal =
            total % 1 === 0
              ? total
              : total
                  .toFixed(2)
                  .replace(/\.00$/, "")
                  .replace(/(\.\d)0$/, "$1");

          return (
            <HStack gap="0">
              <Text>
                {config.currency} {formattedTotal}
              </Text>
            </HStack>
          );
        },
      },
    ];
    return columnsList;
  }, []);

  return (
    <Box flex={1}>
      <Stack gap="2px">
        <HStack alignItems="stretch" justifyContent="space-between">
          <Stack gap="8px">
            <Heading
              display={{ base: "none", md: "block" }}
              variant={{
                base: "heading5",
                "2xl": "heading4",
              }}
            >
              Cart Summary ({originalItems.length} Items)
            </Heading>

            <Text
              display={{ base: "block", md: "none" }}
              fontSize={"16px"}
              fontWeight={500}
            >
              Cart Summary ({originalItems.length} Items)
            </Text>

            <Text variant="paragraphSmall" color="system.text.light.light">
              Review your items and proceed to checkout
            </Text>
          </Stack>

          <HStack>
            <CartDeleteButton
              onClick={handleRemoveFromCart}
              count={selectedCount}
              isLoading={isRemovingFromCart}
            />
            {hasPendingChanges && (
              <Button
                borderRadius="8px"
                bg={"#FF6996"}
                color={"white"}
                onClick={handleApplyChanges}
                size="sm"
              >
                Apply Changes
              </Button>
            )}
          </HStack>
        </HStack>

        <Box display={{ base: "none", md: "block" }}>
          <TableWithCheckbox
            columns={columns}
            data={localItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onSelectionChange={handleCheckboxChange}
          />
        </Box>

        <Box display={{ base: "block", md: "none" }} mb={2}>
          <Stack>
            {localItems.map((item) => (
              <Box
                key={item.id}
                borderRadius="8px"
                padding="12px"
                display={{ base: "block", md: "flex" }}
                alignItems="center"
                gap="16px"
              >
                <Flex
                  gap={"12px"}
                  alignItems="center"
                  justifyContent="start"
                  display={{ base: "flex" }}
                  marginBottom={{ base: "8px", md: "0" }}
                >
                  <Checkbox
                    height={"16px"}
                    width={"16px"}
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <HStack>
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      boxSize="60px"
                      background="grey.100"
                    >
                      <Image
                        src={item.image || config.company_details_url}
                        alt={item.title}
                        width={60}
                        height={60}
                      />
                    </Flex>
                    <Stack justifyContent="center">
                      <Heading variant="heading7" color="primary.400">
                        {item?.title?.length > 40
                          ? `${item.title?.slice(0, 40)}...`
                          : item.title}
                      </Heading>

                      <Text variant="subtitle3" color="primary.300">
                        {item.type}
                        {item.subType && ` / ${item.subType}`}
                      </Text>
                    </Stack>
                  </HStack>
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  display={{ base: "flex" }}
                >
                  <HStack gap="0">
                    <Text>
                      {config.currency}{" "}
                      {(parseFloat(item.price) * item.quantity) % 1 === 0
                        ? parseFloat(item.price) * item.quantity
                        : (parseFloat(item.price) * item.quantity)
                            .toFixed(2)
                            .replace(/\.00$/, "")
                            .replace(/(\.\d)0$/, "$1")}
                    </Text>
                  </HStack>
                  <QuantityInput
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.id, value)}
                    quantityPayload={(quantityChange) =>
                      handleQuantityChange(
                        item.id,
                        item.quantity + quantityChange
                      )
                    }
                  />
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
