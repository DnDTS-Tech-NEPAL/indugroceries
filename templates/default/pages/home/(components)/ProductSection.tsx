"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { VStack, Heading, Text, Grid, Spinner, Button, Flex, HStack, Box } from "@chakra-ui/react"
import { FaArrowRightLong } from "react-icons/fa6"
import { Autoplay, Grid as SwiperGrid } from "swiper/modules"

import { ProductCard, EmptyState } from "@/components"
import { useProductSlider } from "@/hooks/app"
import type { ProductSectionProps } from "@/types"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/grid"
import "./swiper.css"

const categories = ["All", "Skincare", "Makeup", "Haircare", "Accessories", "Wellness"]

export const ProductSection = ({ type }: ProductSectionProps) => {
  const { swiper, isBeginning, isEnd, onSwiper, onSlideChange, sectionData } = useProductSlider(type)

  const { title, subtitle, products, isLoading } = sectionData
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Filter products when category or products change
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.category === activeCategory))
    }
  }, [activeCategory, products])

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    if (swiper) {
      swiper.slideTo(0)
    }
  }

  return (
    <VStack
      maxW={"6xl"}
      mx={"auto"}
      alignItems="stretch"
      gap="32px"
      px={{ base: "20px", md: "40px" }}
      py={{ base: "40px", lg: "60px", "2xl": "80px" }}
    >
      <Flex
        justifyContent="space-between"
        w="full"
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 4, md: 6 }}
        alignItems={{ base: "flex-start", sm: "flex-end" }}
      >
        <VStack align={{ base: "flex-start" }} gap={2}>
          <Heading
            fontSize={{
              base: "24px",
              md: "28px",
              lg: "32px",
            }}
            fontWeight="600"
            color="gray.800"
          >
            {title || "Our Best-Selling Products"}
          </Heading>

          <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
            {subtitle || "Top-rated favorites our customers can't live without."}
          </Text>
        </VStack>

        <Button
          color="white"
          bg="#FF6996"
          borderRadius="full"
          size={{ base: "md", md: "md" }}
          px={6}
          py={2}
          _hover={{ bg: "#ff5286" }}
        >
          View All Products <FaArrowRightLong />
        </Button>
      </Flex>

      <HStack
        gap={8}
        overflowX="auto"
        className="category-tabs"
        pb={2}
        css={{
          "&::-webkit-scrollbar": {
            height: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E2E8F0",
          },
        }}
      >
        {categories.map((category) => (
          <Box key={category} position="relative" cursor="pointer" onClick={() => handleCategoryChange(category)}>
            <Text
              fontSize="md"
              fontWeight={activeCategory === category ? "500" : "400"}
              color={activeCategory === category ? "black" : "gray.500"}
              pb={2}
            >
              {category}
            </Text>
            {activeCategory === category && (
              <Box position="absolute" bottom="0" left="0" right="0" height="2px" bg="#FF6996" borderRadius="full" />
            )}
          </Box>
        ))}
      </HStack>

      {isLoading ? (
        <Grid placeItems="center" height="300px">
          <Spinner />
        </Grid>
      ) : filteredProducts.length > 0 ? (
        <Swiper
          grid={{
            rows: 2,
            fill: "row",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
          }}
          slidesPerGroup={4}
          className="mySwiper"
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          modules={[Autoplay, SwiperGrid]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={filteredProducts.length > 8}
        >
          {filteredProducts.map((productInfo) => (
            <SwiperSlide key={productInfo.title}>
              <ProductCard {...productInfo} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <EmptyState />
      )}
    </VStack>
  )
}


