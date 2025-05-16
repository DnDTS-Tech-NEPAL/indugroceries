"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import { EditIcon } from "@/assets/svg";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  FormProvider,
  ReviewCard,
  StarRating,
  Textarea,
} from "@/components";
import { useReviewDataQuery, useReviewMutation } from "@/hooks/api";
import { useAuthCheck } from "@/hooks/app";

export const ProductReviews = ({ item_code }: { item_code: string }) => {
  const queryClient = useQueryClient();

  const { data: reviewData, isLoading } = useReviewDataQuery(item_code);

  const { mutate: submitReview } = useReviewMutation();

  const averageRating = reviewData?.average_rating;

  const { checkAuth } = useAuthCheck();

  const [showReviewForm, setShowReviewForm] = useState(false);

  const methods = useForm({
    defaultValues: {
      name: "",
      item_code: item_code || "",
    },
  });

  const [rating, setRating] = useState<number>(0);

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };

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
          setShowReviewForm(false);
          methods.reset();
        },
      }
    );
  };

  return (
    <Box padding={{ base: "24px 0", md: "40px 0px" }}>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Spinner />
        </Flex>
      ) : (
        <>
          {/* Accordion for medium and larger screens */}
          <AccordionRoot
            collapsible
            as={VStack}
            alignItems="stretch"
            gap={4}
            display={{ base: "none", md: "flex" }}
            defaultValue={[""]}
          >
            <AccordionItem value={""} padding="0" background="white" border="0">
              <AccordionItemTrigger padding="0">
                <Heading variant="heading6">
                  Comments ({reviewData?.reviews?.length || 0})
                </Heading>
              </AccordionItemTrigger>

              <AccordionItemContent paddingTop="20px" paddingBottom="0">
                <Stack gap="20px">
                  {!isLoading && (
                    <StarRating
                      stars={5}
                      isCheckBoxRequired={false}
                      fixedRating={averageRating}
                    />
                  )}
                  {!showReviewForm && (
                    <Button
                      variant="outline"
                      width="fit-content"
                      borderColor="system.neutral.separator.light"
                      borderRadius="4px"
                      onClick={checkAuth(handleWriteReview)}
                    >
                      <HStack gap="12px">
                        <EditIcon />
                        <Text variant="subtitle1" color="primary.400">
                          Write a review
                        </Text>
                      </HStack>
                    </Button>
                  )}

                  {showReviewForm && (
                    <FormProvider methods={methods} onSubmit={submitHandler}>
                      <Stack gap="12px">
                        <Heading variant={"heading6"}>Rate the product</Heading>
                        <StarRating
                          stars={5}
                          isCheckBoxRequired={false}
                          onChange={setRating}
                        />
                        <Textarea
                          name="name"
                          placeholder="Write your review here..."
                        />
                        <HStack gap="20px" width="100%">
                          <Button type="submit" flex={1}>
                            Submit
                          </Button>

                          <Button
                            variant={"outline"}
                            onClick={() => setShowReviewForm(false)}
                          >
                            Cancel
                          </Button>
                        </HStack>
                      </Stack>
                    </FormProvider>
                  )}

                  <Stack gap="12px">
                    {reviewData?.reviews?.map((review, index) => (
                      <Box key={index}>
                        <ReviewCard message={review?.review} id={index} />
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                          p={3}
                        >
                          <Heading variant="heading7" color="primary.400">
                            {review?.user}
                          </Heading>
                          <StarRating
                            stars={5}
                            isCheckBoxRequired={false}
                            fixedRating={review.rating}
                          />
                        </HStack>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </AccordionItemContent>
            </AccordionItem>
          </AccordionRoot>

          {/* VStack for smaller screens */}
          <Stack
            gap="12px"
            display={{ base: "flex", md: "none" }}
            padding={{ base: "16px", md: "0" }}
          >
            <HStack
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Heading
                variant="heading6"
                color="primary.400"
                fontSize={{ base: "lg", md: "xl" }}
              >
                Product Review
              </Heading>
              <Button
                variant="outline"
                width="auto"
                borderColor="system.neutral.separator.light"
                borderRadius="4px"
                onClick={checkAuth(handleWriteReview)}
                padding="8px 12px"
              >
                <HStack gap="8px">
                  <EditIcon />
                  <Text
                    variant="subtitle1"
                    color="primary.400"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Write a review
                  </Text>
                </HStack>
              </Button>
            </HStack>

            {showReviewForm && (
              <FormProvider methods={methods} onSubmit={submitHandler}>
                <Stack gap="8px" padding="8px">
                  <Text color="primary.400">Rate the product</Text>
                  <StarRating
                    stars={5}
                    isCheckBoxRequired={false}
                    onChange={setRating}
                  />
                  <Textarea
                    name="name"
                    placeholder="Write your review here..."
                  />
                  <HStack>
                    <Button type="submit" flex={1}>
                      Submit{" "}
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </Stack>
              </FormProvider>
            )}

            <Stack gap="8px" marginTop="16px">
              {reviewData?.reviews?.map((review, index) => (
                <Box key={index}>
                  <StarRating
                    stars={5}
                    isCheckBoxRequired={false}
                    fixedRating={review.rating}
                  />
                  <ReviewCard
                    name={review?.user}
                    message={review?.review}
                    id={index}
                  />
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    p={3}
                  ></HStack>
                </Box>
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};
