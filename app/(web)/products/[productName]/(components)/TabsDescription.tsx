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
  if (displayProduct || productDetail) {
    const variantContent =
      displayProduct?.custom_benefits || displayProduct?.core_ingredients;
    const parentContent =
      productDetail?.custom_benefits || productDetail?.core_ingredients;

    const getCleanText = (
      variantValue: unknown,
      parentValue: unknown,
      fallback: string
    ): string => {
      const parse = (val: unknown): string | null => {
        if (typeof val === "string" && val.trim() && val.trim() !== "null") {
          return val.trim();
        }
        if (Array.isArray(val) && val.length > 0) {
          return val
            .filter((item) => typeof item === "string" && item.trim() !== "")
            .join(", ");
        }
        return null;
      };

      return parse(variantValue) || parse(parentValue) || fallback;
    };

    tabs.push({
      value: "description",
      label: "Description",
      content: {
        sections: [
          {
            heading: "Benefits",
            text: getCleanText(
              displayProduct?.custom_benefits,
              productDetail?.custom_benefits,
              "No Benefits Found"
            ),
          },
          {
            heading: "Core Ingredients",
            text: getCleanText(
              displayProduct?.core_ingredients,
              productDetail?.core_ingredients,
              "No Core Ingredients Found"
            ),
          },
        ],
        table: [
          {
            label: "Skin type",
            value:
              Array.isArray(displayProduct?.skin_types) &&
              displayProduct.skin_types.length > 0
                ? displayProduct.skin_types.join(", ")
                : "-",
          },

          {
            label: "Age",
            value:
              Array.isArray(displayProduct?.age) &&
              displayProduct.age.length > 0
                ? displayProduct.age.join(", ")
                : "-",
          },
          {
            label: "Product Texture",
            value:
              Array.isArray(displayProduct?.product_texture) &&
              displayProduct.product_texture.length > 0
                ? displayProduct.product_texture.join(", ")
                : "-",
          },
          {
            label: "Dermatologist Tested",
            value:
              displayProduct?.custom_dermatologist_tested === 1 ? "Yes" : "No",
          },
          {
            label: "Vegan",
            value: displayProduct?.custom_vegan === 1 ? "Yes" : "No",
          },
          {
            label: "Cruelty Free",
            value: displayProduct?.custom_cruelty_free === 1 ? "Yes" : "No",
          },
          {
            label: "Fragance",
            value: displayProduct?.custom_fragnance === 1 ? "Yes" : "No",
          },
          {
            label: "Manufactured in",
            value:
              displayProduct?.custom_manufactured_in ||
              productDetail?.custom_manufactured_in ||
              "-",
          },
        ],
        custom_long_description: displayProduct?.custom_long_description
          ? displayProduct?.custom_long_description
          : productDetail?.custom_long_description,
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
      // py={{ base: 4, md: 2 }}
      mb={{ base: 1, md: 3 }}
      borderBottom={{ base: 0, md: "0.1rem solid #B1B1B2" }}
    >
      <Tabs tabs={tabs} size="sm" />
    </Box>
  );
};
