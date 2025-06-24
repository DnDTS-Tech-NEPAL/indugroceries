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
    <>
      <Box maxW="6xl">
        <Text fontSize="lg" fontWeight="bold" mb={6}>
          Product Reviews
        </Text>

        <Box p={6} bg="gray.50" borderRadius="lg" boxShadow="sm">
          <Flex gap={6} align="center">
            {/* Average Rating Circle */}
            <Flex direction="row" align="center" justify="center" gap={4}>
              <ProgressCircle.Root
                value={(averageRating / 5) * 100}
                colorPalette="yellow"
                size={"xl"}
              >
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range color="orange.400" />
                </ProgressCircle.Circle>
                <AbsoluteCenter>
                  <Text fontSize="lg" fontWeight="bold">
                    {averageRating}
                  </Text>
                </AbsoluteCenter>
              </ProgressCircle.Root>
              <Box>
                <Flex mt={2} align="center">
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
            <Stack gap={2} flex="1">
              {reviews.map((review) => {
                const percent = (review.count / totalReviews) * 100;
                return (
                  <Progress.Root key={review.rating} value={percent}>
                    <HStack gap={4} align="center">
                      <Flex align="center" w="60px">
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
                        bg="#E2E5E4"
                        borderRadius="full"
                        height="8px"
                      >
                        <Progress.Range bg="#313332" borderRadius="full" />
                      </Progress.Track>
                      <Text fontSize="sm" w="50px">
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
    </>
  );
};

export default ProductReview;
