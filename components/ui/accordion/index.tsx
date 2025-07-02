import * as React from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { Accordion, Box, HStack } from "@chakra-ui/react";
import { ExtendedAccordionItemTriggerProps } from "@/types";

type AccordionItemTriggerProps = React.ComponentProps<
  typeof Accordion.ItemTrigger
> &
  ExtendedAccordionItemTriggerProps & {
    customiconopen?: React.ReactNode;
    customiconclosed?: React.ReactNode;
  };

export const AccordionItemTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionItemTriggerProps
>(function AccordionItemTrigger(
  {
    children,
    isOpen,
    hasAccordionIcon = true,
    indicatorPlacement = "end",
    hasCustomIcon,
    ...rest
  },
  ref
) {
  return (
    <Accordion.ItemTrigger {...rest} ref={ref}>
      <HStack
        alignItems="stretch"
        gap="4"
        flex="1"
        textAlign="start"
        width="full"
      >
        {children}
      </HStack>

      {hasAccordionIcon && indicatorPlacement === "end" && (
        <Accordion.ItemIndicator>
          {/* {hasCustomIcon ? (
            isOpen ? (
              <Box ml={4}>
                <SubtractIcon />
              </Box>
            ) : (
              <Box mr={4}>
                <AddIcon />
              </Box>
            )
          ) : (
            <LuChevronDown />
          )} */}
          {hasCustomIcon ? (
            isOpen ? (
              <Box ml={4}>{rest.customiconopen ?? <LuChevronUp />}</Box>
            ) : (
              <Box mr={4}>{rest.customiconclosed ?? <LuChevronDown />}</Box>
            )
          ) : (
            <Box
              as={LuChevronDown}
              color="black"
              fontSize="30px"
              filter={isOpen ? "brightness(0) contrast(200%)" : "none"}
            />
          )}
        </Accordion.ItemIndicator>
      )}
    </Accordion.ItemTrigger>
  );
});

export const AccordionItemContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Accordion.ItemContent>
>(function AccordionItemContent(props, ref) {
  return (
    <Accordion.ItemContent ref={ref}>
      <Accordion.ItemBody {...props} />
    </Accordion.ItemContent>
  );
});

export const AccordionRoot = Accordion.Root;

interface AccordionItemProps
  extends React.ComponentProps<typeof Accordion.Item> {}

export const AccordionItem = ({ children, ...rest }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <Accordion.Item {...rest}>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          child.type === AccordionItemTrigger
        ) {
          return React.cloneElement(
            child as React.ReactElement<AccordionItemTriggerProps>,
            {
              isOpen,
              onClick: handleToggle,
            }
          );
        }
        return child;
      })}
    </Accordion.Item>
  );
};
