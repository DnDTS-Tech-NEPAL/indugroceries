import Image from "next/image";
import { HStack, Text } from "@chakra-ui/react";

import { SocialAuthButtonProps } from "@/types";

export const SocialAuthButton = ({
  label,
  imageSrc,
  width,
  height,
  onClick,
}: SocialAuthButtonProps) => {
  return (
    <HStack
      flex={1}
      justifyContent="center"
      gap="4px"
      border="1px solid"
      borderColor="system.neutral.separator.light"
      minHeight="48px"
      px="12px"
      userSelect="none"
      cursor="pointer"
      onClick={onClick}
    >
      <Image src={imageSrc} alt="" width={width} height={height} />
      <Text variant="subtitle2">{label}</Text>
    </HStack>
  );
};
