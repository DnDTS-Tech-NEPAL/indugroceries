"use client";

import { useState } from "react";
import { Box, Button, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/svg";
import { useQuizPageQuery } from "@/hooks/api";
import { useRouter } from "next/navigation";

interface QuizStepProps {
  step: number;
  onNext: () => void;
  onPrevious: () => void;
  onAnswer: (question: string, answer: string) => void;
  answers: Record<string, string>;
}

export default function QuizStep({
  step,
  onNext,
  onPrevious,
  onAnswer,
}: QuizStepProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { data: quiz } = useQuizPageQuery();
  const router = useRouter();

  const questions =
    quiz?.quizzes?.map((quizItem, index) => ({
      id: `question_${index + 1}`,
      question: quizItem.question,
      options: quizItem.answers,
    })) || [];

  const currentQuestion = questions[step - 1];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(currentQuestion.id, option);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    onAnswer(currentQuestion.id, selectedOption); // Record answer
    setSelectedOption(null);
    if (step === totalSteps) {
      router.push("/recommend-products");
    } else {
      onNext();
    }
  };

  const totalSteps = questions.length;

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box maxW="4xl" bg="white" my={8} rounded="xl" boxShadow="lg" w="full">
        {/* Header Section */}
        <Box bg="#FF6996" py={8} color="white" textAlign="center">
          <HStack justify="center" mb={6} gap={2}>
            {[...Array(totalSteps)].map((_, i) => (
              <Box
                key={i}
                w={i === step - 1 ? "10px" : "6px"}
                h={i === step - 1 ? "10px" : "6px"}
                borderRadius="full"
                bg={i === step - 1 ? "yellow.300" : "white"}
              />
            ))}
          </HStack>
          <Text fontSize="xl" fontWeight="medium" px={4}>
            {currentQuestion.question}
          </Text>
        </Box>

        {/* Content Section */}
        <Box maxW="3xl" mx="auto" py={10} px={6}>
          <VStack gap={5} align="stretch">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleOptionSelect(option)}
                variant="outline"
                borderColor="gray.300"
                borderRadius="xl"
                bg={selectedOption === option ? "#FF6996" : "white"}
                color={selectedOption === option ? "white" : "gray.800"}
                _hover={{
                  bg: selectedOption === option ? "#FF6996" : "gray.50",
                }}
                height="60px"
                fontSize="md"
              >
                {option}
              </Button>
            ))}

            {/* Navigation */}
            <HStack justify="space-between" pt={8}>
              <Button
                onClick={onPrevious}
                variant="ghost"
                color="black"
                bg={"white"}
                fontWeight="normal"
                disabled={step === 1}
              >
                <ArrowLeftIcon /> PREVIOUS
              </Button>

              <Button
                onClick={handleNext}
                bg="white"
                color="pink.500"
                disabled={!selectedOption}
              >
                {step === totalSteps ? (
                  "Get Results"
                ) : (
                  <>
                    NEXT <ArrowRightIcon />
                  </>
                )}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
