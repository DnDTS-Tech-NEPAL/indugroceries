import { EyeIcon } from "@/assets/svg";
import {
  Dialog,
  FormProvider,
  StarRating,
  Textarea,
  Tooltip,
} from "@/components";
import { useReviewDataQuery, useReviewMutation } from "@/hooks/api";
import { useAuthCheck } from "@/hooks/app";
import { Box, Flex, Text, Stack, HStack, Button } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FilePenLine, StarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar, FaUserCircle } from "react-icons/fa";

const ProductReview = ({ item_code }: { item_code: string }) => {
  const [isOtpOpen, setOtpOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"write" | "view" | null>(null);
  const { data: reviewData } = useReviewDataQuery(item_code);
  const averageRating = reviewData?.average_rating;
  const reviews = reviewData?.reviews;
  const ratingSummary = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews?.filter(
      (review) => Math.round(review.rating) === star
    ).length;
    return { rating: star, count };
  });
  return (
    <Box
      maxW="7xl"
      mx="auto"
      w="100%"
      px={{ base: 4, md: 0 }}
      py={{ base: 6, md: 10 }}
    >
      <Box
        p={{ base: 4, md: 6 }}
        bg="gray.50"
        borderRadius="1.35rem"
        boxShadow="sm"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
          // align={{ base: "center", md: "start" }}
          gap={{ base: 6, md: 20 }}
          flexWrap="wrap"
        >
          {/* Average Rating Circle */}
          <Flex
            direction={"column"}
            align="center"
            justify="center"
            justifyContent={"space-around"}
          >
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              textAlign={{ base: "center", md: "left" }}
            >
              Product Reviews
            </Text>
            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
              {averageRating?.toFixed(1)}
            </Text>
            <StarRating
              stars={5}
              isCheckBoxRequired={false}
              fixedRating={averageRating}
              fillColor={"#FF6996"}
            />
            <Text fontSize="sm" color="gray.600" textDecoration={"underline"}>
              {reviewData?.reviews?.length} Reviews
            </Text>
            {/* </Box> */}
          </Flex>

          {/* Ratings Breakdown */}
          <Stack gap={3} flex="1" w="100%">
            {ratingSummary.map((review, index) => {
              const totalReviews = reviews?.length || 0;
              const percent = ((review.count || 0) / totalReviews) * 100;
              return (
                <Progress.Root key={index} value={percent}>
                  <HStack gap={3} align="center" w="100%" flexWrap="wrap">
                    <Flex align="center" minW="60px">
                      <Text fontSize="sm" mr={1}>
                        {review.rating}
                      </Text>
                      <StarIcon
                        color="orange"
                        style={{
                          fill: "#FF6996",
                          stroke: "#FF6996",
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
                      <Progress.Range bg="#FF6996" borderRadius="full" />
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
        {/* Bottom: Write a review */}
        <Flex
          mt={4}
          justifyContent={"center"}
          flexDirection={{ base: "column", lg: "row" }}
          gap={4}
          textAlign={{ base: "center", md: "center" }}
          py={2}
        >
          <Button
            borderColor={"#B1B1B2"}
            borderRadius={"2rem"}
            variant={"outline"}
            color={"#B1B1B2"}
            px={{base:10,sm:3,md:4}}
            onClick={() => {
              setDialogType("write");
              setOtpOpen(true);
            }}
          >
            <FilePenLine />
            Write a review
          </Button>
          <Button
            borderColor={"#B1B1B2"}
            borderRadius={"2rem"}
            variant={"outline"}
            color={"#B1B1B2"}
            px={10}
            onClick={() => {
              setDialogType("view");
              setOtpOpen(true);
            }}
          >
            <EyeIcon />
            View all reviews
          </Button>
        </Flex>
      </Box>
      <ReviewList
        item_code={item_code}
        open={isOtpOpen}
        onClose={() => setOtpOpen(false)}
        type={dialogType}
      />
    </Box>
  );
};

export default ProductReview;

const ReviewList = ({
  item_code,
  open,
  onClose,
  type,
}: {
  item_code: string;
  open: boolean;
  onClose: () => void;
  type: "write" | "view" | null;
}) => {
  const { data: reviewData } = useReviewDataQuery(item_code);
  const queryClient = useQueryClient();
  const { checkAuth } = useAuthCheck();

  const { mutate: submitReview } = useReviewMutation();

  const methods = useForm({
    defaultValues: {
      name: "",
      item_code: item_code || "",
    },
  });

  const [rating, setRating] = useState<number>(0);

  // const handleWriteReview = () => {
  //   setShowReviewForm(true);
  // };

  const submitHandler = (data: { name: string; item_code: string }) => {
    checkAuth(() => {
      submitReview(
        {
          item_code: data.item_code,
          review: data.name,
          rating,
        },
        {
          onSuccess: () => {
            setRating(0);
            queryClient.invalidateQueries({
              queryKey: ["review-data"],
            });
            methods.reset();
          },
        }
      );
    })();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        hasCloseTrigger
        contentMinWidth={{
          lg: "1000px",
          xl: "1200px",
        }}
      >
        <Box maxW="7xl" mx="auto" mt={4}>
          {type === "view" && (
            <>
              <Text fontSize="xl" fontWeight="bold" p={4}>
                Review Lists
              </Text>
              <Box
                maxH="500px"
                overflowY="auto"
                p={4}
                mb={6}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                    height: "0px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "transparent",
                  },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {reviewData && reviewData.reviews.length > 0 ? (
                  <Box>
                    <Box
                      fontSize="sm"
                      color="#FF6996"
                      mb={6}
                      borderBottom={"1px solid #ccc"}
                    >
                      <Text
                        display={"inline-block"}
                        px={3}
                        borderBottom={"2px solid #FF6996"}
                      >
                        All Reviews
                      </Text>
                    </Box>

                    {reviewData?.reviews?.map((review, index) => (
                      <Box
                        key={index}
                        py={6}
                        borderBottom={
                          index < reviewData?.reviews?.length - 1
                            ? "1px dashed #ccc"
                            : "none"
                        }
                      >
                        <HStack gap={1} mb={2}>
                          {Array.from(
                            { length: Math.floor(review.rating) },
                            (_, i) => (
                              <FaStar key={i} color="orange" />
                            )
                          )}
                        </HStack>
                        <Text mb={1}>{review.review}</Text>
                        <Text fontSize="sm" color="gray.500" mb={3} />

                        <HStack justifyContent="space-between">
                          <HStack>
                            <FaUserCircle size={20} color={"#007FD9"} />
                            <Text fontSize="sm">{review.user}</Text>
                          </HStack>
                        </HStack>
                      </Box>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </>
          )}

          {type === "write" && (
            <FormProvider methods={methods} onSubmit={submitHandler}>
              <Stack gap="12px" mt={6} p={10}>
                <Textarea name="name" placeholder="Write your review" />
                <HStack gap="20px" justifyContent={"flex-end"}>
                  <Text variant="subtitle1" color="primary.400">
                    Give Rating:
                  </Text>
                  <StarRating
                    stars={5}
                    fillColor={"#FFAB00"}
                    isCheckBoxRequired={false}
                    value={rating}
                    onChange={setRating}
                  />
                  <Tooltip
                    content="Kindly rate the product to leave a comment."
                    showArrow={true}
                    disabled={rating !== 0}
                    positioning={{ placement: "top" }}
                    contentProps={{ css: { "--tooltip-bg": "#FF6996" } }}
                  >
                    <Button
                      type="submit"
                      bg={"#FF6996"}
                      color={"white"}
                      borderRadius={"2rem"}
                      disabled={rating === 0}
                    >
                      Comment
                    </Button>
                  </Tooltip>
                </HStack>
              </Stack>
            </FormProvider>
          )}
        </Box>
      </Dialog>
    </>
  );
};
