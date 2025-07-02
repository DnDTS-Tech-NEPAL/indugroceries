// "use client";

// import { FilterSelect, ProductCard } from "@/components";
// import { useFilterProductsQuery } from "@/hooks/api";
// import { useBrandFilterStore } from "@/store/products/brandFilterStore";

// import {
//   Box,
//   Container,
//   Flex,
//   Grid,
//   GridItem,
//   Heading,
//   Text,
//   VStack,
//   HStack,
//   Select,
//   Portal,
//   createListCollection,
// } from "@chakra-ui/react";
// import { BrandFilter } from "./BrandFilter";
// import { useState } from "react";
// import { SortIcon } from "@/assets/svg";

// interface BrandProductsPageProps {
//   brandName: string;
// }

// export default function BrandProductsPage({ brandName }: BrandProductsPageProps) {
//   const {
//     category,
//     priceRange,
//     discount,
//     inStock,
//   } = useBrandFilterStore();
// const [sortBy, setSortBy] = useState<string>("");
//   const { data, isLoading } = useFilterProductsQuery({
//     brand: [brandName],
//     item_group: category.length ? category : ["All Item Groups"],
//     in_stock: inStock,
//     bestseller: discount,
//     pricerange: 0, 
//     page: 1,
//     size: 20000,
//   });

//   const products = data?.products || [];

//   // Extract prices from nested API field, fallback 0
//   const allPrices = products.map((p) => p.price || 0);

//   // Compute dynamic min and max price for slider
//   const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
//   const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 2500;

//   // Filter products frontend by price range selected
//   const filteredProducts = products.filter((product) => {
//     const price = product.price || 0; 

//     return price >= priceRange[0] && price <= priceRange[1];
//   });
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//   const priceA = a.price || 0;
//   const priceB = b.price || 0;

//   if (sortBy === "low-high") return priceA - priceB;
//   if (sortBy === "high-low") return priceB - priceA;
//   if (sortBy === "newest") return new Date(b.creation).getTime() - new Date(a.creation).getTime();

//   return 0; // default (Relevance)
// });


//   const orderStatusOptions = createListCollection({
//     items: [
//       { label: "Price: Low to High", value: "low-high" },
//       { label: "Price: High to Low", value: "high-low" },
//       { label: "Newest", value: "newest" },
//     ],
//   });

//   return (
//     <Container maxW="7xl" py={8}>
//       <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
//         {/* Sidebar Filters */}
//         <BrandFilter minPrice={minPrice} maxPrice={maxPrice} />

//         {/* Main Content */}
//         <GridItem>
//           <VStack gap={6} align="stretch">
//             {/* Header */}
//             <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
//               <Box>
//                 <HStack gap={4} align="baseline">
//                   <Heading size="lg">All Products</Heading>
//                   ({filteredProducts.length} products found)
//                   <Heading size="lg" color="gray.800">
//                     {brandName}
//                   </Heading>
//                 </HStack>
//               </Box>
//               <HStack>
//                 <Text fontSize="sm">Sort By :</Text>
//                 <Select.Root collection={orderStatusOptions} size="sm" width="200px" onValueChange={(val) => setSortBy(val.value)}>
                

//                   <Select.HiddenSelect />
//                   <Flex>
//                     <Select.Control>
//                       <Select.Trigger width={"140px"}>
//                         <Select.ValueText placeholder="Relevance" />
//                       </Select.Trigger>
//                       <Select.IndicatorGroup>
//                         <Select.Indicator />
//                       </Select.IndicatorGroup>
//                     </Select.Control>
//                   </Flex>
//                   <Portal>
//                     <Select.Positioner>
//                       <Select.Content>
//                         {orderStatusOptions.items.map((item) => (
//                           <Select.Item item={item} key={item.value}>
//                             {item.label}
//                             <Select.ItemIndicator />
//                           </Select.Item>
//                         ))}
//                       </Select.Content>
//                     </Select.Positioner>
//                   </Portal>
//                 </Select.Root>
//               </HStack>
//             </Flex>

//             {/* Products Grid */}
//             <Grid
//               templateColumns={{
//                 base: "1fr",
//                 md: "repeat(2, 1fr)",
//                 lg: "repeat(3, 1fr)",
//               }}
//               gap={6}
//             >
//               {sortedProducts.map((product) => (
//                 <ProductCard key={product.title} {...product} />
//               ))}
//             </Grid>
//           </VStack>
//         </GridItem>
//       </Grid>
//     </Container>
//   );
// }
"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";

import { FilterSelect, ProductCard } from "@/components";
import { useFilterProductsQuery } from "@/hooks/api";
import { useBrandFilterStore } from "@/store/products/brandFilterStore";
import { BrandFilter } from "./BrandFilter";
import { SortIcon } from "@/assets/svg";
import { priceRangeFilterOptions } from "@/constants";

interface BrandProductsPageProps {
  brandName: string;
}

export default function BrandProductsPage({
  brandName,
}: BrandProductsPageProps) {
  const { category, priceRange, discount, inStock } = useBrandFilterStore();

  const { data } = useFilterProductsQuery({
    brand: [brandName],
    item_group: category.length ? category : ["All Item Groups"],
    in_stock: inStock,
    bestseller: discount,
    pricerange: 0,
    page: 1,
    size: 20000,
  });

  const products = data?.products || [];
  const allPrices = products.map((p) => p.price || 0);
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 2500;

  const filteredProducts = products.filter((product) => {
    const price = product.price || 0;
    return price >= priceRange[0] && price <= priceRange[1];
  });

    const orderStatusOptions = createListCollection({
    items: [
      { label: "Price: Low to High", value: "low-high" },
      { label: "Price: High to Low", value: "high-low" },
      { label: "Newest", value: "newest" },
    ],
})

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.price || 0;
    const priceB = b.price || 0;

    // if (sortBy === "low-high") return priceA - priceB;
    // if (sortBy === "high-low") return priceB - priceA;
    // if (sortBy === "newest") return new Date(b.creation).getTime() - new Date(a.creation).getTime();

    return 0;
  });

  return (
    <Container maxW="7xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
        {/* Sidebar Filters */}
        <BrandFilter minPrice={minPrice} maxPrice={maxPrice} />

        {/* Main Content */}
        <GridItem>
          <VStack gap={6} align="stretch">
            {/* Header */}
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <Box>
                <HStack gap={4} align="baseline">
                  <Heading size="lg">All Products</Heading>(
                  {filteredProducts.length} products found)
                  <Heading size="lg" color="gray.800">
                    {brandName}
                  </Heading>
                </HStack>
              </Box>
              <HStack>
                <Text fontSize="sm">Sort By :</Text>
                <Select.Root
                  collection={orderStatusOptions}
                  size="sm"
                  width="200px"
                >
                  <Select.HiddenSelect />
                  <Flex>
                    <Select.Control>
                      <Select.Trigger width={"140px"}>
                        <Select.ValueText placeholder="Relevance" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                  </Flex>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {orderStatusOptions.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </HStack>
            </Flex>

            {/* Products Grid */}
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.title} {...product} />
              ))}
            </Grid>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
