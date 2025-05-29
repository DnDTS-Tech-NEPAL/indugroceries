"use client";

import { useState } from "react";
import { Box, Button, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

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

  const questions = [
    {
      id: "skin_condition",
      question:
        "How would you describe the overall condition of your facial skin on a typical day, without any products applied?",
      options: ["Normal", "Dry", "Combination", "Oily", "Not sure"],
    },
    {
      id: "skin_sensitivity",
      question: "How sensitive is your skin to new products?",
      options: [
        "Not sensitive",
        "Slightly sensitive",
        "Moderately sensitive",
        "Very sensitive",
        "Not sure",
      ],
    },
    {
      id: "skin_concerns",
      question: "What are your main skin concerns?",
      options: ["Acne", "Aging", "Dryness", "Redness", "Uneven tone"],
    },
  ];

  const currentQuestion = questions[step - 1];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(currentQuestion.id, option);
  };

  const handleNext = () => {
    if (selectedOption) {
      setSelectedOption(null);
      onNext();
    }
  };
  const totalSteps = questions.length;

  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Box maxW={"4xl"} bg="white" my={16} rounded="xl" boxShadow="lg" w="full">
        {/* Header Section */}
        <Box bg="#FF6996" py={8} color="white" textAlign="center">
          {/* Dots Progress */}
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
            How would you describe the overall condition of your facial skin
            <br /> on a typical day, without any products applied?
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
                color="gray.600"
                fontWeight="normal"
                disabled={step === 1}
              >
                Previous <FiArrowLeft />
              </Button>

              <Button
                onClick={handleNext}
                bg="#FF6996"
                color="white"
                _hover={{ bg: "pink.500" }}
                disabled={!selectedOption}
              >
                {step === questions.length ? "Get Results" : "Next"}
                <FiArrowRight />
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
