// import { Tabs } from "@/components";
// import { useProductDetailByNameQuery } from "@/hooks/api";
// import { Box } from "@chakra-ui/react";

// export const TabsDescription = ({ productName }: { productName: string }) => {
//   const { data: productDetail } = useProductDetailByNameQuery(productName);

//   const tabs = [];
//   if (
//     productDetail?.custom_specifications ||
//     productDetail?.custom_short_description
//   ) {
//     tabs.push({
//       value: "description",
//       label: "Description",
//       shortContent: productDetail.custom_specifications,
//       content:
//         productDetail.custom_long_description ||
//         productDetail.custom_specifications,
//     });
//   }

//   if (productDetail?.custom_ingredients?.trim()) {
//     tabs.push({
//       value: "ingredients",
//       label: "Ingredients",
//       content: productDetail.custom_ingredients,
//     });
//   }

//   if (productDetail?.custom_how_to_use?.trim()) {
//     tabs.push({
//       value: "how-to-use",
//       label: "How to use",
//       content: productDetail.custom_how_to_use,
//     });
//   }
//   // && productDetail?.skin_types?.length >= 0
//   if (productDetail ) {
//     tabs.push({
//       value: "skin-types",
//       label: "For Skin Types",
//       // content: productDetail.skin_types.join(", "),
//       content: productDetail.skin_types,

//     });
//   }
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="100%"
//     >
//       <Tabs tabs={tabs} size="sm" />
//     </Box>
//   );
// };

import { Tabs } from "@/components";
import { useProductDetailByNameQuery } from "@/hooks/api";
import { Box } from "@chakra-ui/react";
import { useVariantStore } from "@/store";

export const TabsDescription = ({ productName }: { productName: string }) => {
  const { data: productDetail } = useProductDetailByNameQuery(productName);
  const { activeVariant } = useVariantStore();

  // Get the currently selected variant
  const selectedVariant = productDetail?.variants?.find(
    (v) => v.item_code === activeVariant
  );

  // Determine which product to display (variant or parent)
  const displayProduct = productDetail?.has_variants
    ? selectedVariant || productDetail
    : productDetail;

  const tabs = [];

  // Description tab - show variant description if available, otherwise parent
  if (
    displayProduct?.custom_specifications ||
    displayProduct?.custom_long_description ||
    productDetail?.custom_specifications ||
    productDetail?.custom_short_description
  ) {
    const variantContent =
      displayProduct?.custom_long_description ||
      displayProduct?.custom_specifications;
    const parentContent =
      productDetail?.custom_long_description ||
      productDetail?.custom_specifications;

    tabs.push({
      value: "description",
      label: "Description",
      shortContent:
        displayProduct?.custom_specifications ||
        productDetail?.custom_specifications,
      content: variantContent || parentContent,
      isFromVariant: !!variantContent && variantContent !== parentContent,
      parentContent: parentContent,
    });
  }

  // Ingredients tab - show variant ingredients if available, otherwise parent
  if (
    displayProduct?.custom_ingredients?.trim() ||
    productDetail?.custom_ingredients?.trim()
  ) {
    tabs.push({
      value: "ingredients",
      label: "Ingredients",
      content:
        displayProduct?.custom_ingredients || productDetail?.custom_ingredients,
      isFromVariant:
        !!displayProduct?.custom_ingredients?.trim() &&
        displayProduct?.custom_ingredients !==
          productDetail?.custom_ingredients,
      parentContent: productDetail?.custom_ingredients,
    });
  }

  // How to use tab - show variant instructions if available, otherwise parent
  if (
    displayProduct?.custom_how_to_use?.trim() ||
    productDetail?.custom_how_to_use?.trim()
  ) {
    tabs.push({
      value: "how-to-use",
      label: "How to use",
      content:
        displayProduct?.custom_how_to_use || productDetail?.custom_how_to_use,
      isFromVariant:
        !!displayProduct?.custom_how_to_use?.trim() &&
        displayProduct?.custom_how_to_use !== productDetail?.custom_how_to_use,
      parentContent: productDetail?.custom_how_to_use,
    });
  }

  // Skin types tab - show variant skin types if available, otherwise parent
  if (
    (displayProduct?.skin_types && displayProduct?.skin_types.length > 0) ||
    (productDetail?.skin_types && productDetail?.skin_types.length > 0)
  ) {
    const variantSkinTypes = displayProduct?.skin_types || [];
    const parentSkinTypes = productDetail?.skin_types || [];

    tabs.push({
      value: "skin-types",
      label: "For Skin Types",
      content: variantSkinTypes.length > 0 ? variantSkinTypes : parentSkinTypes,
      isFromVariant:
        variantSkinTypes.length > 0 &&
        JSON.stringify(variantSkinTypes) !== JSON.stringify(parentSkinTypes),
      parentContent: parentSkinTypes,
    });
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      py={{ base: 4, md: 6 }}
    >
      <Tabs
        tabs={tabs}
        size="sm"
        // showParentInfo={productDetail?.has_variants === 1}
      />
    </Box>
  );
};
