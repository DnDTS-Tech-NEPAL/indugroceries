"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  AspectRatio,
  IconButton,
  Icon,
  Text,
  Heading,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { AddIcon, HeartIcon, SubtractIcon } from "@/assets/svg";
import { Dialog } from "@/components";
import Image from "next/image";

interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  videoSrc?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const RelatedProductCard = ({
  image,
  name,
  price,
  reviews,
}: {
  image: string;
  name: string;
  price: number;
  reviews: number;
}) => (
  <Box borderRadius="md" overflow="hidden" width="48%">
    <Image src={image} alt={name} width={100} height={100} />
    <Box mt={2}>
      <Text fontSize="xs" color="pink.500">
        ★★★★★ {reviews} reviews
      </Text>
      <Text fontSize="sm">{name}</Text>
      <Text fontSize="sm" fontWeight="bold" color="pink.500">
        Rs {price.toLocaleString()}
      </Text>
    </Box>
  </Box>
);

export const ProductModal = ({
  isOpen,
  onClose,
  product,
}: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));
  const increaseQuantity = () => setQuantity(Math.min(10, quantity + 1));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      contentMinWidth={{
        lg: "900px",
        xl: "1000px",
      }}
      hasCloseTrigger
    >
      <Flex direction={{ base: "column", md: "row" }} maxH={{ md: "90dvh" }}>
        {/* Media Section */}
        <MediaSection product={product} />

        {/* Details Section */}
        <DetailsSection
          product={product}
          quantity={quantity}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
        />
      </Flex>
    </Dialog>
  );
};

const MediaSection = ({ product }: { product: Product }) => (
  <Box position="relative" width={{ base: "100%", md: "40%" }} bg="black">
    <AspectRatio ratio={1} w="full" h="full">
      <video
        src={
          product.videoSrc ||
          "https://v.ftcdn.net/08/72/78/19/700_F_872781967_oeCwAo2GHj5WbsALmkrYTqUG2lj3phKx_ST.mp4"
        }
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AspectRatio>
    <Box
      position="absolute"
      bottom="4"
      left="4"
      bg="rgba(0,0,0,0.5)"
      color="white"
      px={2}
      py={1}
      borderRadius="md"
    >
      <Text fontSize="sm">00:24</Text>
    </Box>
  </Box>
);

const DetailsSection = ({
  product,
  quantity,
  onDecrease,
  onIncrease,
}: {
  product: Product;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) => (
  <Box bg="white" p={6} width={{ base: "100%", md: "60%" }} overflow="auto">
    <Flex justify="space-between" gap={4} align="center">
      <Box width={400} height={300}>
        <Image
          src={"/global-reach-vertical.png"}
          alt={"name"}
          width={300}
          height={300}
          objectFit="cover"
        />
      </Box>
      <Box>
        <Heading size="lg" mb={1} color="#2E2E2E">
          {product.name}
        </Heading>

        <RatingSection rating={product.rating} reviews={product.reviews} />
        <PriceSection
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
        />
        <Flex justify={"space-between"} gap={4}>
          <QuantityControl
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
          <ActionButtons />
        </Flex>
      </Box>
    </Flex>
    <ProductDescription description={product.description} />
    <RelatedProducts />
  </Box>
);

const RatingSection = ({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) => (
  <Flex align="center" mb={4}>
    <HStack gap={1} color="pink.500">
      {[1, 2, 3, 4].map((i) => (
        <Icon key={i} as={FaHeart} />
      ))}
      <Icon as={FaHeart} color="gray.300" />
    </HStack>
    <Text ml={2} color="gray.600" fontSize="sm">
      {reviews} reviews
    </Text>
  </Flex>
);

const PriceSection = ({
  price,
  originalPrice,
  discount,
}: {
  price: number;
  originalPrice: number;
  discount: string;
}) => (
  <Flex align="center" mb={6}>
    <Text fontWeight="bold" fontSize="2xl" mr={2} color={"#2E2E2E"}>
      Rs {price.toLocaleString()}
    </Text>
    <Text as="s" color="gray.500" fontSize="sm" mr={2}>
      {originalPrice.toLocaleString()}
    </Text>
    <Text color="pink.500" fontSize="sm">
      {discount}
    </Text>
  </Flex>
);

const QuantityControl = ({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) => (
  <Flex mb={6} align="center">
    <Flex
      borderColor="gray.200"
      borderRadius="md"
      // w="100px"
      flex={1}
      gap={2}
      align="center"
    >
      <IconButton
        aria-label="Decrease quantity"
        variant="ghost"
        borderRadius="2rem"
        minWidth="3rem"
        minHeight="3rem"
        color={"#7A7A7A"}
        backgroundColor="#f0f0f0"
        border={"1px solid #7A7A7A"}
        onClick={onDecrease}
      >
        <SubtractIcon />
      </IconButton>

      <Box
        flex="1"
        textAlign="center"
        borderRadius="3rem"
        color={"#7A7A7A"}
        backgroundColor="#f0f0f0"
        border="1px solid #2E2E2E"
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        minWidth="3rem"
        minHeight="3rem"
      >
        {quantity}
      </Box>
      <IconButton
        aria-label="Increase quantity"
        variant="ghost"
        borderRadius="2rem"
        minWidth="3rem"
        minHeight="3rem"
        color={"#7A7A7A"}
        backgroundColor="#f0f0f0"
        border={"1px solid #7A7A7A"}
        onClick={onIncrease}
      >
        <AddIcon />
      </IconButton>
    </Flex>
  </Flex>
);

const ActionButtons = () => (
  <HStack gap="20px" w="100%" mb={6}>
    <Button rounded="full" bg="#FF6996" flex={1} w="100%">
      Add to Bag
    </Button>
    <Button
      borderRadius="xl"
      h="10px"
      w="10px"
      bg="white"
      border="1px solid #FF6996"
    >
      <HeartIcon style={{ color: "#FF6996" }} />
    </Button>
  </HStack>
);

const ProductDescription = ({ description }: { description: string }) => (
  <Box mb={6}>
    <Text fontWeight="medium" mb={2} color={"#2E2E2E"}>
      Description
    </Text>
    <Text color="gray.600" fontSize="sm">
      {description}
    </Text>
    <Link color="blue.400" fontSize="sm">
      See More
    </Link>
  </Box>
);

const RelatedProducts = () => {
  const relatedProducts = [
    {
      name: "Cosrx Advanced Snail 92 All in one Cream",
      price: 1200,
      reviews: 420,
      image: "/global-reach-vertical.png",
    },
    {
      name: "Beauty of Joseon - Matte Sun Stick Duo",
      price: 1500,
      reviews: 420,
      image: "/global-reach-vertical.png",
    },
    {
      name: "Beauty of Joseon - Matte Sun Stick Duo",
      price: 1500,
      reviews: 420,
      image: "/global-reach-vertical.png",
    },
    {
      name: "Beauty of Joseon - Matte Sun Stick Duo",
      price: 1500,
      reviews: 420,
      image: "/global-reach-vertical.png",
    },
    {
      name: "Beauty of Joseon - Matte Sun Stick Duo",
      price: 1500,
      reviews: 420,
      image: "/global-reach-vertical.png",
    },
    // Add more products as needed
  ];

  return (
    <Box>
      <Text fontWeight="medium" mb={4}>
        You May Like
      </Text>
      <Flex flexWrap="wrap" gap={4}>
        {relatedProducts.map((product, index) => (
          <RelatedProductCard key={index} {...product} />
        ))}
      </Flex>
    </Box>
  );
};
