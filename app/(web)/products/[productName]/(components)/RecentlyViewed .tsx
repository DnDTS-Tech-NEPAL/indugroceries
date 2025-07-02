import {
  Box,
  Text,
  VStack,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ProductCard } from "@/components";
import { useRecentlyViewedProductsQuery } from "@/hooks/api";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/app";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecentlyViewed = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { data: recentlyViewedProducts, refetch } =
    useRecentlyViewedProductsQuery(isAuthenticated);
  const slidesToShow = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 4,
    lg: 4,
  });

  useEffect(() => {
    refetch();
  }, [pathname, isAuthenticated]);

  if (!recentlyViewedProducts || recentlyViewedProducts.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // nextArrow: <NextArrow onClick={() => {}} />,
    // prevArrow: <PrevArrow onClick={() => {}} />,
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
      <Slider {...settings}>
        {recentlyViewedProducts?.map((product, index) => (
          <Box key={index} px={4}>
            <ProductCard
              key={index}
              {...product}
              item_code={product.item_code}
              image={product.custom_image_1_link}
              title={product.item_name}
              price={
                Array.isArray(product?.prices) && product.prices.length > 0
                  ? product.prices[0].discounted_price
                  : 0
              }
              originalPrice={
                Array.isArray(product?.prices) && product.prices.length > 0
                  ? product.prices[0].price_list_rate
                  : 0
              }
              link={product.item_code}
              id={index}
              category={product.item_name}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default RecentlyViewed;
