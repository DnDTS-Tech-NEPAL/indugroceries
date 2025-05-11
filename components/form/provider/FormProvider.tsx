"use client";

import {
  FieldValues,
  FormProvider as ReactHookFormProvider,
} from "react-hook-form";

import { FormProviderProps } from "@/types";

export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProviderProps<TFieldValues>) => {
  return (
    <ReactHookFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </ReactHookFormProvider>
  );
};
