import { PropsWithChildren } from "react";
import Image, { StaticImageData } from "next/image";

import { HStack, VStack } from "@chakra-ui/react";

interface AuthWrapperProps extends PropsWithChildren {
  imageSrc?: string | StaticImageData;
}

export const AuthWrapper = ({ children, imageSrc }: AuthWrapperProps) => {
  return (
    <HStack
      alignItems="stretch"
      gap="0"
      minHeight={{ base: "650px", lg: "600px", xl: "600px" }}
    >
      <VStack alignItems="stretch" flex={2} bg="white">
        {children}
      </VStack>

      {imageSrc && (
        <VStack
          position="relative"
          display={{ base: "none", lg: "flex" }}
          flex={1.5}
          gap="0"
          py="52px"
          px="24px"
        >
          <Image
            src={imageSrc}
            alt="Authentication Step Image"
            fill
            style={{ zIndex: -1 }}
          />
        </VStack>
      )}
    </HStack>
  );
};
