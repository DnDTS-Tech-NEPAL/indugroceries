import { useForm } from "react-hook-form";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, TextFieldInput } from "@/components";
import { Button, Header } from "@/components/ui";
import { useRegisterMutation } from "@/hooks/api";
import { registerUserSchema } from "@/schema";
import {
  useLayoutDialogStore,
  useRegisterDialogStore,
  useVerifyEmailStore,
} from "@/store";
import { RegisterFormProps, RegisterFormType } from "@/types";
import { CloseCircleIcon } from "@/assets/svg";

const defaultValues: RegisterFormType = {
  fullName: "",
  email: "",
  address: "",
  contact: "",
};

export const RegisterForm = ({ setActiveStep }: RegisterFormProps) => {
  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerUserSchema),
    defaultValues,
  });

  const { mutate: handleSignup, isPending } = useRegisterMutation();
  const { setVerifyEmail } = useVerifyEmailStore();
  const { updateSignInOpen } = useLayoutDialogStore();
  const { updateSignUpOpen } = useRegisterDialogStore();

  const handleRegister = () => {
    updateSignInOpen(true);
    updateSignUpOpen(false);
  };

  const handleClose = () => {
    updateSignUpOpen(false);
  };

  const onSubmit = (data: RegisterFormType) => {
    setVerifyEmail(data.email);
    handleSignup(data, {
      onSuccess: () => {
        methods.reset();
        setActiveStep(2);
      },
      onError: () => {},
    });
  };

  return (
    <VStack
      alignItems="stretch"
      justifyContent="center"
      gap="20px"
      height={"full"}
      mt={"60px"}
      px={{
        base: "45px",
        xl: "80px",
      }}
    >
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
      <Header
        title="Register Screen"
        description="Please provide the given credentials to begin transactions."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack alignItems="stretch" gap="16px" marginTop="20px">
          <TextFieldInput
            name="fullName"
            label="Full Name"
            placeholder="Enter Full Name"
          />

          <HStack gap="16px">
            <TextFieldInput
              name="email"
              label="Email"
              placeholder="Enter Email"
            />
            <TextFieldInput
              name="contact"
              label="Contact Number"
              placeholder="Enter Contact Number"
            />
          </HStack>
          <TextFieldInput
            name="address"
            label="Address"
            placeholder="Enter Address"
          />

          <Button
            marginTop="8px"
            bg={"#FF6996"}
            type="submit"
            loading={isPending}
          >
            Submit
          </Button>
        </VStack>
      </FormProvider>

      <HStack
        gap="16px"
        direction={{
          base: "column",
          lg: "row",
        }}
      ></HStack>

      <Text
        variant="subtitle2"
        bottom="32px"
        left="0"
        width="full"
        color="system.text.light.light"
        textAlign="center"
      >
        Already have an account?{" "}
        <Text
          as="span"
          variant="paragraphSmall"
          color="system.neutral.info.light"
          cursor="pointer"
          onClick={handleRegister}
        >
          Sign In
        </Text>
      </Text>
    </VStack>
  );
};
