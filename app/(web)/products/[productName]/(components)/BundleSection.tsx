import { Cart } from "@/assets/svg";
import { useConfigQuery } from "@/hooks/api";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Stack,
  Button,
  useBreakpointValue,
  Separator,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const products = [
  {
    name: "Celimax – The Vita-A Retinol Shot Tightening Serum",
    image: "/images/celimax.jpg", // Replace with your actual path
    originalPrice: 3200,
    discountedPrice: 2800,
    reviews: 420,
    average_rating: 4.5,
  },
  {
    name: "Cosrx Advanced Snail 92 All in one Cream",
    image: "/images/cosrx.jpg",
    originalPrice: 2500,
    discountedPrice: 1600,
    reviews: 420,
    average_rating: 4.5,
  },
  {
    name: "Beauty of Joseon – Matte Sun Stick Duo",
    image: "/images/joseon.jpg",
    originalPrice: 2000,
    discountedPrice: 1850,
    reviews: 420,
    average_rating: 4.5,
  },
];

const BundleSection = () => {
  const { data: config } = useConfigQuery();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const total = products.reduce((sum, p) => sum + p.discountedPrice, 0);
  // Responsive values
  const fontSize = useBreakpointValue({ base: "xs", md: "sm", lg: "md" });
  const priceFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const originalPriceFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const iconSize = useBreakpointValue({ base: 14, md: 16 });
  const starIconSize = useBreakpointValue({ base: 2, md: 3 });
  const imageHeight = useBreakpointValue({
    base: "320px",
    sm: "260px",
    md: "280px",
    lg: "308px",
  });

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        Get this BUNDLE & SAVE!
      </Text>

      <Stack direction={{ base: "column", md: "row" }} gap={6}>
        {products.map((p, i) => (
          <VStack key={i} p={4} gap={2} w={{ base: "100%", md: "30%" }}>
            <Box
              aspectRatio={1}
              bg="white"
              borderColor="gray.200"
              borderWidth="1px"
              borderRadius="md"
            >
              <Image
                src={p.image}
                alt={p.name}
                boxSize="170px"
                objectFit="contain"
              />
            </Box>
            <Flex
              justifyContent={"space-between"}
              flexDirection={"column"}
              gap={2}
              height="100%"
            >
              <Box>
                {/* Rating */}
                <HStack gap={1} px={3} pt={2}>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Icon
                        key={i}
                        as={FaStar}
                        color={
                          i < Math.ceil(p?.average_rating ?? 0)
                            ? "#FF6996"
                            : "gray.300"
                        }
                        boxSize={starIconSize}
                      />
                    ))}
                  <Text fontSize={fontSize} color="gray.600" ml={3}>
                    {p?.reviews ?? 0} reviews
                  </Text>
                </HStack>

                {/* Title */}
                <Text
                  cursor="pointer"
                  _hover={{ color: "#FF6996" }}
                  // onClick={() => {
                  //   router.push(
                  //     generateNextPath(ROUTES.APP.INDIVIDUAL_PRODUCT, {
                  //       productName: link,
                  //     })
                  //   );
                  //   addRecentlyViewedProduct(link);
                  // }}
                  fontWeight="semibold"
                  color="gray.800"
                  lineHeight="1.2"
                  px={3}
                  // lineClamp={{ sm: 2, md: 2 }}
                >
                  {p.name}
                </Text>
              </Box>
              {/* Price and Add to Cart */}
              <Stack
                direction={{ base: "row", sm: "row" }}
                justify="space-between"
                align="center"
                px={3}
                pb={4}
                gap={{ base: 3, sm: 2 }}
              >
                <Box
                  gap={2}
                  display={"flex"}
                  flexDirection={{ base: "column", md: "row" }}
                >
                  {/* {!min_price && !max_price ? ( */}
                  <>
                    <VStack gap={0}>
                      <Text
                        fontSize={priceFontSize}
                        color="#FF6996"
                        lineHeight="1.2"
                      >
                        {config?.currency} {p.discountedPrice}
                      </Text>
                      {/* {originalPrice && originalPrice !== price && ( */}
                      <Text
                        fontSize={originalPriceFontSize}
                        color="gray.400"
                        textDecoration="line-through"
                      >
                        {config?.currency} {p.originalPrice}
                      </Text>
                      {/* )} */}
                    </VStack>
                  </>
                  {/* ) : (
              <Text fontSize={priceFontSize} color="#FF6996" lineHeight="1.2">
                {config?.currency} {min_price} - {max_price}
              </Text>
            )} */}
                </Box>
                {/* {!min_price && !max_price && stock_qty > 0 && ( */}
                <Button
                  height="auto"
                  minH="32px"
                  w={{ base: "50%", sm: "55%", md: "45%" }}
                  bg="transparent"
                  color="#FF6996"
                  borderRadius="full"
                  border={"0.5px solid #FF6996"}
                  fontSize="14px"
                  fontWeight={"400"}
                  px={3}
                  py={0}
                  lineHeight="1.2"
                  //   onClick={checkAuth(onAddToCart)}
                >
                  Add <Cart />
                </Button>
                {/* )} */}
              </Stack>
            </Flex>
          </VStack>
        ))}
      </Stack>

      <Separator my={6} />

      <HStack justify="space-between" flexWrap="wrap" gap={4}>
        <HStack gap={8} wrap="wrap">
          <Text>
            1 Item
            <br />
            Rs 2800
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            +
          </Text>
          <Text>
            2 Item
            <br />
            Rs 3450
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            =
          </Text>
          <Text>
            Total
            <br />
            Rs {total}
          </Text>
        </HStack>

        <Button
          height="auto"
          minH="43px"
          w={"fit-content"}
          bg={"#FF6996"}
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
      </HStack>
    </Box>
  );
};

export default BundleSection;
