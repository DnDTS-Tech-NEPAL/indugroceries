import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";

import { TrashIcon } from "@/assets/svg";
import { WishlistDeleteButtonProps } from "@/types";

export const WishlistDeleteButton = ({
  onClick,
  count,
  isLoading,
}: WishlistDeleteButtonProps) => {
  const deleteText = isLoading ? "Deleting" : "Delete";

  return (
    <Button
      variant="danger"
      borderRadius="8px"
      disabled={!count || isLoading}
      onClick={onClick}
    >
      <HStack>
        <TrashIcon />
        <Text display={{ base: "none", lg: "block" }}>
          {count > 0 ? `${deleteText} (${count} items)` : "Delete"}
        </Text>
      </HStack>
    </Button>
  );
};
