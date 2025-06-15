import * as React from "react";
import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";

import { DialogContentProps, DialogProps } from "@/types";

import { CloseButton } from "../button";

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    ...rest
  } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && <ChakraDialog.Backdrop />}
      <ChakraDialog.Positioner>
        <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDialog.Content>
      </ChakraDialog.Positioner>
    </Portal>
  );
});

export const DialogCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>(function DialogCloseTrigger(props, ref) {
  return (
    <ChakraDialog.CloseTrigger
      position="absolute"
      top="2"
      borderRadius="full"
      bg="transparent"
      color="red"
      z-index="20"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="md" ref={ref}>
        {props.children}
      </CloseButton>
    </ChakraDialog.CloseTrigger>
  );
});

export const Dialog = ({
  title,
  children,
  open,
  onClose,
  hasCloseTrigger,
  size,
  contentMinWidth,
}: DialogProps) => {
  return (
    <ChakraDialog.Root open={open} onOpenChange={onClose} size={size}>
      <ChakraDialog.Backdrop />
      <DialogContent borderRadius="0" minWidth={contentMinWidth}>
        {hasCloseTrigger && <DialogCloseTrigger />}

        {title && (
          <ChakraDialog.Header>
            <ChakraDialog.Title>{title}</ChakraDialog.Title>
          </ChakraDialog.Header>
        )}

        <ChakraDialog.Body padding="0">{children}</ChakraDialog.Body>
      </DialogContent>
    </ChakraDialog.Root>
  );
};
