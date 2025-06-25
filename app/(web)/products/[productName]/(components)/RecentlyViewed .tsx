import { Box, Text, VStack, SimpleGrid, Heading } from "@chakra-ui/react";
import { ProductCard } from "@/components";
import { useRecentlyViewedProductsQuery } from "@/hooks/api";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const RecentlyViewed = () => {
  const pathname = usePathname(); // listens to route changes
  const { data: recentlyViewedProducts, refetch } =
    useRecentlyViewedProductsQuery();

  useEffect(() => {
    refetch();
  }, [pathname]);
  console.log(recentlyViewedProducts);
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
            image={product.image_url}
            title={product.item_name}
            price={product.item_price}
            link={product.item_code}
            {...product}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RecentlyViewed;
