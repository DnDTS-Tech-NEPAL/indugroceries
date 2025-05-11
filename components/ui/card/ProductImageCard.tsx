import Image from "next/image";
import { Flex, Box } from "@chakra-ui/react";

import { ProductImageCardProps } from "@/types";

export const ProductImageCard: React.FC<ProductImageCardProps> = ({
  productImageUrl,
  selectedImage,
  setSelectedImage,
  productName,
}) => {
  const isSelected = selectedImage === productImageUrl;
  return (
    <Flex
      px="auto"
      background="grey.100"
      border={isSelected ? "4px solid" : "none"}
      borderRadius="md"
      borderColor={isSelected ? "gray.200" : ""}
      width={{ base: "93px", md: "109px", xl: "140px" }}
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      height={{ base: "80px", lg: "100px", xl: "120px" }}
      cursor="pointer"
      onClick={() => setSelectedImage(productImageUrl)}
    >
      <Box position="relative" margin="auto" width="full" height="full">
        <Image src={productImageUrl} alt={productName} fill />
      </Box>
    </Flex>
  );
};
