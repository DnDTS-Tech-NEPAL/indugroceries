"use client";
import { HStack } from "@chakra-ui/react";
import { PageTitleProps } from "@/types";
import { Breadcrumb } from "../breadcrumb";
import { VisibleSection } from "../visibleSection";
import { useConfigQuery } from "@/hooks/api";

export const PageTitle: React.FC<PageTitleProps> = ({ breadcrumb }) => {
  const { data: config } = useConfigQuery();
  const showBreadcrumb = breadcrumb.length > 0;

  return (
    <VisibleSection visibility={config?.breadcrum_visibility}>
      <HStack
        bg="grey.50"
        h={{ base: "70px", md: "80px" }}
        zIndex={10}
        align="center"
        maxW="6xl"
        mx="auto"
        justify="center"
      >
        {showBreadcrumb && (
          <HStack color="primary.400" w="full" justify="space-between">
            <Breadcrumb breadcrumb={breadcrumb} />
          </HStack>
        )}
      </HStack>
    </VisibleSection>
  );
};
