import Link from "next/link";
import { HStack, Text } from "@chakra-ui/react";

import { ArrowRightIcon } from "@/assets/svg";
import { SeeAllProps } from "@/types";

export const SeeAll = ({ href, label = "See All" }: SeeAllProps) => {
  return (
    <Link href={href}>
      <HStack>
        <Text variant="subtitle2" whiteSpace="nowrap">
          {label}
        </Text>
        <ArrowRightIcon />
      </HStack>
    </Link>
  );
};
