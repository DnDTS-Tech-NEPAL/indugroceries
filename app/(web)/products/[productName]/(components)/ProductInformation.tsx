// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { Flex, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";

// import { HeartIcon } from "@/assets/svg";
// import { Button, ProductVariantTabs, QuantityInput } from "@/components";
// import { useConfigQuery, useProductDetailByNameQuery } from "@/hooks/api";
// import {
//   useAuthCheck,
//   useProductDetailCartMutation,
//   useProductDetailWishlist,
// } from "@/hooks/app";

// import { ProductDescription } from "./ProductDescription";
// import { ProductReviews } from "./ProductReviews";
// import { VisibleSection } from "@/components/ui/visibleSection";

// export const ProductInformation = () => {
//   const params = useParams();

//   const productName = params.productName as string;

//   const { data: config } = useConfigQuery();

//   const { data: productDetail } = useProductDetailByNameQuery(productName);

//   const { handleAddToCart, isPending: isCartPending } =
//     useProductDetailCartMutation();
//   const { handleAddToWishlist, isPending: isWishlistPending } =
//     useProductDetailWishlist();

//   const minimumQuantity = productDetail?.custom_minimum_order_quantity || 1;
//   const maximumQuantity = productDetail?.custom_maximum_order_quantity || 100;
//   const incrementStep = productDetail?.custom_increment_on_quantity || 1;

//   const [quantity, setQuantity] = useState(minimumQuantity);

//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity < minimumQuantity || newQuantity > maximumQuantity) return;

//     setQuantity(newQuantity);
//   };

//   const price = productDetail?.prices?.[0]?.price_list_rate;

//   const onAddToWishlist = () => {
//     const payload = {
//       item_code: productDetail?.item_code,
//       quantity,
//     };

//     handleAddToWishlist(payload);
//   };

//   const onAddToCart = () => {
//     const payload = {
//       item_code: productDetail?.item_code,
//       item_price: price || "",
//       quantity,
//     };
//     handleAddToCart(payload);
//   };

//   const { checkAuth } = useAuthCheck();

//   return (
//     <Flex flex={1} flexDirection="column" width="100%">
//       <VStack
//         alignItems="stretch"
//         gap={{ base: "20px", lg: "28px" }}
//         paddingTop={{ base: "24px", md: "0" }}
//         paddingBottom={{ base: "24px", lg: "40px" }}
//         borderBottom={{ base: 0, md: "1px solid" }}
//         borderColor={{ md: "system.neutral.separator.light" }}
//       >
//         {/* title */}
//         <Stack gap={{ base: "12px", lg: "24px" }} width="100%">
//           <Stack gap="12px">
//             {/* <HStack justifyContent="space-between">
//               <Text
//                 color="system.text.light.light"
//                 variant="subtitle2"
//                 fontSize={{ base: "12px", lg: "14px" }}
//               >
//                 {productDetail?.item_group}
//               </Text>
//               <Text
//                 color="system.text.light.light"
//                 variant="subtitle2"
//                 fontSize={{ base: "12px", lg: "14px" }}
//               >
//                 {productDetail?.item_code}
//               </Text>
//             </HStack> */}

//             <Heading
//               color="black"
//               fontSize={{
//                 base: "20px",
//                 lg: "24px",
//                 xl: "28px",
//               }}
//             >
//               {productDetail?.item_name}
//             </Heading>

//             <Text
//               color="system.text.light.light"
//               variant="subtitle2"
//               fontSize={{ base: "12px", lg: "14px" }}
//             >
//               {productDetail?.description}
//             </Text>
//           </Stack>
//           <HStack gap="0">
//             <VisibleSection visibility={config?.rate_visibility}>
//               <Heading variant="heading6" fontWeight="400">
//                 {config.currency} {price}
//               </Heading>
//             </VisibleSection>

//             {/* <Text
//               variant="subtitle1"
//               color="danger.100"
//               paddingLeft="12px"
//               textDecoration="line-through"
//             >
//               रु{productDetail.originalPrice}
//             </Text>

//             <Text
//               variant="subtitle2"
//               borderRadius="8px"
//               color="system.text.light.light"
//               paddingLeft="4px"
//             >
//               -{productDetail.discount}
//             </Text> */}
//           </HStack>
//         </Stack>

//         {productDetail?.variants && (
//           <Stack gap="12px">
//             <Text variant="subtitle1" color="system.text.normal.light">
//               Choose Variant
//             </Text>

//             <ProductVariantTabs variants={productDetail?.variants} />
//           </Stack>
//         )}

