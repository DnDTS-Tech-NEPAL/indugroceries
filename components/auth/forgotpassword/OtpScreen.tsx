import { useForm } from "react-hook-form";
import { HStack, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, TextFieldInput } from "@/components";
import { Button, Header } from "@/components/ui";
import { useGetOtpMutation } from "@/hooks/api";
import { emailVerificationOtpSchema } from "@/schema";
import { useOtpEmailStore } from "@/store";
import { GetOtpType, OtpScreenType, RegisterFormProps } from "@/types";

const defaultValues: OtpScreenType = {
  email: "",
};

export const OtpScreen = ({ setActiveStep }: RegisterFormProps) => {
  const methods = useForm<OtpScreenType>({
    resolver: zodResolver(emailVerificationOtpSchema),
    defaultValues,
  });

  const { setOtpEmail } = useOtpEmailStore();
  const { mutate: getOtp, isPending } = useGetOtpMutation();

  const onSubmit = (data: GetOtpType) => {
    setOtpEmail(data.email);

    getOtp(
      { email: data.email },
      {
        onSuccess: () => {
          setActiveStep(2);
        },
        onError: () => {},
      }
    );
  };

  return (
    <VStack
      alignItems="stretch"
      justifyContent="center"
      gap="20px"
      height={"full"}
      mt={"150px"}
      px={{
        base: "45px",
        xl: "80px",
      }}
    >
      <Header
        title="Forgot Password"
        description="Please provide the given credentials."
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <VStack alignItems="stretch" gap="16px" marginTop="20px">
          <TextFieldInput
            name="email"
            label="Email"
            placeholder="Enter Email"
          />

          <Button marginTop="8px" type="submit" loading={isPending}>
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
    </VStack>
  );
};
