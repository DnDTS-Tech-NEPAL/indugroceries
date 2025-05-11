import { Heading, Text, VStack } from "@chakra-ui/react";

import { HeaderProps } from "@/types";

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <VStack alignItems="start" gap="4px">
      <Heading fontWeight="400">{title}</Heading>
      <Text variant="paragraphSmall" color="system.text.light.light">
        {description}
      </Text>
    </VStack>
  );
};
