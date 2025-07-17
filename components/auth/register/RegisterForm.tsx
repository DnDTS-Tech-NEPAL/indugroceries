import { useForm } from "react-hook-form";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, TextFieldInput } from "@/components";
import { Button } from "@/components/ui";
import { useRegisterMutation, useConfigQuery } from "@/hooks/api";
import { registerUserSchema } from "@/schema";
import {
  useLayoutDialogStore,
  useRegisterDialogStore,
  useVerifyEmailStore,
} from "@/store";
import { RegisterFormProps, RegisterFormType } from "@/types";
import {
  // Apple,
  CallIcon,
  CloseCircleIcon,
  // Google,
  Mail,
  // Password,
} from "@/assets/svg";
import { User } from "lucide-react";
// import Link from "next/link";
import Image from "next/image";
// import { LoginLogo } from "@/assets/image";

const defaultValues: RegisterFormType = {
  fullName: "",
  email: "",
  // address: "hello",
  contact: "",
};

export const RegisterForm = ({ setActiveStep }: RegisterFormProps) => {
  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerUserSchema),
    defaultValues,
  });
  const { data: imageData } = useConfigQuery();

  const LoginLogo = imageData?.company_details_url;

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
      py={12}
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
      {/* Logo and Title */}
      <Flex justifyContent={"center"} align="center" gap={8} mb={3}>
        <Image src={LoginLogo} alt="Logo" width={100} height={100} />
        {/* <Text fontSize="2xl" fontWeight="medium">
          Welcome Back To Korean Beauty Point
        </Text> */}
      </Flex>
      <VStack alignItems="stretch" gap="16px" marginTop="20px">
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <VStack alignItems="stretch" gap="16px" marginTop="20px">
            <TextFieldInput
              startElement={<User />}
              name="fullName"
              label="Full Name"
              placeholder="Enter Full Name"
            />

            <HStack gap="16px">
              <TextFieldInput
                startElement={<Mail />}
                name="email"
                label="Email"
                placeholder="Enter your Email Address"
              />
              <TextFieldInput
                startElement={<CallIcon />}
                name="contact"
                label="Contact Number"
                placeholder="Enter Contact Number"
              />
            </HStack>
            {/* <PasswordInput
            startElement={<Password />}
            name="password"
            label="Password"
            placeholder="Enter your Password"
          /> */}

            <Button
              marginTop="8px"
              bg={"primary"}
              type="submit"
              loading={isPending}
            >
              Create Account
            </Button>
          </VStack>
        </FormProvider>

        <HStack w="full" align="center" gap={4}>
          <Box flex="1" h="1px" bg="gray.300" />
          <Text fontSize="md" color="gray.500" whiteSpace="nowrap">
            or continue with
          </Text>
          <Box flex="1" h="1px" bg="gray.300" />
        </HStack>

        {/* Social Login Buttons */}

        <Text fontSize="md" textAlign="center">
          Already have an account?
          <Text
            as="span"
            color="primary.500"
            fontWeight="medium"
            cursor="pointer"
            onClick={handleRegister}
            _hover={{ textDecoration: "underline" }}
          >
            &nbsp; Sign In &nbsp;
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
};
