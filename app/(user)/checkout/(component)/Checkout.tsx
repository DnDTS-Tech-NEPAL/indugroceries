"use client"

import { useState } from "react"
import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Box,
  Separator,
  HStack,
  Input,
  Button,
  Text
} from "@chakra-ui/react"


import { Checkbox } from "@/components"
import ShippingInformation from "./ShippingInformation"
import DeliveryMethod from "./DeliveryMethod"
import PaymentInformation from "./PaymentInformation"
import RememberMeSection from "./RememberMeSection"
import RelatedProducts from "./RelatedProducts"
import SelectedProduct from "./SelectedProduct"
import { InputGroup } from "@/components/form/input/InputGroup"
import { Tag } from "lucide-react"

const CheckoutSection = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("free")

  const products = [
    {
      id: "1",
      name: "Dark Spot Glow Cream",
      image: "/placeholder.svg?height=80&width=80",
      originalPrice: 2500,
      discountedPrice: 2000,
      quantity: 1,
    },
    {
      id: "2",
      name: "CICA Houttuynia Tea Tree",
      image: "/placeholder.svg?height=80&width=80",
      originalPrice: 2000,
      discountedPrice: 1800,
      quantity: 1,
    },
    {
      id: "3",
      name: "Probio CICA Enrich Cream",
      image: "/placeholder.svg?height=80&width=80",
      originalPrice: 1200,
      discountedPrice: 900,
      quantity: 1,
    },
  ]

  const selectedProducts = [
    {
      id: "4",
      name: "Radiant Glow Vitamin C",
      image: "/placeholder.svg?height=60&width=60",
      originalPrice: 3500,
      discountedPrice: 2000,
    },
    {
      id: "5",
      name: "Hydra Boost Serum",
      image: "/placeholder.svg?height=60&width=60",
      originalPrice: 3000,
      discountedPrice: 1800,
    },
  ]

  const relatedProducts = [
    {
      id: "4",
      name: "Radiant Glow Vitamin C",
      image: "/placeholder.svg?height=60&width=60",
      originalPrice: 3500,
      discountedPrice: 2000,
    },
    {
      id: "5",
      name: "Hydra Boost Serum",
      image: "/placeholder.svg?height=60&width=60",
      originalPrice: 3000,
      discountedPrice: 1800,
    },
  ]

  const subtotal = products.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0)
  const shipping = deliveryMethod === "express" ? 100 : 0
  const totalDiscount = 100
  const total = subtotal + shipping - totalDiscount

  return (
    <Container maxW="7xl" py={8} spaceY={6}>
    <Text fontSize={"2xl"} fontWeight={500} borderBottom={"1px solid #D0D0D0"} pb={10}>Check Out</Text>
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={16}>
        {/* Left Side - Form Section */}
        <GridItem>
          <VStack gap={8} align="stretch">

            <ShippingInformation />
            <DeliveryMethod deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
            <PaymentInformation />
            <RememberMeSection />

            <Box  borderTop="1px solid #D0D0D0" pt={10} spaceY={4}>
              <Text fontSize="sm" color="gray.600" mb={4}>Please review order details and shipping address prior to submitting your purchase. Once an order has been placed we are unable to make changes or cancel. We appreciate your understanding!Please review your order details and shipping address before placing the order.
              </Text>
              <Button bg={"#FF6996"} colorScheme="pink" size="lg" borderRadius="full" px={8}>
                Place Order Now
              </Button>
              <Checkbox color={"#7A7A7A"} py={8} colorScheme="pink">
                           Your info will be saved to a Shop account. By continuing, you agree to Shop’s Terms of Service and acknowledge the Privacy Policy.
                          </Checkbox>
            </Box>
          </VStack>
        </GridItem>

        {/* Right Side - Summary */}
        <GridItem>
           <Box border="1px" borderColor="gray.200" borderRadius="lg" p={6} bg="white">
      <VStack align="stretch" gap={6}>
        <SelectedProduct products={selectedProducts} />


          <InputGroup
      startElement={<Tag size={16} color="#CBD5E0" />}
      endElement={<span style={{ color: "#718096", fontSize: "14px" }}>Apply</span>}
      border="1px solid #E2E8F0"
      borderRadius="999px"
      px={4}
      py={2}
    >
      <Input
        placeholder="Discount Code"
        fontSize="sm"
        _placeholder={{ color: "gray.400" }}
      />
    </InputGroup>

     

        {products.map((product) => (
          <HStack key={product.id} justify="space-between">
            <Text fontSize="sm">{product.name}</Text>
            <Text fontSize="sm" fontWeight="bold">
              Rs {product.discountedPrice}
            </Text>
          </HStack>
        ))}

        <Separator />

        <VStack gap={2} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="sm">Subtotal</Text>
            <Text fontSize="sm">Rs {subtotal}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm">Shipping</Text>
            <Text fontSize="sm">Rs {shipping}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm">Discount</Text>
            <Text fontSize="sm" color="green.500">
              -Rs {totalDiscount}
            </Text>
          </HStack>
        </VStack>

        <Separator />

        <HStack justify="space-between">
          <Text fontWeight="bold">Total</Text>
          <Text fontWeight="bold" fontSize="lg">
            Rs {total}
          </Text>
        </HStack>

        <Separator />

        <RelatedProducts products={relatedProducts} />
      </VStack>
    </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}
export default CheckoutSection;


