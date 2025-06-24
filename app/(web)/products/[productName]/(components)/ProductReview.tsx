import { FormProvider, StarRating, Textarea } from "@/components";
import { useReviewMutation } from "@/hooks/api";
import {
  Box,
  Flex,
  Text,
  Stack,
  HStack,
  AbsoluteCenter,
  Button,
} from "@chakra-ui/react";
import { ProgressCircle, Progress } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaRegThumbsDown,
  FaStar,
  FaThumbsUp,
  FaUserCircle,
} from "react-icons/fa";

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
    <Box
      maxW="7xl"
      mx="auto"
      w="100%"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 10 }}
    >
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
              <Flex
                mt={2}
                justify={{ base: "center", sm: "flex-start" }}
                align="center"
              >
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
      <ReviewList />
    </Box>
  );
};

export default ProductReview;
const reviewsList = [
  {
    id: 1,
    name: "Darrell Steward",
    avatar: "/avatar1.jpg",
    date: "July 2, 2020 03:29 PM",
    review: "This is amazing product I have.",
    likes: 128,
  },
  {
    id: 2,
    name: "Darlene Robertson",
    avatar: "/avatar2.jpg",
    date: "July 2, 2020 03:29 PM",
    review: "This is amazing product I have.",
    likes: 128,
  },
];

const ReviewList = () => {
  // const { data: reviewData, isLoading } = useReviewDataQuery(item_code);
  const queryClient = useQueryClient();

  const { mutate: submitReview } = useReviewMutation();

  const methods = useForm({
    defaultValues: {
      name: "",
      item_code: "",
    },
  });

  const [rating, setRating] = useState<number>(0);

  // const handleWriteReview = () => {
  //   setShowReviewForm(true);
  // };

  const submitHandler = (data: { name: string; item_code: string }) => {
    submitReview(
      {
        item_code: data.item_code,
        review: data.name,
        rating,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["review-data"],
          });
          // setShowReviewForm(false);
          methods.reset();
        },
      }
    );
  };
  return (
    <Box maxW="7xl" mx="auto" mt={10}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Review Lists
      </Text>
      <Box
        fontSize="sm"
        color="green.500"
        mb={6}
        borderBottom={"1px solid #ccc"}
      >
        <Text
          display={"inline-block"}
          px={3}
          borderBottom={"2px solid #009B43"}
        >
          All Reviews
        </Text>
      </Box>

      {reviewsList.map((r, i) => (
        <Box
          key={r.id}
          py={6}
          borderBottom={i < reviewsList.length - 1 ? "1px dashed #ccc" : "none"}
        >
          <HStack gap={1} mb={2}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color="orange" />
            ))}
          </HStack>
          <Text mb={1}>{r.review}</Text>
          <Text fontSize="sm" color="gray.500" mb={3}>
            {r.date}
          </Text>

          <HStack justifyContent="space-between">
            <HStack>
              {/* <Avatar name={r.name} src={r.avatar} size="sm" /> */}
              <FaUserCircle size={20} color={"#007FD9"} />
              <Text fontSize="sm">{r.name}</Text>
            </HStack>

            <HStack gap={2}>
              <Button
                size="sm"
                bg={"white"}
                border={"1px solid #EBEDEC"}
                variant="ghost"
                borderRadius={"8px"}
              >
                <FaThumbsUp color="#007FD9" />
                {r.likes}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                bg={"white"}
                border={"1px solid #EBEDEC"}
                borderRadius={"8px"}
              >
                <FaRegThumbsDown color="#FF4530" />
              </Button>
            </HStack>
          </HStack>
        </Box>
      ))}

      <FormProvider methods={methods} onSubmit={submitHandler}>
        <Stack gap="12px" mt={6}>
          <Textarea name="name" placeholder="Write your review" />
          <HStack gap="20px" justifyContent={"flex-end"}>
            <Text variant="subtitle1" color="primary.400">
              Give Rating:
            </Text>
            <StarRating
              stars={5}
              fillColor={"#FFAB00"}
              isCheckBoxRequired={false}
              onChange={setRating}
            />
            <Button
              type="submit"
              bg={"#009B43"}
              color={"white"}
              borderRadius={"2rem"}
            >
              Comment
            </Button>
          </HStack>
        </Stack>
      </FormProvider>
    </Box>
  );
};
