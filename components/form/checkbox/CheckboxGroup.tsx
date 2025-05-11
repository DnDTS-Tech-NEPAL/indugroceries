"use client";

import { useController, useFormContext } from "react-hook-form";
import {
  CheckboxGroup as ChakraCheckboxGroup,
  Fieldset,
  Text,
} from "@chakra-ui/react";

import { CheckboxGroupProps } from "@/types";

import { Checkbox } from "./Checkbox";

export const CheckboxGroup = ({ name, label, items }: CheckboxGroupProps) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  });

  const convertedValue = Array.isArray(value) ? value : [];

  return (
    <Fieldset.Root>
      <ChakraCheckboxGroup
        name={name}
        value={convertedValue}
        onValueChange={onChange}
      >
        {label && (
          <Fieldset.Legend fontSize="sm" mb="2">
            Select framework
          </Fieldset.Legend>
        )}

        <Fieldset.Content>
          {items.map(({ label, value }) => (
            <Checkbox key={value} value={value}>
              <Text variant={"paragraphSmall"}>{label}</Text>
            </Checkbox>
          ))}
        </Fieldset.Content>
      </ChakraCheckboxGroup>
    </Fieldset.Root>
  );
};