//         {/* size */}
//         {/* <Stack gap="12px" py={{ base: "24px", lg: "32px" }}>
//           <HStack gap="0">
//             <Text variant="subtitle1" color="system.text.normal.light">
//               Choose Size
//             </Text>
//             <Text
//               variant="subtitle2"
//               fontSize="14px"
//               color="system.text.light.light"
//             >
//               * All size are in EU
//             </Text>
//           </HStack>
//           <HStack gap="12px">
//             {productDetail?.sizes?.map((size, index) => (
//               <Text
//                 key={index}
//                 variant="subtitle1"
//                 color="system.text.primary.primary.light"
//                 border="1px solid"
//                 borderColor="system.neutral.separator.light"
//                 padding="12px 16px"
//                 width="fit-content"
//               >
//                 {size}
//               </Text>
//             ))}
//           </HStack>
//         </Stack> */}
//         <VisibleSection visibility={config?.cart_visibility}>
//           {/* quantity */}
//           <Stack gap="12px">
//             <Text variant="subtitle1" color="system.text.normal.light">
//               Quantity
//             </Text>
//             <QuantityInput
//               value={quantity}
//               onChange={handleQuantityChange}
//               minimum={minimumQuantity}
//               maximum={maximumQuantity}
//               incrementStep={incrementStep}
//             />
//           </Stack>
//           {/* button */}
//           <HStack gap="20px" width="100%">
//             <VisibleSection visibility={config?.cart_visibility}>
//               <Button
//                 rounded={"3xl"}
//                 bg={"#FF6996"}
//                 type="submit"
//                 flex={1}
//                 onClick={checkAuth(onAddToCart)}
//                 loading={isCartPending}
//               >
//                 Add to Bag
//               </Button>
//             </VisibleSection>
//             <VisibleSection visibility={config?.wishlist_visibility}>
//               <Button
//                 borderRadius={"full"}
//                 h={"10px"}
//                 w={"10px"}
//                 bg={"#FF6996"}
//                 onClick={checkAuth(onAddToWishlist)}
//                 loading={isWishlistPending}
//               >
//                 <HeartIcon
//                   style={{
//                     color: "white",
//                   }}
//                 />
//               </Button>
//             </VisibleSection>
//           </HStack>
//         </VisibleSection>
//       </VStack>

//       {/* description */}
//       <ProductDescription />

//       {/* reviews */}
//       <VisibleSection visibility={config?.cart_visibility}>
//         <ProductReviews item_code={productDetail?.item_code ?? ""} />
//       </VisibleSection>
//     </Flex>
//   );
// };

"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { HeartIcon } from "@/assets/svg";
import { Button, ProductVariantTabs, QuantityInput } from "@/components";
import { useConfigQuery, useProductDetailByNameQuery } from "@/hooks/api";
import {
  useAuthCheck,
  useProductDetailCartMutation,
  useProductDetailWishlist,
} from "@/hooks/app";

import { ProductDescription } from "./ProductDescription";
import { ProductReviews } from "./ProductReviews";
import { VisibleSection } from "@/components/ui/visibleSection";
import { useVariantStore } from "@/store";
import { FaStar } from "react-icons/fa";

