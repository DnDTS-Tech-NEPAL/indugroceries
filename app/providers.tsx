"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components";
import { createDynamicChakraSystem } from "@/theme";
import { ProvidersProps } from "@/types";
import Scrolltop from "@/components/ui/scrollToTop/scrolltotop";

export const Providers = ({ children, config }: ProvidersProps) => {
  // this ensures each request has its own cache:
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
            retry: 0,
          },
        },
      })
  );

  const dynamicChakraSystem = createDynamicChakraSystem(config);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={dynamicChakraSystem}>
        {children}
        <Scrolltop />
        <Toaster />
      </ChakraProvider>
    </QueryClientProvider>
  );
};
