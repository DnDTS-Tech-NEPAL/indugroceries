"use client";

import { useController, useFormContext } from "react-hook-form";
import { Input as ChakraInput } from "@chakra-ui/react";

import { TextFieldInputProps } from "@/types";

import { FormWrapper } from "../wrapper";
import { InputGroup } from "./InputGroup";

export const TextFieldInput: React.FC<TextFieldInputProps> = ({
  type = "text",
  label,
  name,
  required,
  disabled,
  endElement,
  startElement,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    field: { value, ...restField },
  } = useController({
    name,
    control,
  });

  const errorText = errors?.[name]?.message as string;

  return (
    <>
      <FormWrapper
        label={label}
        required={required}
        disabled={disabled}
        errorText={errorText}
      >
        <InputGroup endElement={endElement} startElement={startElement}>
          <ChakraInput
            color={"gray.700"}
            type={type}
            id={name}
            value={value ?? ""}
            paddingRight={endElement ? "50px !important" : ""}
            paddingLeft={startElement ? "50px !important" : ""}
            {...rest}
            {...restField}
          />
        </InputGroup>
      </FormWrapper>
    </>
  );
};
