import { HStack, Stack, Text } from "@chakra-ui/react";

import { ReviewCardProps } from "@/types";

export const ReviewCard: React.FC<ReviewCardProps> = ({ name, message }) => {
  return (
    <Stack gap="8px" padding="12px">
      <Text variant="subtitle2" color="primary.400" fontWeight="400">
        {name}
      </Text>
      <Text variant="paragraphRegular" color="system.text.normal.light">
        {message}
      </Text>

      <HStack gap="8px"></HStack>
    </Stack>
  );
};
