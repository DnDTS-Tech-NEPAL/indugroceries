import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@/components";
import { FAQTableItem } from "@/types";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { Text } from "@chakra-ui/react";

export const FAQItem = ({ idx, question, answer }: FAQTableItem) => {
  return (
    <AccordionItem value={idx.toString()} p={3}>
      <AccordionItemTrigger
        hasCustomIcon
        customiconopen={<LuChevronUp />}
        customiconclosed={<LuChevronDown />}
      >
        <Text variant="paragraphRegular">{question}</Text>
      </AccordionItemTrigger>
      <AccordionItemContent p={0}>
        <Text variant="paragraphSmall" color={"gray.700"}>
          {answer}
        </Text>
      </AccordionItemContent>
    </AccordionItem>
  );
};
