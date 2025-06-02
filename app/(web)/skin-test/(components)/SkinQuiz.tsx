"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import LandingPage from "./LandingPage";
import QuizStep from "./QuizStep";

export default function SkinQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);
  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  return (
    <Box>
      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <QuizStep
          step={step}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onAnswer={handleAnswer}
          answers={answers}
        />
      )}
    </Box>
  );
}
