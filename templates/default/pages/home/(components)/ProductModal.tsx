"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  TikTokEmbed,
  InstagramEmbed,
  FacebookEmbed,
} from "react-social-media-embed";
import {
  Box,
  Flex,
  AspectRatio,
  IconButton,
  Text,
  Heading,
  HStack,
  Button,
  Link,
  Grid,
} from "@chakra-ui/react";
import { AddIcon, Cart, HeartIcon, SubtractIcon } from "@/assets/svg";
import { Dialog, StarRating } from "@/components";
import Image from "next/image";
import { IndividualProductAPIType, QuantityInputProps } from "@/types";
import { useConfigQuery, useReviewDataQuery } from "@/hooks/api";
import {
  useAuthCheck,
  useProductDetailCartMutation,
  useProductDetailWishlist,
} from "@/hooks/app";
type VideoProductType = {
  products: (IndividualProductAPIType | undefined)[];
  videoInfo?: { social_links: string; video_link: string };
};
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: VideoProductType | VideoProductType[] | null;
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
  <Box borderRadius="md" overflow="hidden">
    <Image src={image} alt={name} width={300} height={150} />
    <Box mt={2}>
      <Text fontSize="xs" color="pink.500">
        ★★★★★ {reviews} reviews
      </Text>
      <Text fontSize="sm" color="gray.600" lineClamp={1} w={200}>
        {name}
      </Text>
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
  if (!product) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      contentMinWidth={{
        lg: "1000px",
        xl: "1000px",
      }}
      hasCloseTrigger
    >
      <Flex direction={{ base: "column", md: "row" }} maxH={{ md: "90dvh" }}>
        {/* Media Section */}
        <MediaSection product={product} />

        {/* Details Section */}
        <DetailsSection product={product} />
      </Flex>
    </Dialog>
  );
};

