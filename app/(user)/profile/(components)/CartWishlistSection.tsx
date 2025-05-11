import { Flex } from "@chakra-ui/react";
import { MyOrder } from "./MyOrder";

export const CartWishlistSection = () => {
  return (
    <Flex
      mt={{ base: "30px", lg: "60px" }}
      maxWidth="1280px"
      mx="auto"
      gap="40px"
      alignItems={"stretch"}
      justify="center"
      mb={5}
      direction={{ base: "column", lg: "row" }}
      px={{ base: "20px", xl: "0" }}
      height={"auto"}
    >
      <MyOrder />
    </Flex>
  );
};
