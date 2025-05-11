"use client";

import { useForm } from "react-hook-form";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, FormControl, FormProvider } from "@/components";
import { useContactMutation } from "@/hooks/api";
import { ContactFormProps, ContactUsFormType } from "@/types";
import {
  generateDefaultValuesFromDynamicFields,
  generateDynamicFields,
  generateDynamicSchema,
} from "@/utils";

export const ContactForm = ({ data }: ContactFormProps) => {
  // Dynamic fields
  const fields = generateDynamicFields(data?.contact_us_table);

  // Dynamic default values to initialize the empty string
  const defaultValues = generateDefaultValuesFromDynamicFields(
    data?.contact_us_table
  );

  const contactUsSchema = generateDynamicSchema(fields);

  const methods = useForm<ContactUsFormType>({
    resolver: zodResolver(contactUsSchema),
    defaultValues,
  });

  const { mutate: submitContactForm, isPending } = useContactMutation();

  const submitHandler = (data: ContactUsFormType) => {
    submitContactForm(data, {
      onSuccess: () => {
        methods.reset();
      },
    });
  };

  return (
    <Box flex={1}>
      <FormProvider methods={methods} onSubmit={submitHandler}>
        <Stack gap={{ base: "8px", lg: "16px" }}>
          <Heading
            variant={{
              base: "heading5",
              xl: "heading4",
            }}
            fontWeight={400}
          >
            {data?.heading_1}
          </Heading>
          <Text variant="paragraphSmall" color="primary.300" mb="16px">
            {data?.subheading}
          </Text>

          {fields.map((field) => (
            <FormControl key={field.name} {...field} />
          ))}

          <Button type="submit" h="52px" mt="16px" loading={isPending}>
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
};
