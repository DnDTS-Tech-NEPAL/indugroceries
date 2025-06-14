"use client"

import { useState } from "react"
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
  Image,
  Link,
} from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/modal"
import { FaHeart } from "react-icons/fa"
import { HeartIcon } from "@/assets/svg"
interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number | string
    name: string
    price: number
    originalPrice: number
    discount: string
    rating: number
    reviews: number
    image: string
    description: string
    videoSrc?: string

  } | null
}
export const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  return (
    <Box  >
    <Modal  isOpen={isOpen} onClose={onClose} size="4xl" isCentered blockScrollOnMount={true}  >
      <ModalOverlay zIndex={1500} />
      <ModalContent borderRadius="md" overflow="hidden" zIndex={1500}>
        <ModalBody zIndex={1600} p={0}>
          <Flex direction={{ base: "column", md: "row" }}>
            {/* Left side - Product Video/Image */}
            <Box position="relative" width={{ base: "100%", md: "50%" }} bg="black">
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </AspectRatio>
              <IconButton
                aria-label="Add to favorites"
                position="absolute"
                bottom="4"
                right="4"
                colorScheme="pink"
                variant="ghost"
                color="white"
                size="lg"
              />
              <FaHeart/>
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
              <Box
                position="absolute"
                bottom="4"
                right="16"
                bg="rgba(0,0,0,0.5)"
                color="white"
                px={2}
                py={1}
                borderRadius="md"
              >
                <Text fontSize="sm">00:35</Text>
              </Box>
            </Box>

            {/* Right side - Product Details */}
            <Box bg={"white"} p={6} width={{ base: "100%", md: "50%" }}>
              <Heading size="lg" mb={1}>
                {product.name}
              </Heading>

              {/* Ratings */}
              <Flex align="center" mb={4}>
                <HStack gap={1} color="pink.500">
                  {[1, 2, 3, 4].map((i) => (
                    <Icon key={i} as={FaHeart} />
                  ))}
                  <Icon as={FaHeart} color="gray.300" />
                </HStack>
                <Text ml={2} color="gray.600" fontSize="sm">
                  {product.reviews} reviews
                </Text>
              </Flex>

              {/* Price */}
              <Flex align="center" mb={6}>
                <Text fontWeight="bold" fontSize="2xl" mr={2}>
                  Rs {product.price.toLocaleString()}
                </Text>
                <Text as="s" color="gray.500" fontSize="sm" mr={2}>
                  ₹{product.originalPrice.toLocaleString()}
                </Text>
                <Text color="pink.500" fontSize="sm">
                  {product.discount}
                </Text>
              </Flex>

              {/* Quantity */}
              <Flex mb={6} align="center">
                <Flex border="1px solid" borderColor="gray.200" borderRadius="md" w="100px" mr={4} align="center">
                  <IconButton
                    aria-label="Decrease quantity"
         
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  />
                  <Text flex="1" textAlign="center">
                    {quantity}
                  </Text>
                  <IconButton
                    aria-label="Increase quantity"
                
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  />
                </Flex>
</Flex>
                <HStack gap="20px" width="100%">
                          <Button rounded="xl" bg="#FF6996" flex={1}>
                            Add to Bag
                          </Button>
                          <Button borderRadius="xl" h="10px" w="10px" bg={"white"} border={"1px solid #FF6996"}>
                            <HeartIcon style={{ color: "#FF6996" }} />
                          </Button>
                        </HStack>

              {/* Description */}
              <Box mb={6}>
                <Text fontWeight="medium" mb={2}>
                  Description
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {product.description}
                </Text>
                <Link color="blue.400" fontSize="sm">
                  See More
                </Link>
              </Box>

              {/* You May Like */}
              <Box>
                <Text fontWeight="medium" mb={4}>
                  You May Like
                </Text>
                <Flex gap={4}>
                  <Box borderRadius="md" overflow="hidden" width="48%">
                    <Image src="https://via.placeholder.com/150" alt="Related product" width="100%" />
                    <Box mt={2}>
                      <Text fontSize="xs" color="pink.500">
                        ★★★★★ 420 reviews
                      </Text>
                      <Text fontSize="sm">
                        Cosrx Advanced Snail 92 All in one Cream
                      </Text>
                      <Text fontSize="sm" fontWeight="bold" color="pink.500">
                        Rs 1,200
                      </Text>
                    </Box>
                  </Box>
                  <Box borderRadius="md" overflow="hidden" width="48%">
                    <Image src="https://via.placeholder.com/150" alt="Related product" width="100%" />
                    <Box mt={2}>
                      <Text fontSize="xs" color="pink.500">
                        ★★★★★ 420 reviews
                      </Text>
                      <Text fontSize="sm" >
                        Beauty of Joseon - Matte Sun Stick Duo
                      </Text>
                      <Text fontSize="sm" fontWeight="bold" color="pink.500">
                        Rs 1,500
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
    </Box>


  )
}
