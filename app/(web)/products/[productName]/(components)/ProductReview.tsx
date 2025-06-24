import {
  Box,
  Flex,
  Text,
  Stack,
  HStack,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { ProgressCircle, Progress } from "@chakra-ui/react";
import { StarIcon } from "lucide-react";

const reviews = [
  { rating: 5, count: 2823 },
  { rating: 4, count: 38 },
  { rating: 3, count: 4 },
  { rating: 2, count: 0 },
  { rating: 1, count: 0 },
];

const totalReviews = reviews.reduce((sum, r) => sum + r.count, 0);
const averageRating = 4.5;

const ProductReview = () => {
  return (
    <Box maxW="7xl" mx="auto" w="100%" px={{ base: 4, md: 6 }} py={{ base: 6, md: 10 }}>
      <Text
        fontSize={{ base: "md", md: "lg", lg: "xl" }}
        fontWeight="bold"
        mb={{ base: 4, md: 6 }}
        textAlign={{ base: "center", md: "left" }}
      >
        Product Reviews
      </Text>

      <Box p={{ base: 4, md: 6 }} bg="gray.50" borderRadius="lg" boxShadow="sm">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: 6, md: 10 }}
          flexWrap="wrap"
        >
          {/* Average Rating Circle */}
          <Flex
            direction={{ base: "column", sm: "row" }}
            align="center"
            justify="center"
            gap={4}
            flexShrink={0}
          >
            <ProgressCircle.Root
              value={(averageRating / 5) * 100}
              colorPalette="yellow"
              size="xl"
            >
              <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range color="orange.400" />
              </ProgressCircle.Circle>
              <AbsoluteCenter>
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                  {averageRating}
                </Text>
              </AbsoluteCenter>
            </ProgressCircle.Root>

            <Box textAlign={{ base: "center", sm: "left" }}>
              <Flex mt={2} justify={{ base: "center", sm: "flex-start" }} align="center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    color="orange"
                    style={{
                      fill: "orange",
                      stroke: "orange",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                ))}
              </Flex>
              <Text fontSize="sm" color="gray.600">
                from 1.25k reviews
              </Text>
            </Box>
          </Flex>

          {/* Ratings Breakdown */}
          <Stack gap={3} flex="1" w="100%">
            {reviews.map((review) => {
              const percent = (review.count / totalReviews) * 100;
              return (
                <Progress.Root key={review.rating} value={percent}>
                  <HStack gap={3} align="center" w="100%" flexWrap="wrap">
                    <Flex align="center" minW="60px">
                      <Text fontSize="sm" mr={1}>
                        {review.rating}.0
                      </Text>
                      <StarIcon
                        color="orange"
                        style={{
                          fill: "orange",
                          stroke: "orange",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </Flex>
                    <Progress.Track
                      flex="1"
                      w="100%"
                      bg="#E2E5E4"
                      borderRadius="full"
                      height="8px"
                    >
                      <Progress.Range bg="#313332" borderRadius="full" />
                    </Progress.Track>
                    <Text fontSize="sm" minW="50px" textAlign="right">
                      {review.count}
                    </Text>
                  </HStack>
                </Progress.Root>
              );
            })}
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductReview;
