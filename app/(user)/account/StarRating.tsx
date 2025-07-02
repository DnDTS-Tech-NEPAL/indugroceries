import { HStack, Icon } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <HStack gap={1}>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          as={FiStar}
          color={i < rating ? "orange.400" : "gray.300"}
          fill={i < rating ? "orange.400" : "none"}
          w={4}
          h={4}
        />
      ))}
    </HStack>
  );
}
