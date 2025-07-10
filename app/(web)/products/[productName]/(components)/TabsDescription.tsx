import { Tabs } from "@/components";
import { useProductDetailByNameQuery } from "@/hooks/api";
import { Box } from "@chakra-ui/react";
import { useVariantStore } from "@/store";

export const TabsDescription = ({ productName }: { productName: string }) => {
  const { data: productDetail } = useProductDetailByNameQuery(productName);
  const { activeVariant } = useVariantStore();

  const selectedVariant = productDetail?.variants?.find(
    (v) => v.item_code === activeVariant
  );

  const displayProduct = productDetail?.has_variants
    ? selectedVariant || productDetail
    : productDetail;

  const tabs = [];

  // Description tab - structured format
  if (
    displayProduct?.custom_benefits ||
    displayProduct?.core_ingredients ||
    productDetail?.custom_benefits ||
    productDetail?.core_ingredients
  ) {
    const variantContent =
      displayProduct?.custom_benefits || displayProduct?.core_ingredients;
    const parentContent =
      productDetail?.custom_benefits || productDetail?.core_ingredients;

    tabs.push({
      value: "description",
      label: "Description",
      content: {
        sections: [
          {
            heading: "Benefits",
            text:
              displayProduct?.custom_benefits ||
              productDetail?.custom_benefits ||
              "",
          },
          {
            heading: "Core Ingredients",
            text:
              displayProduct?.core_ingredients ||
              productDetail?.core_ingredients ||
              "",
          },
        ],
        table: [
          {
            label: "Skin type",
            value:
              displayProduct?.skin_types || productDetail?.skin_types || "-",
          },
          {
            label: "Age",
            value: displayProduct?.age || productDetail?.age || "-",
          },
          {
            label: "Product Texture",
            value:
              displayProduct?.product_texture ||
              productDetail?.product_texture ||
              "-",
          },
          {
            label: "Dermatologist Tested",
            value:
              displayProduct?.custom_dermatologist_tested ||
              productDetail?.custom_dermatologist_tested ||
              "-",
          },
          {
            label: "Vegan",
            value:
              displayProduct?.custom_vegan ||
              productDetail?.custom_vegan ||
              "-",
          },
          {
            label: "Cruelty Free",
            value:
              displayProduct?.custom_cruelty_free ||
              productDetail?.custom_cruelty_free ||
              "-",
          },
          {
            label: "Fragance",
            value:
              displayProduct?.custom_fragnance ||
              productDetail?.custom_fragnance ||
              "-",
          },
          {
            label: "Manufactured in",
            value:
              displayProduct?.custom_manufactured_in ||
              productDetail?.custom_manufactured_in ||
              "-",
          },
        ],
      },
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
  // About brand tab - show variant brand info if available, otherwise parent
  if (
    displayProduct?.about_brand?.trim() ||
    productDetail?.about_brand?.trim()
  ) {
    tabs.push({
      value: "about-brand",
      label: "About Brand",
      content: displayProduct?.about_brand || productDetail?.about_brand,
      isFromVariant:
        !!displayProduct?.about_brand?.trim() &&
        displayProduct?.about_brand !== productDetail?.about_brand,
      parentContent: productDetail?.about_brand,
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
      <Tabs tabs={tabs} size="sm" />
    </Box>
  );
};
