import {
  Box,
  Text,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { ProductCard } from '@/components'

const products = [
  {
    id: 1,
    title: 'Medicube Zero Pore Pad',
    image: '/images/product1.jpg', 
    item_code: 'Medicube-Zero-Pore-Pad',
    rating: 4,
    reviews: 420,
    price: 17.0,
    originalPrice: 19.99,
    tag: '10% Discount',
    link: '/medicube-zero-pore-pad',
  },
  {
    id: 2,
    title: 'CICA Houttuynia Tea Tree',
    item_code: 'CICA-Houttuynia-Tea-Tree',
    image: '/images/product2.jpg',
    rating: 4,
    reviews: 420,
    price: 21.99,
    originalPrice: 15,
    tag: 'Sale',
    link: '/cica-houttuynia-tea-tree',
  },
  {
    id: 3,
    title: 'Carrot Carotene',
    image: '/images/product3.jpg',
    item_code: 'Carrot-Carotene',
    rating: 4,
    reviews: 420,
    price: 15.99,
    originalPrice: 20.99,
    tag: '10% Discount',
    link: '/carrot-carotene',
  },
  {
    id: 4,
    title: 'Medicube plus',
    image: '/images/product4.jpg',
    item_code: 'Medicube-plus',
    rating: 4,
    reviews: 420,
    price: 20.99,
    originalPrice: 24.99,
    tag: '10% Discount',
    link: '/medicube-plus',
  },
]

const RecentlyViewed = () => {
  return (
    <Box p={5} >
      <VStack gap={2} mb={6} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Recently Viewed
        </Text>
        <Text color="gray.500">
          Your recent beauty scroll, ready to explore again.
        </Text>
      </VStack>

      <SimpleGrid columns={[1, 2,3, 4]} gap={6}>
        {products.map((product,index) => (
        <ProductCard key={index} {...product} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default RecentlyViewed
