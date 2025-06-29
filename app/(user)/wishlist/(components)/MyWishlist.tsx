import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { BsCart3 } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

const initialItems = [
  {
    id: 1,
    name: "Biotique Bio Papaya Visibly Flawless Face wash",
    price: 305,
    image: "/images/product1.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Biotique New York Falsies Lash Lift",
    price: 400,
    image: "/images/product2.png",
    quantity: 2,
  },
  {
    id: 3,
    name: "Biotique New York Falsies Lash Lift",
    price: 235,
    image: "/images/product3.png",
    quantity: 2,
  },
];

export default function MyWishlist() {
  const [items, setItems] = useState(initialItems);

  const increment = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box p={6} maxW="7xl" mx="auto">
      <Text fontSize="2xl" fontWeight="medium" mb={4}>
        My Wishlist{" "}
        <Text as="span" fontSize="md">
          ({items.length} items)
        </Text>
      </Text>

      <Flex px={5} py={4} bg="#28353D0A" rounded="md">
        <Box flex="1">Items</Box>
        <Box w="150px" textAlign="center">
          Quantity
        </Box>
        <Box w="100px" textAlign="right">
          Subtotal
        </Box>
        <Box w="160px" textAlign="center"></Box>
      </Flex>

      <VStack gap={4} mt={4} align="stretch">
        {items.map((item) => (
          <Box key={item.id} bg="#28353D0A" p={4} rounded="md">
            <Flex align="center">
              {/* Item Info */}
              <Flex flex="1" align="center" gap={4}>
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize="60px"
                  objectFit="cover"
                  rounded="md"
                />
                <Box>
                  <Text fontWeight="medium">{item.name}</Text>
                  <Text fontWeight={"medium"}>Rs. {item.price}</Text>
                </Box>
              </Flex>

              {/* Quantity */}

              <Flex
                w="150px"
                border="1px solid"
                bg={"white"}
                borderColor="#28353D26"
                borderRadius="xl"
                px={3}
                py={3}
                align="center"
                justify="space-between"
                overflow="hidden"
              >
                <Minus onClick={() => decrement(item.id)} size={16} />

                <Box
                  px={2}
                  minW="32px"
                  textAlign="center"
                  borderColor="gray.200"
                >
                  {item.quantity}
                </Box>

                <Plus onClick={() => increment(item.id)} size={16} />
              </Flex>

              {/* Subtotal */}
              <Box w="100px" textAlign="right" fontWeight="medium">
                Rs. {item.quantity * item.price}
              </Box>

              {/* Actions */}
              <HStack justify="center" gap={4} ml={9}>
                <RiDeleteBinLine
                  size={25}
                  onClick={() => removeItem(item.id)}
                />
                <Button
                  bg="#FF6996"
                  color="white"
                  _hover={{ bg: "#FF4F82" }}
                  rounded="full"
                >
                  <BsCart3 />
                  Add To Bag
                </Button>
              </HStack>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
