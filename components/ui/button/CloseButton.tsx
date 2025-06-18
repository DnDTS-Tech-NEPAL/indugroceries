import * as React from "react";
import { CloseCircleIcon } from "@/assets/svg";
import type { ButtonProps } from "@chakra-ui/react";
import { IconButton as ChakraIconButton } from "@chakra-ui/react";

export const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function CloseButton(props, ref) {
    return (
      <ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
        {props.children ?? <CloseCircleIcon color="red" />}
      </ChakraIconButton>
    );
  }
);
