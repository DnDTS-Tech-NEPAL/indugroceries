import * as z from "zod";

import {
  ContactUsFormType,
  ContactUsTableType,
  FormControlProps,
} from "@/types";

export const generateDynamicFields = (
  fields: ContactUsTableType[]
): FormControlProps[] => {
  if (!Array.isArray(fields)) return [];

  return fields.map((field) => ({
    inputType: "input",
    name: field.field_name,
    label: field.label,
    placeholder: field.placeholder,
    required: field.mandatory === 1,
  }));
};

export const generateDefaultValuesFromDynamicFields = (
  fields: ContactUsTableType[]
) => {
  const defaultValues: ContactUsFormType = {};

  fields.forEach((field) => {
    defaultValues[field.field_name] = "";
  });

  return defaultValues;
};

export const generateDynamicSchema = (fields: FormControlProps[]) => {
  const schemaShape: Record<string, z.ZodString> = {};

  fields.forEach((field) => {
    if (field.required) {
      schemaShape[field.name] = z
        .string()
        .min(1, `${field.label} is required.`);
    }
  });

  return z.object(schemaShape);
};
