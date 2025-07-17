import { Flex, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { EmailVerificationImage } from "@/assets/image";
import { ArrowLeftIcon } from "@/assets/svg";
import { Button, FormProvider, Header, PinInput } from "@/components";
import { useEmailVerifyMutation, useResendOtpMutation } from "@/hooks/api";
import { emailVerificationSchema } from "@/schema";
import { useVerifyEmailStore } from "@/store";
import { EmailVerificationProps, EmailVerificationType } from "@/types";

const defaultValues: EmailVerificationType = {
  email: "",
  otp: "",
};

export const EmailVerification = ({
  setActiveStep,
}: EmailVerificationProps) => {
  const methods = useForm<EmailVerificationType>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues,
  });

  const { mutate: VerifyEmail, isPending } = useEmailVerifyMutation();
  const { mutate: resendOtp } = useResendOtpMutation();
  const { verifyEmail } = useVerifyEmailStore();

  const onSubmit = (data: EmailVerificationType) => {
    VerifyEmail(
      { email: verifyEmail, otp: data.otp },
      {
        onSuccess: () => {
          setActiveStep(3);
        },
      }
    );
  };

  const handleResendOtp = () => {
    resendOtp({ email: verifyEmail });
  };

  return (
    <VStack
      w="100%"
      align="center"
      gap="20px"
      justify="center"
      textAlign="center"
    >
      <Flex
        as="button"
        onClick={() => setActiveStep(1)}
        align={"center"}
        justify={"center"}
        color="primary"
        mt={6}
        mb={5}
      >
        <ArrowLeftIcon />
        <Text ml={2} textDecoration="underline" fontWeight={400}>
          Back to register
        </Text>
      </Flex>

      <Image
        src={EmailVerificationImage}
        alt="Email Verification"
        width={100}
        height={100}
        style={{ marginBottom: "12px", marginTop: "12px" }}
      />

      <Header
        title="Email Verification"
        description="An OTP has been sent to your email. Check your spam folder if you don’t see it."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack w="100%" align="stretch" maxW="420px">
          <Flex justify="space-between" fontSize="sm">
            <Text>
              Sent to{" "}
              <Text as="span" color="primary">
                {verifyEmail}
              </Text>
            </Text>
          </Flex>

          <PinInput name="otp" />

          <Flex fontSize="sm" gap={1} justify="center">
            <Text color="gray.500">Haven’t received it yet?</Text>
            <Text
              onClick={handleResendOtp}
              textDecor="underline"
              color="primary"
              cursor="pointer"
            >
              Resend
            </Text>
          </Flex>

          <Button
            type="submit"
            loading={isPending}
            bg="primary"
            mt={2}
            w="full"
          >
            Submit
          </Button>
        </VStack>
      </FormProvider>
    </VStack>
  );
};
