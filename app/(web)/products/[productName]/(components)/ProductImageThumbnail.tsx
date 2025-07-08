import { Flex } from "@chakra-ui/react";

import { ProductImageCard } from "@/components";
import { ProductImageThumbnailProps } from "@/types";

const ProductImageThumbnail: React.FC<ProductImageThumbnailProps> = ({
  productImages,
  selectedImage,
  setSelectedImage,
  productName,
}) => {
  return (
    <Flex
      justifyContent={"center"}
      align={"center"}
      gap="8px"
      flexDirection="row"
      flexWrap="wrap"
    >
      {productImages.map((productImageUrl, index) => (
        <ProductImageCard
          key={index}
          productImageUrl={productImageUrl}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          productName={productName}
        />
      ))}
    </Flex>
  );
};

export default ProductImageThumbnail;