const DetailsSection = ({
  product,
}: {
  product: VideoProductType[] | VideoProductType | null;
}) => {
  const { products } = product as VideoProductType;
  const { data: config } = useConfigQuery();
  const { handleAddToCart, isPending: isCartPending } =
    useProductDetailCartMutation();
  const { handleAddToWishlist, isPending: isWishlistPending } =
    useProductDetailWishlist();

  const minimumQuantity = products[0]?.custom_minimum_order_quantity || 1;
  const maximumQuantity = products[0]?.custom_maximum_order_quantity || 100;
  const incrementStep = products[0]?.custom_increment_on_quantity || 1;
  const [quantity, setQuantity] = useState(minimumQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < minimumQuantity || newQuantity > maximumQuantity) return;
    setQuantity(newQuantity);
  };

  const onAddToCart = () => {
    const payload = {
      item_code: products[0]?.item_code,
      item_price: products[0]?.prices[0]?.price_list_rate || "",
      quantity,
    };
    handleAddToCart(payload);
  };

  const onAddToWishlist = () => {
    const payload = {
      item_code: products[0]?.item_code,
      quantity,
    };

    handleAddToWishlist(payload);
  };

  return (
    // <Box
    //   bg="white"
    //   p={6}
    //   width={{ base: "100%", md: "60%" }}
    //   overflow="auto"
    //   scrollbarWidth={"none"}
    // >
    //   <Flex
    //     justify="space-between"
    //     gap={4}
    //     align="center"
    //     justifyItems={"center"}
    //     my={"auto"}
    //   >
    //     <Box alignItems={"center"}>
    //       <Image
    //         src={
    //           products[0]?.custom_image_1_link || config?.company_details_url
    //         }
    //         alt={"name"}
    //         width={400}
    //         height={400}
    //         objectFit="cover"
    //       />
    //     </Box>
    //     <Box>
    //       <Heading size="md" mb={1} color="#2E2E2E">
    //         {products[0]?.item_name}
    //       </Heading>

    //       {products[0]?.item_code && (
    //         <RatingSection item_code={products[0]?.item_code} />
    //       )}
    //       <Flex align="center" mb={6}>
    //         <Text fontSize="md" color="#FF6996">
    //           Rs {products[0]?.prices[0]?.price_list_rate}
    //         </Text>
    //         {/* <Text as="s" color="gray.500" fontSize="sm" mr={2}>
    //         {originalPrice}
    //         </Text>
    //         <Text color="pink.500" fontSize="sm">
    //         {discount}
    //         </Text> */}
    //       </Flex>
    //       <Flex justify={"space-between"} gap={4}>
    //         <QuantityControl
    //           value={quantity}
    //           onChange={handleQuantityChange}
    //           minimum={minimumQuantity}
    //           maximum={maximumQuantity}
    //           incrementStep={incrementStep}
    //         />
    //         <ActionButtons
    //           onAddToCart={onAddToCart}
    //           onAddToWishlist={onAddToWishlist}
    //         />
    //       </Flex>
    //     </Box>
    //   </Flex>
    //   <ProductDescription description={products[0]?.description} />
    //   <RelatedProducts />
    // </Box>

    <Box
      bg="white"
      p={6}
      width={{ base: "100%", md: "60%" }}
      overflow="auto"
      scrollbarWidth={"none"}
    >
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={1}
        loop={true}
        spaceBetween={3}
      >
        {products.map((product) => (
          <SwiperSlide key={product?.item_code}>
            {/* Product Card */}
            <Flex
              justify="space-between"
              gap={4}
              align="center"
              justifyItems="center"
              my="auto"
              direction={{ base: "column", md: "row" }} // Stack on mobile
            >
              {/* Image Section */}
              <Box
                width={{ base: "100%", md: "100%" }}
                height={{ base: "100%", md: "100%" }}
                textAlign="center"
              >
                <Image
                  src={
                    product?.custom_image_1_link || config?.company_details_url
                  }
                  alt={product?.item_name || "Product Image"}
                  width={400}
                  height={400}
                  objectFit="cover"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>

              {/* Product Details Section */}
              <Box width={{ base: "100%", md: "70%" }}>
                <Heading size="md" mb={1} color="#2E2E2E">
                  {product?.item_name}
                </Heading>

                {product?.item_code && (
                  <RatingSection item_code={product?.item_code} />
                )}

                <Flex align="center" mb={6}>
                  <Text fontSize="md" color="#FF6996">
                    Rs {product?.prices[0]?.price_list_rate}
                  </Text>
                </Flex>

                <Flex justify="space-between" gap={2} wrap="nowrap">
                  <QuantityControl
                    value={quantity}
                    onChange={handleQuantityChange}
                    minimum={minimumQuantity}
                    maximum={maximumQuantity}
                    incrementStep={incrementStep}
                  />
                  <ActionButtons
                    onAddToCart={onAddToCart}
                    onAddToWishlist={onAddToWishlist}
                  />
                </Flex>
              </Box>
            </Flex>

            {/* Description below the product card */}
            <Box mt={8}>
              <ProductDescription description={product?.description} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Related products outside the swiper */}
      <RelatedProducts />
    </Box>
  );
};
const RatingSection = ({ item_code }: { item_code: string }) => {
  const [rating, setRating] = useState<number>(0);
  const { data: reviewData, isLoading } = useReviewDataQuery(item_code);
  const averageRating = reviewData?.average_rating ?? rating;

  return (
    <Flex align="center" mb={4}>
      <HStack gap={1}>
        {!isLoading && (
          <StarRating
            stars={5}
            isCheckBoxRequired={false}
            fixedRating={averageRating}
          />
        )}
      </HStack>
      <Text ml={2} color="gray.600" fontSize="sm">
        {reviewData?.reviews?.length ?? 0} reviews
      </Text>
    </Flex>
  );
};

const QuantityControl: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  minimum = 1,
  maximum = 100,
  incrementStep = 1,
  quantityPayload,
}) => {
  const [tempValue, setTempValue] = React.useState(value?.toString());

  React.useEffect(() => {
    setTempValue(value?.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setTempValue(newValue);
    }
  };

  const validateAndSetValue = () => {
    if (tempValue === "") {
      setTempValue(minimum.toString());
      onChange(minimum);
    } else {
      let numValue = Number(tempValue);
      if (numValue < minimum) numValue = minimum;
      if (numValue > maximum) numValue = maximum;
      onChange(numValue);
      setTempValue(numValue.toString());
    }
  };

  const increment = () => {
    const newValue = Math.min(value + incrementStep, maximum);
    onChange(newValue);
    if (quantityPayload) {
      quantityPayload(incrementStep);
    }
  };

  const decrement = () => {
    const newValue = Math.max(value - incrementStep, minimum);
    onChange(newValue);
    if (quantityPayload) {
      quantityPayload(-incrementStep);
    }
  };

  return (
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
          onClick={decrement}
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
          onChange={handleChange}
          onBlur={validateAndSetValue}
          alignItems="center"
          minWidth="3rem"
          minHeight="3rem"
        >
          {value}
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
          onClick={increment}
        >
          <AddIcon />
        </IconButton>
      </Flex>
    </Flex>
  );
};

const ActionButtons = ({
  onAddToCart,
  onAddToWishlist,
}: {
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}) => {
  const { checkAuth } = useAuthCheck();
  return (
    <HStack gap="20px" w="100%" mb={6}>
      <Button
        height="auto"
        minH="32px"
        minW="150px"
        w={{ md: "50%" }}
        bg={"transparent"}
        color={"#FF6996"}
        borderRadius="full"
        border={"0.5px solid #FF6996"}
        fontSize="14px"
        fontWeight={"400"}
        px={3}
        py={3}
        lineHeight="1.2"
        onClick={checkAuth(onAddToCart)}
      >
        Add <Cart />
      </Button>
      <Button
        borderRadius="xl"
        h="10px"
        w="10px"
        bg="white"
        border="1px solid #FF6996"
        onClick={checkAuth(onAddToWishlist)}
      >
        <HeartIcon style={{ color: "#FF6996" }} />
      </Button>
    </HStack>
  );
};

const ProductDescription = ({
  description,
}: {
  description: string | null | undefined;
}) => (
  <Box>
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
      <Text fontWeight="medium" mb={4} color={"#2E2E2E"}>
        You May Like
      </Text>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {relatedProducts.map((product, index) => (
          <RelatedProductCard key={index} {...product} />
        ))}
      </Grid>
    </Box>
  );
};

