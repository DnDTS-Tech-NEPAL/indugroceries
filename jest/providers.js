// src/__tests__/test-utils.js
import { useForm } from "react-hook-form";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

import chakraSystem from "../theme";
import { FormProvider } from "../components";

// Create a new QueryClient instance for each test
const queryClient = new QueryClient();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

export const renderWithProviders = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={chakraSystem}>{ui}</ChakraProvider>
    </QueryClientProvider>
  );
};

export const JestFormProvider = ({ children }) => {
  const methods = useForm();
  const onSubmit = jest.fn();

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {children}
    </FormProvider>
  );
};
