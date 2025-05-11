import { HStack, Text } from "@chakra-ui/react";

import { TrashIcon } from "@/assets/svg";
import { CartDeleteButtonProps } from "@/types";

import { Button } from "./Button";

export const CartDeleteButton = ({
  onClick,
  count,
  isLoading,
}: CartDeleteButtonProps) => {
  const deleteText = isLoading ? "Deleting" : "Delete";

  return (
    <Button
      variant="danger"
      borderRadius="8px"
      onClick={onClick}
      disabled={!count || isLoading}
    >
      <HStack gap="8px">
        <TrashIcon />
        <Text display={{ base: "none", md: "none", lg: "block" }}>
          {count > 0 ? `${deleteText} (${count} items)` : "Delete"}
        </Text>
      </HStack>
    </Button>
  );
};
