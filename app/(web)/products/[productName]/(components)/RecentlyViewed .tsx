import { Box, Text, VStack, SimpleGrid, Heading } from "@chakra-ui/react";
import { ProductCard } from "@/components";
import { useRecentlyViewedProductsQuery } from "@/hooks/api";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/app";

const RecentlyViewed = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { data: recentlyViewedProducts, refetch } =
    useRecentlyViewedProductsQuery(isAuthenticated);

  useEffect(() => {
    refetch();
  }, [pathname, isAuthenticated]);

  if (!recentlyViewedProducts || recentlyViewedProducts.length === 0) {
    return null;
  }
  return (
    <Box p={5}>
      <VStack gap={2} mb={6} textAlign="center">
        <Heading
          fontSize={{
            base: "16px",
            lg: "24px",
            xl: "28px",
          }}
        >
          Recently Viewed
        </Heading>
        <Text color="gray.500">
          Your recent beauty scroll, ready to explore again.
        </Text>
      </VStack>

      <SimpleGrid columns={[1, 2, 2, 4]} gap={6}>
        {recentlyViewedProducts?.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            item_code={product.item_code}
            image={product.custom_image_1_link}
            title={product.item_name}
            price={product?.prices[0]?.price_list_rate || ""}
            link={product.item_code}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RecentlyViewed;
