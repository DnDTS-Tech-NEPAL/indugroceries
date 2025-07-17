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
            heading: "Short Description", // Added a heading as per TabContentStructured
            text: getCleanText(
              displayProduct?.custom_short_description,
              productDetail?.custom_short_description,
              "No description available"
            ),
          },
        ],
        table: [], // Initialize table as an empty array of the correct type
        custom_long_description: displayProduct?.custom_long_description
          ? displayProduct?.custom_long_description
          : productDetail?.custom_long_description,
      },
      isFromVariant: !!variantContent && variantContent !== parentContent,
      parentContent: parentContent,
    });
  }
  // Ingredients tab - show variant ingredients if available, otherwise parent

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      // py={{ base: 4, md: 2 }}
      mb={{ base: 1, md: 3 }}
      borderBottom={{ base: 0, md: "0.1rem solid #a1a1a157" }}
    >
      <Tabs tabs={tabs} size="sm" />
    </Box>
  );
};
