"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Dialog, LoginDialog } from "@/components";
import { RegisterDialogProps } from "@/types";

import { EmailVerification } from "./EmailVerification";
import { RegisterForm } from "./RegisterForm";
import { SetPassword } from "./SetPassword";

import { AuthWrapper } from "../wrapper";
import { Box, Flex } from "@chakra-ui/react";

export const RegisterDialog = ({
  open,
  onClose,
  initialStep = 1,
}: RegisterDialogProps) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [direction, setDirection] = useState(1);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (open) {
      setActiveStep(initialStep);
      setIsFirstRender(initialStep === 1);
    }
  }, [open, initialStep]);

  const handleClose = () => {
    if (activeStep !== 1) return;

    setActiveStep(1);
    setIsFirstRender(true);
    setActiveStep(1);
    setIsFirstRender(true);
    onClose();
  };

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "5%" : "-5%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-5%" : "5%",
      opacity: 0,
      transition: { duration: 0.1 },
    }),
  };

  const moveToStep = (nextStep: number) => {
    setDirection(nextStep > activeStep ? 1 : -1);
    setActiveStep(nextStep);
  };

  const getForm = () => {
    switch (activeStep) {
      case 1:
        return <RegisterForm setActiveStep={moveToStep} />;
      case 2:
        return <EmailVerification setActiveStep={moveToStep} />;
      case 3:
        return <SetPassword setActiveStep={moveToStep} />;
      case 4:
        return <LoginDialog onClose={onClose} open />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      contentMinWidth={{ base: "90%", md: "600px", lg: "800px", xl: "600px" }}
    >
      <AuthWrapper>
        <Flex w="full" align="center" justify="center">
          <Box w="full" maxW="600px">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeStep}
                variants={
                  isFirstRender && activeStep === 1 ? undefined : slideVariants
                }
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                style={{ width: "100%" }}
              >
                {getForm()}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Flex>
      </AuthWrapper>
    </Dialog>
  );
};
