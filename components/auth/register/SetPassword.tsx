"use client";

import { useForm, FormProvider as RHFormProvider } from "react-hook-form";
import { Box, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { CloseCircleIcon } from "@/assets/svg";
import { Button, Header, PasswordInput } from "@/components";
import { useSetPasswordMutation } from "@/hooks/api";
import { setPasswordSchema } from "@/schema";

import { useRegisterDialogStore, useVerifyEmailStore } from "@/store";
import { SetPasswordProps, SetPasswordType } from "@/types";

// Default values for the form (email is passed from verifyEmail store, so empty here)
const defaultValues: Omit<SetPasswordType, "email"> = {
  password: "",
  confirmPassword: "",
};

export const SetPassword = ({ setActiveStep }: SetPasswordProps) => {
  const queryClient = useQueryClient();

  // React Hook Form setup
  const methods = useForm<Omit<SetPasswordType, "email">>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
  });

  // Pull email from verifyEmail store
  const { verifyEmail } = useVerifyEmailStore();

  // Mutation hook for setpassword API (which calls set-password + login internally)
  const { mutate: setPasswordMutate, isLoading } = useSetPasswordMutation();

  // Dialog state handlers
  const { updateSignUpOpen } = useRegisterDialogStore();

  // Form submit handler
  const onSubmit = (formData: Omit<SetPasswordType, "email">) => {
    // Prepare payload with email + passwords
    const payload = {
      email: verifyEmail,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    // Call mutation
    setPasswordMutate(payload, {
      onSuccess: (response) => {
        // response.data should contain login info + new token (handle token storage here if needed)

        // Example: store token (adjust key & path depending on your backend)
        const token = response?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
        }

        window.location.reload();

        // Close dialog and update UI
        updateSignUpOpen(false);
        setActiveStep(4); // proceed to next step in your flow
        queryClient.resetQueries({ queryKey: ["user-profile"] });
      },
      onError: (error) => {
        // Optional: handle error, show toast etc.
        console.error("Set password error", error);
      },
    });
  };

  // Close button handler - reload page and close dialog
  const handleClose = () => {
    updateSignUpOpen(false);
    window.location.reload();
  };

  return (
    <VStack
      alignItems="stretch"
      justifyContent="center"
      gap="20px"
      height="full"
      px="80px"
      mt="60px"
      position="relative" // for absolute close button positioning
    >
      {/* Close button */}
      <Box
        position="absolute"
        top="16px"
        right="16px"
        zIndex={3}
        cursor="pointer"
        onClick={handleClose}
      >
        <CloseCircleIcon color="red" />
      </Box>

      {/* Header */}
      <Header
        title="Set Password"
        description="Please enter the given credentials to begin transactions."
      />

      {/* Form */}
      <RHFormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <VStack alignItems="stretch" gap="16px" marginTop="20px">
            {/* Password inputs */}
            <PasswordInput name="password" label="Password" />
            <PasswordInput name="confirmPassword" label="Confirm Password" />

            {/* Submit button */}
            <Button
              bg="primary"
              marginTop="8px"
              type="submit"
              loading={isLoading}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </RHFormProvider>
    </VStack>
  );
};
