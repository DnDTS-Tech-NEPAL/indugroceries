import { Grid, Heading, Spinner, VStack } from "@chakra-ui/react";

import {
  AccordionItem,
  AccordionItemContent,
  CheckboxGroup,
  AccordionRoot,
  AccordionItemTrigger,
} from "@/components";
import { FilterAccordionProps } from "@/types";

export const FilterAccordion = ({
  title,
  items,
  isFetching,
  name,
}: FilterAccordionProps) => {
  return (
    <VStack>
      <AccordionRoot
        collapsible
        as={VStack}
        alignItems="stretch"
        defaultValue={[title]}
      >
        <AccordionItem value={title} border={"none"}>
          <AccordionItemTrigger
            hasAccordionIcon
            isOpen
            cursor="pointer"
            outline={"none"}
          >
            <Heading variant="heading7">{title}</Heading>
          </AccordionItemTrigger>

          <AccordionItemContent>
            {isFetching ? (
              <Grid placeItems="center" height="160px">
                <Spinner />
              </Grid>
            ) : (
              <CheckboxGroup
                name={name}
                items={items.map(({ value, title }) => ({
                  value,
                  label: title,
                }))}
              />
            )}
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
};
