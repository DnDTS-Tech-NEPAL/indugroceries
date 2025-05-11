import Image from "next/image";
import { Text, VStack } from "@chakra-ui/react";

import { EmptyStateImage } from "@/assets/image";
import { EmptyStateProps } from "@/types";

export const EmptyState = ({
  title = "No Items!",
  description,
}: EmptyStateProps) => {
  return (
    <VStack alignItems="center" justifyContent="center" width="full">
      <Image src={EmptyStateImage} alt="Empty State" width={304} height={272} />
      <Text
        variant="subtitle1"
        color="system.text.normal.light"
        marginTop="16px"
        marginBottom="2px"
      >
        {title}
      </Text>

      {description && (
        <Text variant="paragraphRegular" color="system.text.light.light">
          {description}
        </Text>
      )}
    </VStack>
  );
};