export const ProductInformation = () => {
  const params = useParams();
  const productName = params.productName as string;
  const { activeVariant } = useVariantStore();

  const { data: config } = useConfigQuery();
  const { data: productDetail } = useProductDetailByNameQuery(productName);

  const { handleAddToCart, isPending: isCartPending } =
    useProductDetailCartMutation();
  const { handleAddToWishlist, isPending: isWishlistPending } =
    useProductDetailWishlist();

  const minimumQuantity = productDetail?.custom_minimum_order_quantity || 1;
  const maximumQuantity = productDetail?.custom_maximum_order_quantity || 100;
  const incrementStep = productDetail?.custom_increment_on_quantity || 1;

  const [quantity, setQuantity] = useState(minimumQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < minimumQuantity || newQuantity > maximumQuantity) return;

    setQuantity(newQuantity);
  };

  // Get price based on whether product has variants or not
  const price = useMemo(() => {
    if (!productDetail) return null;

    if (productDetail.has_variants) {
      const selectedVariant = productDetail.variants?.find(
        (variant) => variant.item_code === activeVariant
      );
      return selectedVariant?.prices?.[0]?.price_list_rate ?? null;
    }

    return productDetail.prices?.[0]?.price_list_rate ?? null;
  }, [productDetail, activeVariant]);

  const onAddToWishlist = () => {
    const payload = {
      item_code: productDetail?.has_variants
        ? activeVariant
        : productDetail?.item_code,
      quantity,
    };

    handleAddToWishlist(payload);
  };

  const onAddToCart = () => {
    const payload = {
      item_code: productDetail?.has_variants
        ? activeVariant
        : productDetail?.item_code,
      item_price: price || "",
      quantity,
    };
    handleAddToCart(payload);
  };

  const { checkAuth } = useAuthCheck();

  return (
    <Flex flex={1} flexDirection="column" width="100%">
      <VStack
        alignItems="stretch"
        gap={{ base: "20px", lg: "28px" }}
        paddingTop={{ base: "24px", md: "0" }}
        paddingBottom={{ base: "24px", lg: "40px" }}
        borderBottom={{ base: 0, md: "1px solid" }}
        borderColor={{ md: "system.neutral.separator.light" }}
      >
        {/* title */}
        <Stack gap={{ base: "12px", lg: "24px" }} width="100%">
          <Stack gap="12px">
            {/* <HStack justifyContent="space-between">
              <Text
                color="system.text.light.light"
                variant="subtitle2"
                fontSize={{ base: "12px", lg: "14px" }}
              >
                {productDetail?.item_group}
              </Text>
              <Text
                color="system.text.light.light"
                variant="subtitle2"
                fontSize={{ base: "12px", lg: "14px" }}
              >
                {productDetail?.item_code}
              </Text>
            </HStack> */}

            <Heading
              color="black"
              fontSize={{
                base: "20px",
                lg: "24px",
                xl: "28px",
              }}
            >
              {productDetail?.item_name}
            </Heading>

            <Text
              color="system.text.light.light"
              variant="subtitle2"
              fontSize={{ base: "12px", lg: "14px" }}
            >
              {productDetail?.description}
            </Text>
          </Stack>
          <HStack gap="0">
            <VisibleSection visibility={config?.rate_visibility}>
              <Heading variant="heading6" fontWeight="400">
                {config?.currency} {price}
              </Heading>
            </VisibleSection>

            {/* <Text
              variant="subtitle1"
              color="danger.100"
              paddingLeft="12px"
              textDecoration="line-through"
            >
              रु{productDetail.originalPrice}
            </Text>

            <Text
              variant="subtitle2"
              borderRadius="8px"
              color="system.text.light.light"
              paddingLeft="4px"
            >
              -{productDetail.discount}
            </Text> */}
          </HStack>
        </Stack>

        {productDetail?.has_variants && productDetail?.variants && (
          <Stack gap="12px">
            <Text variant="subtitle1" color="system.text.normal.light">
              Choose Variant
            </Text>

            <ProductVariantTabs variants={productDetail?.variants} />
          </Stack>
        )}

        {/* size */}
        {/* <Stack gap="12px" py={{ base: "24px", lg: "32px" }}>
          <HStack gap="0">
            <Text variant="subtitle1" color="system.text.normal.light">
              Choose Size
            </Text>
            <Text
              variant="subtitle2"
              fontSize="14px"
              color="system.text.light.light"
            >
              * All size are in EU
            </Text>
          </HStack>
          <HStack gap="12px">
            {productDetail?.sizes?.map((size, index) => (
              <Text
                key={index}
                variant="subtitle1"
                color="system.text.primary.primary.light"
                border="1px solid"
                borderColor="system.neutral.separator.light"
                padding="12px 16px"
                width="fit-content"
              >
                {size}
              </Text>
            ))}
          </HStack>
        </Stack> */}
        <VisibleSection visibility={config?.cart_visibility}>
          {/* quantity */}
          <Stack gap="12px">
            <Text variant="subtitle1" color="system.text.normal.light">
              Quantity
            </Text>
            <QuantityInput
              value={quantity}
              onChange={handleQuantityChange}
              minimum={minimumQuantity}
              maximum={maximumQuantity}
              incrementStep={incrementStep}
            />
          </Stack>
          {/* button */}
          <HStack gap="20px" width="100%">
            <VisibleSection visibility={config?.cart_visibility}>
              <Button
                rounded={"3xl"}
                bg={"#FF6996"}
                type="submit"
                flex={1}
                onClick={checkAuth(onAddToCart)}
                loading={isCartPending}
              >
                Add to Bag
              </Button>
            </VisibleSection>
            <VisibleSection visibility={config?.wishlist_visibility}>
              <Button
                borderRadius={"full"}
                h={"10px"}
                w={"10px"}
                bg={"#FF6996"}
                onClick={checkAuth(onAddToWishlist)}
                loading={isWishlistPending}
              >
                <HeartIcon
                  style={{
                    color: "white",
                  }}
                />
              </Button>
            </VisibleSection>
          </HStack>
        </VisibleSection>
      </VStack>

      {/* description */}
      <ProductDescription />

      {/* reviews */}
      <VisibleSection visibility={config?.cart_visibility}>
        <ProductReviews
          item_code={
            productDetail?.has_variants
              ? activeVariant
              : (productDetail?.item_code ?? "")
          }
        />
      </VisibleSection>
    </Flex>
  );
};
