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

  const getCleanText = (value: unknown): string | null => {
    if (typeof value === "string" && value.trim() && value.trim() !== "null") {
      return value.trim();
    }
    return null;
  };

  const shortDescription = getCleanText(
    displayProduct?.custom_short_description
  );
  const longDescription =
    getCleanText(displayProduct?.custom_long_description) ||
    getCleanText(productDetail?.custom_long_description);

  const tabs = [
    {
      value: "description",
      label: "Description",
      content: {
        sections: [
          {
            heading: "Short Description",
            text: shortDescription || "No Short Description Available",
          },
          {
            heading: "View More",
            text: longDescription || "No Additional Description Found",
          },
        ],
      },
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      mb={{ base: 1, md: 3 }}
      borderBottom={{ base: 0, md: "0.1rem solid #a1a1a157" }}
    >
      <Tabs tabs={tabs} size="sm" />
    </Box>
  );
};
