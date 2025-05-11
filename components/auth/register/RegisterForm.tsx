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
  // useVerifyEmailStore,
} from "@/store";
import { RegisterFormType } from "@/types";
import { CloseCircleIcon } from "@/assets/svg";

const defaultValues: RegisterFormType = {
  business_name: "",
  business_email: "",
  business_address: "",
  business_contact: "",
  business_abn: "",
  contact_person: "",
};

export const RegisterForm = () => {
  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerUserSchema),
    defaultValues,
  });

  const { mutate: handleSignup, isPending } = useRegisterMutation();
  // const { setVerifyEmail } = useVerifyEmailStore();
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
    // setVerifyEmail(data.business_email);
    handleSignup(data, {
      onSuccess: () => {
        methods.reset();
        // setActiveStep(2);
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
      py={"10"}
      // mt={"60px"}
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
        title="Registration Form"
        description="Please provide the given information to register your business."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack alignItems="stretch" gap="16px">
          <TextFieldInput
            name="business_name"
            label="Business Name"
            placeholder="Enter Business Name"
          />

          <TextFieldInput
            name="business_address"
            label="Business Address"
            placeholder="Enter Business Address"
          />
          <HStack gap={4}>
            <TextFieldInput
              name="business_email"
              label="Business Email"
              placeholder="Enter Business Email"
            />

            <TextFieldInput
              name="business_abn"
              label="Business ABN"
              placeholder="Enter Your Business ABN"
            />
          </HStack>

          <HStack gap={4}>
            <TextFieldInput
              name="business_contact"
              label="Business Contact"
              placeholder="Enter Contact Number"
            />
            <TextFieldInput
              name="contact_person"
              label="Contact Person"
              placeholder="Enter Contact Person Name"
            />
          </HStack>

          <Button marginTop="8px" type="submit" loading={isPending}>
            Submit
          </Button>
        </VStack>
      </FormProvider>

      {/* <HStack
        gap="16px"
        direction={{
          base: "column",
          lg: "row",
        }}
      ></HStack> */}

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
