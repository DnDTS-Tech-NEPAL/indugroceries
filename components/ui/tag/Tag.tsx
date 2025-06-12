import { Box, HStack, Text } from "@chakra-ui/react";

import { ColorVariantProps } from "@/types";
import { CloseCircleIcon } from "@/assets/svg";
import { ReactNode } from "react";

export const Tag = ({
  color,
  name,
  onClick,
  backgroundColor,
}: ColorVariantProps) => {
  return (
    <HStack
      padding="12px 16px"
      border="1px solid"
      borderColor="system.neutral.separator.light"
      width="fit-content"
      cursor="pointer"
      userSelect="none"
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {color && (
        <Box boxSize="20px" borderRadius="50%" backgroundColor={color} />
      )}
      <Text
        variant="subtitle2"
        color="system.text.primary.light"
        whiteSpace="nowrap"
        ml={color ? "8px" : "0px"}
      >
        {name}
      </Text>
    </HStack>
  );
};

// NEW TAGNEW COMPONENT
interface TagNewProps {
  children: ReactNode;
  onClose?: () => void;
  colorScheme?: string;
  variant?: "solid" | "subtle" | "outline";
}

export const TagNew = ({
  children,
  onClose,
  colorScheme = "gray",
  variant = "subtle",
}: TagNewProps) => {
  const getStyles = () => {
    switch (variant) {
      case "solid":
        return {
          bg: `${colorScheme}.500`,
          color: "white",
          border: "none",
        };
      case "outline":
        return {
          bg: "transparent",
          color: `${colorScheme}.500`,
          border: "1px solid",
          borderColor: `${colorScheme}.500`,
        };
      case "subtle":
      default:
        return {
          bg: `${colorScheme}.100`,
          color: `${colorScheme}.800`,
          border: "none",
        };
    }
  };

  const styles = getStyles();

  return (
    <HStack
      gap={2}
      px={2}
      borderRadius="full"
      fontSize="sm"
      fontWeight="medium"
      width="fit-content"
      {...styles}
    >
      <Text>{children}</Text>
      {onClose && (
        <CloseCircleIcon
          cursor={"pointer"}
          color="red"
          height={20}
          width={20}
          onClick={onClose}
        />
      )}
    </HStack>
  );
};