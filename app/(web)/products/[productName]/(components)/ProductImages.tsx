"use client";

import { useParams } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import { useConfigQuery, useProductDetailByNameQuery } from "@/hooks/api";
import { useProductImages } from "@/hooks/app";
import { IndividualProductAPIType } from "@/types";

import { ProductImageDisplay } from "./ProductImageDisplay";
import ProductImageThumbnail from "./ProductImageThumbnail";

export const ProductImages = () => {
  const params = useParams();
  const { data: config } = useConfigQuery();
  const productName = params.productName as string;

  const { data: productDetail } = useProductDetailByNameQuery(productName);

  // hook to handle all logic related to product images
  const { productImages, selectedImage, setSelectedImage } = useProductImages(
    productDetail as IndividualProductAPIType
  );

  return (
    <Flex
      gap="24px"
      flex={1}
      flexDirection="column"
      width={{ lg: "50%", xl: "100%" }}
    >
      <ProductImageDisplay
        selectedImage={selectedImage || config.company_details_url}
        productName={productName}
      />
      <ProductImageThumbnail
        productImages={productImages}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        productName={productName}
      />
    </Flex>
  );
};
