import { Tabs } from "@/components";
import { useProductDetailByNameQuery } from "@/hooks/api";
import { Box } from "@chakra-ui/react";

export const TabsDescription = ({ productName }: { productName: string }) => {
  const { data: productDetail } = useProductDetailByNameQuery(productName);

  const tabs = [];
  if (
    productDetail?.custom_specifications ||
    productDetail?.custom_short_description
  ) {
    tabs.push({
      value: "description",
      label: "Description",
      shortContent: productDetail.custom_specifications,
      content:
        productDetail.custom_long_description ||
        productDetail.custom_specifications,
    });
  }

  if (productDetail?.custom_ingredients?.trim()) {
    tabs.push({
      value: "ingredients",
      label: "Ingredients",
      content: productDetail.custom_ingredients,
    });
  }

  if (productDetail?.custom_how_to_use?.trim()) {
    tabs.push({
      value: "how-to-use",
      label: "How to use",
      content: productDetail.custom_how_to_use,
    });
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Tabs tabs={tabs} size="sm" />
    </Box>
  );
};
