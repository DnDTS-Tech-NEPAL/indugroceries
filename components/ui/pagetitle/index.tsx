"use client";
import Link from "next/link";

import { Flex, Heading, HStack, Text } from "@chakra-ui/react";

import { ArrowLeftIcon } from "@/assets/svg";
import { PageTitleProps } from "@/types";

import { Breadcrumb } from "../breadcrumb";
import { VisibleSection } from "../visibleSection";
import { useConfigQuery } from "@/hooks/api";

export const PageTitle: React.FC<PageTitleProps> = ({
  backLabel,
  backLink,
  title,
  breadcrumb,
}) => {
  const { data: config } = useConfigQuery();
  return (
    <VisibleSection visibility={config?.breadcrum_visibility}>
      <HStack
        bg={"grey.100"}
        h={{ base: "70px", md: "80px", lg: "80px" }}
        zIndex={10}
        alignItems="center"
        px={{
          base: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "40px",
        }}
        justifyContent="center"
      >
        <HStack
          justifyContent="space-between"
          mx="auto"
          maxWidth="1280px"
          width="full"
          color="system.text.normal.dark"
          direction={"row"}
          alignItems="center"
          flex={1}
        >
          <Flex
            align="center"
            cursor="pointer"
            display={{ base: "none", md: "flex" }}
          >
            <Link href={backLink}>
              <Flex align="center">
                <ArrowLeftIcon />
                <Text ml={2} color={"primary.400"} variant={"subtitle2"}>
                  {backLabel}
                </Text>
              </Flex>
            </Link>
          </Flex>

          <HStack color="primary.400" justify="center" flex={1}>
            <Heading
              variant="heading6"
              fontSize={{ base: "16px", md: "16px", xl: "18px" }}
            >
              {title}
            </Heading>
          </HStack>

          <HStack
            gap="24px"
            color="primary.400"
            display={{
              base: "none",
              md: breadcrumb.length > 0 ? "flex" : "none",
            }}
          >
            <Breadcrumb breadcrumb={breadcrumb} />
          </HStack>
        </HStack>
      </HStack>
    </VisibleSection>
  );
};
