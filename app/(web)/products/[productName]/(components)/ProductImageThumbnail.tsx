import { Flex } from "@chakra-ui/react";

import { ProductImageCard } from "@/components";
import { ProductImageThumbnailProps } from "@/types";

const ProductImageThumbnail: React.FC<ProductImageThumbnailProps> = ({
  productImages,
  selectedImage,
  setSelectedImage,
  productName,
}) => {
  const isSingleImage = productImages.length === 1;

  return (
    <Flex
      justifyContent={isSingleImage ? "flex-start" : "center"}
      align={"center"}
      gap="8px"
      flexDirection="row"
      flexWrap="wrap"
      width="100%"
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