const isSocialMediaUrl = (url: string): boolean => {
  if (!url) return false;
  return (
    url.includes("tiktok.com") ||
    url.includes("instagram.com") ||
    url.includes("facebook.com") ||
    url.includes("youtube.com")
  );
};
const getEmbedComponent = (url: string): React.ReactElement | null => {
  try {
    // Create URL object to properly parse the URL
    const parsedUrl = new URL(url);
    const { hostname, pathname } = parsedUrl;

    // TikTok
    if (hostname.includes("tiktok.com")) {
      return (
        <div
          className="tiktok-embed-container"
          style={{ width: "100%", margin: "1rem 0" }}
        >
          <TikTokEmbed
            url={url}
            width="100%"
            onError={(e) => console.error("TikTok embed error:", e)}
          />
        </div>
      );
    }
    // Instagram
    if (hostname.includes("instagram.com")) {
      return (
        <div
          className="instagram-embed-container"
          style={{ width: "100%", margin: "1rem 0" }}
        >
          <InstagramEmbed
            url={url}
            width="100%"
            onError={(e) => console.error("Instagram embed error:", e)}
          />
        </div>
      );
    }
    // Facebook
    if (hostname.includes("facebook.com")) {
      return (
        <div
          className="facebook-embed-container"
          style={{ width: "100%", margin: "1rem 0" }}
        >
          <FacebookEmbed url={url} width="100%" />;
        </div>
      );
    }
    // YouTube (using iframe)
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      let videoId = "";

      // Handle different YouTube URL formats
      if (pathname.includes("/watch")) {
        videoId = new URLSearchParams(parsedUrl.search).get("v") || "";
      } else {
        videoId = pathname.split("/").pop() || "";
      }

      if (videoId) {
        const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
        return (
          <div
            className="youtube-embed-container"
            style={{ width: "100%", margin: "1rem 0" }}
          >
            <iframe
              src={youtubeUrl}
              width="100%"
              height="500"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          </div>
        );
      }
    }
    return null;
  } catch (error) {
    console.error("Error processing embed URL:", error);
    return null;
  }
};

const MediaSection = ({
  product,
}: {
  product: VideoProductType | VideoProductType[] | null;
}) => {
  const { videoInfo } = product as VideoProductType;
  if (!videoInfo) {
    return (
      <Box position="relative" width={{ base: "100%", md: "40%" }} bg="black">
        <AspectRatio ratio={1} w="full" h="full">
          <Box
            bg="gray.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white">No media available</Text>
          </Box>
        </AspectRatio>
      </Box>
    );
  }

  if (isSocialMediaUrl(videoInfo.social_links)) {
    return (
      <Box position="relative" width={{ base: "100%", md: "40%" }} bg="black">
        <AspectRatio ratio={1} w="full" h="full">
          <Box>{getEmbedComponent(videoInfo.social_links)}</Box>
        </AspectRatio>
      </Box>
    );
  }

  return (
    <Box position="relative" width={{ base: "100%", md: "40%" }} bg="black">
      <AspectRatio ratio={1} w="full" h="full">
        <video
          src={videoInfo.video_link}
          autoPlay
          muted
          loop
          controls
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AspectRatio>
    </Box>
  );
};

export default MediaSection;
