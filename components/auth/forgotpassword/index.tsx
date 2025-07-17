"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Dialog, LoginDialog } from "@/components";
import { RegisterDialogProps } from "@/types";

import { OtpScreen } from "./OtpScreen";
import { SetPassword } from "./SetPassword";
import { OtpVerification } from "./VerifyOtp";

import { Flex } from "@chakra-ui/react";

export const OtpDialog = ({
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
    if (activeStep !== 1) return; //after forgot password making harder for user to close modal
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
      transition: { duration: 0.3 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-5%" : "5%",
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  const getForm = () => {
    switch (activeStep) {
      case 1:
        return <OtpScreen setActiveStep={moveToStep} />;
      case 2:
        return <OtpVerification setActiveStep={moveToStep} />;
      case 3:
        return <SetPassword setActiveStep={moveToStep} />;
      case 4:
        return <LoginDialog onClose={onClose} open />;
      default:
        return null;
    }
  };

  const moveToStep = (nextStep: number) => {
    setDirection(nextStep > activeStep ? 1 : -1);
    setActiveStep(nextStep);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      contentMinWidth={{
        lg: "600px",
        xl: "600px",
      }}
    >
      <Flex
        align="center"
        justify="center"
        p={{ base: 4, md: 6 }}
        minH={{ base: "auto", md: "400px" }}
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
      >
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
      </Flex>
    </Dialog>
  );
};
