"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Dialog, LoginDialog } from "@/components";
import { useConfigQuery } from "@/hooks/api";
import { RegisterDialogProps } from "@/types";

import { EmailVerification } from "./EmailVerification";
import { RegisterForm } from "./RegisterForm";
import { SetPassword } from "./SetPassword";

import { AuthWrapper } from "../wrapper";

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

  const getForm = () => {
    switch (activeStep) {
      case 1:
        return (
          <RegisterForm
          // setActiveStep={(step) => moveToStep(step)}
          />
        );
      case 2:
        return <EmailVerification setActiveStep={(step) => moveToStep(step)} />;
      case 3:
        return <SetPassword setActiveStep={(step) => moveToStep(step)} />;
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

  const { data: imageData } = useConfigQuery();
  const RegisterImage = imageData?.register_screen_photo_link;
  const ResetPasswordImage = imageData?.set_password_screen_photo_link;
  const OtpImage = imageData?.otp_screen_photo_link;
  const SetPasswordImage = imageData?.set_password_screen_photo_link;

  const getStepImage = () => {
    switch (activeStep) {
      case 1:
        return RegisterImage;
      case 2:
        return OtpImage;
      case 3:
        return ResetPasswordImage;
      case 4:
        return SetPasswordImage;
      default:
        return "";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      contentMinWidth={{
        lg: "1000px",
        xl: "1200px",
      }}
    >
      <AuthWrapper imageSrc={getStepImage()}>
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
          >
            {getForm()}
          </motion.div>
        </AnimatePresence>
      </AuthWrapper>
    </Dialog>
  );
};
