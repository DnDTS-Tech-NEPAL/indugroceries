"use client"

import { useState } from "react"
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Input,
  Grid,
  GridItem,
  Badge,
  Tabs,
  Image,
  Container,
  Icon,
  Separator,
} from "@chakra-ui/react"
import { FiUser, FiPackage, FiHeart, FiStar, FiRotateCcw, FiCreditCard, FiLogOut, FiChevronRight } from "react-icons/fi"

import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { useColorModeValue } from "@/components/ui/color-mode"

export default function AccountDashboard() {
  const [activeSection, setActiveSection] = useState("personal")

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.600", "gray.300")

  const sidebarItems = [
    { id: "personal", label: "Personal", icon: FiUser, active: activeSection === "personal" },
    { id: "orders", label: "Orders", icon: FiPackage, active: activeSection === "orders" },
    { id: "wishlist", label: "Wishlist", icon: FiHeart, active: activeSection === "wishlist" },
    { id: "reviews", label: "Reviews", icon: FiStar, active: activeSection === "reviews" },
    { id: "returns", label: "Returns & Cancellations", icon: FiRotateCcw, active: activeSection === "returns" },
    { id: "payment", label: "Payment", icon: FiCreditCard, active: activeSection === "payment" },
    { id: "logout", label: "Logout", icon: FiLogOut, active: false },
  ]

  const orders = [
    {
      id: "ORD-81/82-00001",
      total: "3,005",
      quantity: 1,
      status: "Delivered",
      date: "21 Jul 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-81/82-00002",
      total: "3,005",
      quantity: 2,
      status: "Cancelled",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-81/82-00003",
      total: "3,005",
      quantity: 1,
      status: "Delivered",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-81/82-00004",
      total: "3,005",
      quantity: 1,
      status: "Delivered",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const returns = [
    {
      name: "Biotique Bio Papaya Face wash",
      price: "Rs. 305",
      quantity: 1,
      status: "Returned",
      date: "21 Jul 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 400",
      quantity: 2,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 235",
      quantity: 1,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 200",
      quantity: 1,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Biotique New York Falsies Lash Lift",
      price: "Rs. 50",
      quantity: 1,
      status: "Returned",
      date: "21 Jan 2024 22:08:49",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const reviews = [
    {
      product: "Power Bullet Matte Lipstick",
      price: "NPR. 455",
      date: "21 Jul 2024",
      rating: 5,
      review:
        "This product is really very amazing.i personally Like this product very much.it change my skin tone nd it looks more younger than before... It's very reasonable nd nice product for all typl love the shade , and the most important part its absolutely smudge proof , stick into my lips up to long hours. This velvety mat finish omg😍 ladies you can give it a try, and trust me smash box never gonna let you down😊es of skin👍",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      product: "Power Bullet Matte Lipstick",
      price: "NPR. 455",
      date: "21 Jul 2024",
      rating: 5,
      review:
        "This product is really very amazing.i personally Like this product very much.it change my skin tone nd it looks more younger than before... It's very reasonable nd nice product for all typl love the shade , and the most important part its absolutely smudge proof , stick into my lips up to long hours. This velvety mat finish omg😍 ladies you can give it a try, and trust me smash box never gonna let you down😊es of skin👍",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const StarRating = ({ rating }: { rating: number }) => (
    <HStack gap={1}>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          as={FiStar}
          color={i < rating ? "orange.400" : "gray.300"}
          fill={i < rating ? "orange.400" : "none"}
          w={4}
          h={4}
        />
      ))}
    </HStack>
  )

  return (
    <Box minH="100vh" bg="gray.50">
     

     <Container maxW="7xl" py={8}>
        <Flex gap={8}>
          {/* Sidebar */}
          <Box w="320px" bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} p={6}>
            <VStack gap={2} align="stretch">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  variant="ghost"
                  justifyContent="flex-start"
                  colorScheme={item.active ? "pink" : "gray"}
                  bg={item.active ? "pink.50" : "transparent"}
                  color={item.active ? "pink.500" : "gray.700"}
                  _hover={{
                    bg: item.active ? "pink.50" : "gray.50",
                  }}
                >
                    <Icon as={item.icon} />
                  {item.label}
                </Button>
              ))}
            </VStack>
          </Box>

          {/* Main Content */}
          <Box flex={1}>
            {activeSection === "personal" && (
              <Box bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} p={8}>
                <Heading size="lg" mb={8}>
                  Personal
                </Heading>

                <VStack gap={8} align="stretch">
                  {/* Personal Information Form */}
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder="First name" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="last name" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input placeholder="First name" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Phone Number</FormLabel>
                        <Input placeholder="last name" />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <FormControl>
                        <FormLabel>Country / Region</FormLabel>
                        <Input placeholder="Country / Region" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                     
                        
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>City</FormLabel>
                        <Input placeholder="City" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Zip Code</FormLabel>
                        <Input placeholder="Zip Code" />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <Flex justify="flex-end">
                    <Button colorScheme="pink" px={8}>
                      Save Changes
                    </Button>
                  </Flex>

                  <Separator/>

                  {/* Change Password Section */}
                  <Box>
                    <Heading size="md" mb={6}>
                      Change password
                    </Heading>
                    <VStack gap={6} align="stretch" maxW="md">
                      <FormControl>
                        <FormLabel>Old password</FormLabel>
                        <Input type="password" placeholder="Enter password" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>New password</FormLabel>
                        <Input type="password" placeholder="Enter password" />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Confirm password</FormLabel>
                        <Input type="password" placeholder="Enter password" />
                      </FormControl>
                      <Button colorScheme="pink" px={8} alignSelf="flex-start">
                        Save Changes
                      </Button>
                    </VStack>
                  </Box>
                </VStack>
              </Box>
            )}

            {activeSection === "orders" && (
              <Box bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} p={8}>
                <Flex justify="space-between" align="center" mb={8}>
                  <Heading size="lg">Orders (5 items)</Heading>
                  <HStack>
                    <Text fontSize="sm" color={textColor}>
                      Show :
                    </Text>
                    <select defaultValue="all">
                      <option value="all">All Orders</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </HStack>
                </Flex>

                <VStack gap={6} align="stretch">
                  {/* Table Header */}
                  <Grid templateColumns="5fr 2fr 2fr 3fr" gap={4} pb={4} borderBottom="1px" borderColor={borderColor}>
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      Items
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="center">
                      Quantity
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="center">
                      Status
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="right">
                      Date & Time
                    </Text>
                  </Grid>

                  {/* Order Items */}
                  {orders.map((order, index) => (
                    <Grid
                      key={index}
                      templateColumns="5fr 2fr 2fr 3fr"
                      gap={4}
                      py={4}
                      borderBottom="1px"
                      borderColor={borderColor}
                      _last={{ borderBottom: "none" }}
                    >
                      <HStack>
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt="Product"
                          boxSize="60px"
                          rounded="lg"
                          border="1px"
                          borderColor={borderColor}
                        />
                        <VStack align="start" gap={1}>
                          <Text fontWeight="medium">{order.id}</Text>
                          <Text fontSize="sm" color={textColor}>
                            Grand Total: {order.total}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text textAlign="center">{order.quantity}</Text>
                      <Flex justify="center">
                        <Badge colorScheme={order.status === "Delivered" ? "green" : "red"} variant="subtle">
                          {order.status}
                        </Badge>
                      </Flex>
                      <Text fontSize="sm" color={textColor} textAlign="right">
                        {order.date}
                      </Text>
                    </Grid>
                  ))}
                </VStack>
              </Box>
            )}

            {activeSection === "returns" && (
              <Box bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} p={8}>
                <Heading size="lg" mb={8}>
                  Returns & Cancellations (5 items)
                </Heading>

                <VStack gap={6} align="stretch">
                  {/* Table Header */}
                  <Grid templateColumns="5fr 2fr 2fr 3fr" gap={4} pb={4} borderBottom="1px" borderColor={borderColor}>
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      Items
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="center">
                      Quantity
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="center">
                      Status
                    </Text>
                    <Text fontSize="sm" fontWeight="medium" color={textColor} textAlign="right">
                      Date & Time
                    </Text>
                  </Grid>

                  {/* Return Items */}
                  {returns.map((item, index) => (
                    <Grid
                      key={index}
                      templateColumns="5fr 2fr 2fr 3fr"
                      gap={4}
                      py={4}
                      borderBottom="1px"
                      borderColor={borderColor}
                      _last={{ borderBottom: "none" }}
                    >
                      <HStack>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt="Product"
                          boxSize="60px"
                          rounded="lg"
                          border="1px"
                          borderColor={borderColor}
                        />
                        <VStack align="start" gap={1}>
                          <Text fontWeight="medium">{item.name}</Text>
                          <Text fontSize="sm" color={textColor}>
                            {item.price}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text textAlign="center">{item.quantity}</Text>
                      <Flex justify="center">
                        <Badge colorScheme="blue" variant="subtle">
                          {item.status}
                        </Badge>
                      </Flex>
                      <Text fontSize="sm" color={textColor} textAlign="right">
                        {item.date}
                      </Text>
                    </Grid>
                  ))}
                </VStack>
              </Box>
            )}

            {activeSection === "reviews" && (
              <Box bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} p={8}>
                <Heading size="lg" mb={8}>
                  Orders (5 items)
                </Heading>

                <Tabs.Root colorScheme="pink">
                  <Tabs.List>
                    <Tabs.Trigger value="toReview" color={textColor}>To Review</Tabs.Trigger>
                    <Tabs.Trigger value="reviewed"  color="pink.500">Reviewed</Tabs.Trigger>
                  </Tabs.List>

                  {/* <TabPanels>
                    <TabPanel px={0}>
                      <Flex justify="center" align="center" py={12}>
                        <Text color={textColor}>No items to review</Text>
                      </Flex>
                    </TabPanel> */}

                    {/* <TabPanel px={0}> */}
                      <VStack gap={8} align="stretch" mt={8}>
                        {reviews.map((review, index) => (
                          <Box
                            key={index}
                            pb={8}
                            borderBottom="1px"
                            borderColor={borderColor}
                            _last={{ borderBottom: "none" }}
                          >
                            <Flex justify="space-between" align="start" mb={4}>
                              <Text fontSize="sm" color={textColor}>
                                {review.date}
                              </Text>
                              <Button variant="ghost" size="sm" color={textColor}>
                                Edit
                              </Button>
                            </Flex>

                            <HStack align="start" gap={4}>
                              <Image
                                src={review.image || "/placeholder.svg"}
                                alt="Product"
                                boxSize="60px"
                                rounded="lg"
                                border="1px"
                                borderColor={borderColor}
                              />
                              <VStack align="start" gap={2} flex={1}>
                                <Text fontWeight="medium">{review.product}</Text>
                                <Text fontSize="sm" color={textColor}>
                                  {review.price}
                                </Text>
                                <StarRating rating={review.rating} />
                                <Text fontSize="sm" color="gray.700" lineHeight="relaxed">
                                  {review.review}
                                </Text>
                              </VStack>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    {/* </TabPanel>
                  </TabPanels> */}
                </Tabs.Root>
              </Box>
            )}

            {activeSection === "wishlist" && (
              <Box bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} p={8}>
                <Heading size="lg" mb={8}>
                  Wishlist
                </Heading>
                <Flex justify="center" align="center" py={12}>
                  <Text color={textColor}>Your wishlist is empty</Text>
                </Flex>
              </Box>
            )}

            {activeSection === "payment" && (
              <Box bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} p={8}>
                <Heading size="lg" mb={8}>
                  Payment
                </Heading>
                <Flex justify="center" align="center" py={12}>
                  <Text color={textColor}>No payment methods added</Text>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
