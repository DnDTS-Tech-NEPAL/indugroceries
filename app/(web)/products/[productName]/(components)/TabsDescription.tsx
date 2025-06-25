import { Tabs } from "@/components";
import { useProductDetailByNameQuery } from "@/hooks/api";
import { Box } from "@chakra-ui/react";

export const TabsDescription = ({ productName }: { productName: string }) => {
  const { data: productDetail } = useProductDetailByNameQuery(productName);

  const tabs = [
    {
      value: "description",
      label: "Description",
      shortContent: productDetail?.custom_specifications || " ",
      content: productDetail?.custom_long_description || " ",
    },
    {
      value: "ingredients",
      label: "Ingredients",
      content: productDetail?.custom_ingredients,
    },
    {
      value: "How to use",
      label: "How to use",
      content: productDetail?.custom_how_to_use,
    },
  ];
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
