import { HStack, Text } from "@chakra-ui/react";

import { ShareIcon } from "@/assets/svg";

export const ShareButton = () => {
  return (
    <HStack gap="4px">
      <Text color="black" variant="subtitle2">
        Share
      </Text>
      <ShareIcon />
    </HStack>
  );
};
