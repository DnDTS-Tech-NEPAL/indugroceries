import { Heading, VStack } from "@chakra-ui/react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionRoot,
  AccordionItemTrigger,
  StarRating,
} from "@/components";
import { ReviewAccordionProps } from "@/types";

export const ReviewAccordion = ({ title }: ReviewAccordionProps) => {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <VStack>
      <AccordionRoot
        collapsible
        as={VStack}
        alignItems="stretch"
        defaultValue={[title]}
      >
        <AccordionItem value={title} border="none">
          <AccordionItemTrigger hasAccordionIcon isOpen>
            <Heading variant="heading6">{title}</Heading>
          </AccordionItemTrigger>
          <AccordionItemContent>
            <VStack align="start">
              {ratings.map((rating) => (
                <VStack key={rating} align="center">
                  <StarRating stars={5} fixedRating={rating} />
                </VStack>
              ))}
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
};
