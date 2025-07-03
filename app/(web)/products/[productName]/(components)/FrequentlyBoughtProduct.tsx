import { ProductCard } from "@/components";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Separator,
  SimpleGrid,
} from "@chakra-ui/react";

const products = [
  {
    id: 1,
    item_code: "Medicube-Zero-Pore-Pad",
    name: "Medicube Zero Pore Pad",
    title: "Medicube Zero Pore Pad",
    originalPrice: 19.99,
    price: 17,
    discount: "10% Discount",
    image: "/images/pore-pad.jpg",
    link: "/medicube-zero-pore-pad",
    stock_qty: 10,
  },
  {
    id: 2,
    item_code: "CICA-Houttuynia-Tea-Tree",
    name: "CICA Houttuynia Tea Tree",
    title: "CICA Houttuynia Tea Tree",
    price: 21,
    discount: "Sale",
    image: "/images/tea-tree.jpg",
    link: "/cica-houttuynia-tea-tree",
    stock_qty: 10,
  },
  {
    id: 3,
    item_code: "Carrot-Carotene",
    name: "Carrot Carotene",
    title: "Carrot Carotene",
    originalPrice: 20.99,
    price: 15.99,
    discount: "10% Discount",
    image: "/images/carrot.jpg",
    link: "/carrot-carotene",
    stock_qty: 10,
  },
  {
    id: 4,
    item_code: "Medicube-plus",
    name: "Medicube plus",
    title: "Medicube plus",
    originalPrice: 24.99,
    price: 20.99,
    discount: "10% Discount",
    image: "/images/medicube-plus.jpg",
    link: "/medicube-plus",
    stock_qty: 10,
  },
];

const FrequentlyBoughtProduct = () => {
  const selectedItems = [products[0], products[1]];
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Box p={5}>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Frequently Bought Together
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} gap="20px">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </SimpleGrid>

      <Separator my={6} />

      {/* Summary Section */}
      <Flex
        justify="space-between"
        align="center"
        // p={4}
        // border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        mt={4}
        wrap="wrap"
      >
        <Stack direction="row" align="center" gap={4} color={"#2E2E2E"}>
          <Box pr={6}>
            <Text fontSize={"12px"} color={"#7A7A7A"}>
              1 Item
            </Text>
            <Text fontSize={"16px"}>Rs 2800</Text>
          </Box>
          <Text fontSize={"20px"} color={"#7A7A7A"}>
            +
          </Text>
          <Box px={6}>
            <Text fontSize={"12px"} color={"#7A7A7A"}>
              2 Item
            </Text>
            <Text fontSize={"16px"}>Rs 3450</Text>
          </Box>
          <Text fontSize={"20px"} color={"#7A7A7A"}>
            =
          </Text>
          <Box px={6}>
            <Text fontSize={"12px"} color={"#7A7A7A"}>
              Total
            </Text>
            <Text fontWeight="16px">
              Rs{" "}
              {totalPrice % 1 === 0
                ? totalPrice.toFixed(0)
                : totalPrice.toFixed(2)}
            </Text>
          </Box>
        </Stack>
        <Button
          height="auto"
          minH="43px"
          w={{ base: "50%", sm: "55%", md: "60%" }}
          //   bg={"transparent"}
          bg={"#FF6996"}
          //   color={"#FF6996"}
          color={"white"}
          borderRadius="full"
          border={"0.5px solid #FF6996"}
          fontSize="14px"
          fontWeight={"400"}
          px={3}
          py={0}
          lineHeight="1.2"
          //   onClick={checkAuth(onAddToCart)}
        >
          Add 3 items to cart
        </Button>
      </Flex>
    </Box>
  );
};

export default FrequentlyBoughtProduct;
