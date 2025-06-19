"use client";

import React, { useState } from "react";
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
import {
  AddIcon,
  Cart,
  HeartIcon,
  SubtractIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@/assets/svg";
import { Dialog, ProductCard, StarRating } from "@/components";
import Image from "next/image";
import { IndividualProductAPIType, QuantityInputProps } from "@/types";
import {
  useConfigQuery,
  useItemProductsLikeQuery,
  useReviewDataQuery,
} from "@/hooks/api";
import {
  useAuthCheck,
  useProductDetailCartMutation,
  useProductDetailWishlist,
} from "@/hooks/app";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
type VideoProductType = {
  products: (IndividualProductAPIType | undefined)[];
  videoInfo?: { social_links: string; video_link: string };
};
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: VideoProductType | VideoProductType[] | null;
}

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

// Custom Arrow Components
const NextArrow = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Next"
    onClick={onClick}
    position="absolute"
    right="-16px"
    bottom="-8%"
    transform="translateY(-50%)"
    zIndex={2}
    bg="transparent"
    color="#FF6996"
    borderRadius="full"
  >
    <ArrowRightIcon />
  </IconButton>
);

const PrevArrow = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Prev"
    onClick={onClick}
    position="absolute"
    right="32px"
    bottom="-8%"
    transform="translateY(-50%)"
    zIndex={2}
    bg="transparent"
    color="#FF6996"
    borderRadius="full"
  >
    <ArrowLeftIcon />
  </IconButton>
);
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
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const handleSlideChange = (currentIndex: number) => {
    setActiveProductIndex(currentIndex);
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

  const settings = {
    // dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 4000,
    afterChange: handleSlideChange,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    // appendDots: (dots: ReactNode) => (
    //   <Box mt={8}>
    //     <ul style={{ position: "absolute", bottom: "-8%", left: "2%" }}>
    //       {dots}
    //     </ul>
    //   </Box>
    // ),
    // dotsClass: "slick-dots slick-thumb",
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
      overflowY="auto"
      scrollbarWidth={"none"}
    >
      <Slider {...settings}>
        {products.map((product) => (
          <Box key={product?.item_code}>
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
          </Box>
        ))}
      </Slider>
      {/* Related products*/}
      <RelatedProducts itemCode={products[activeProductIndex]?.item_code} />
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

const RelatedProducts = ({ itemCode }: { itemCode: string | undefined }) => {
  const { data: relatedProducts } = useItemProductsLikeQuery(itemCode);
  return (
    <Box>
      <Text fontWeight="medium" color={"#2E2E2E"}>
        You May Like
      </Text>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {relatedProducts?.map((product, index) => (
          <ProductCard
            key={index}
            id={index}
            category={product.item_name}
            image={product.custom_image_1_link}
            title={product.item_name}
            price={product.prices?.[0].price_list_rate}
            link={product.name}
            item_code={product.item_code}
          />
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
