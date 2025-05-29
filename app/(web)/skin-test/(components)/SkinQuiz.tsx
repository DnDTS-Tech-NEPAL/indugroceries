// "use client"

// import { useState } from "react"
// import { Box, Container } from "@chakra-ui/react"
// import LandingPage from "./LandingPage"
// import QuizStep from "./QuizStep"

// export default function SkinQuiz() {
//   const [step, setStep] = useState(0)
//   const [answers, setAnswers] = useState({})

//   const handleNext = () => {
//     setStep(step + 1)
//   }

//   const handlePrevious = () => {
//     setStep(step - 1)
//   }

//   const handleAnswer = (question: string, answer: string) => {
//     setAnswers({
//       ...answers,
//       [question]: answer,
//     })
//   }

//   return (
//     <Box bg={"gray.50"} minH="100vh">
//       <Container maxW="container.xl" py={8}>
//         {step === 0 ? (
//           <LandingPage onStart={handleNext} />
//         ) : (
//           <QuizStep
//             step={step}
//             onNext={handleNext}
//             onPrevious={handlePrevious}
//             onAnswer={handleAnswer}
//             answers={answers}
//           />
//         )}
//       </Container>

//     </Box>
//   )
// }
"use client";

import { useState } from "react";
import { Box, Container, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/modal";
import LandingPage from "./LandingPage";
import QuizStep from "./QuizStep";

export default function SkinQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const { open, onOpen, onClose } = useDisclosure();

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <LandingPage onStart={onOpen} />

        <Modal isOpen={open} onClose={onClose} size="xl" isCentered>
          <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <ModalContent
            p={6}
            borderRadius="lg"
            mx={4}
            maxW="4xl"
            my={0}
            transform="none"
          >
            <ModalCloseButton
              size="lg"
              color="white"
              bg="blackAlpha.600"
              rounded="full"
              _hover={{ bg: "blackAlpha.800" }}
            />
            <QuizStep
              step={step}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onAnswer={handleAnswer}
              answers={answers}
            />
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
