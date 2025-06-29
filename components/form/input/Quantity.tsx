import * as React from "react";

import { HStack, Input as ChakraInput, Button } from "@chakra-ui/react";

import { AddIcon, SubtractIcon } from "@/assets/svg";
import { QuantityInputProps } from "@/types";

export const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  minimum = 1,
  maximum = 100,
  incrementStep = 1,
  quantityPayload,
}) => {
  const [tempValue, setTempValue] = React.useState(value?.toString());

  React.useEffect(() => {
    setTempValue(value?.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setTempValue(newValue);
    }
  };

  const validateAndSetValue = () => {
    if (tempValue === "") {
      setTempValue(minimum.toString());
      onChange(minimum);
    } else {
      let numValue = Number(tempValue);
      if (numValue < minimum) numValue = minimum;
      if (numValue > maximum) numValue = maximum;
      onChange(numValue);
      setTempValue(numValue.toString());
    }
  };

  const increment = () => {
    const newValue = Math.min(value + incrementStep, maximum);
    onChange(newValue);
    if (quantityPayload) {
      quantityPayload(incrementStep);
    }
  };

  const decrement = () => {
    const newValue = Math.max(value - incrementStep, minimum);
    onChange(newValue);
    if (quantityPayload) {
      quantityPayload(-incrementStep);
    }
  };

  return (
    <HStack gap={"12px"} justifyContent={"center"}>
      <Button
        onClick={decrement}
        bg={"grey.100"}
        borderRadius="2rem"
        p={0}
        h={"35px"}
        w={"35px"}
        minW={0} // Prevents minimum width issues
        minH={0}
        disabled={value <= minimum}
        cursor={value <= minimum ? "not-allowed" : "pointer"}
        opacity={value <= minimum ? 0.5 : 1}
      >
        <SubtractIcon />
      </Button>

      <ChakraInput
        value={tempValue}
        height={"35px !important"}
        onChange={handleChange}
        onBlur={validateAndSetValue}
        minH={0}
        minW={0}
        p={0}
        borderRadius={"full"}
        textAlign="center"
        width={"35px"}
        readOnly
      />

      <Button
        onClick={increment}
        bg={"grey.100"}
        borderRadius="full"
        p={0}
        h={"35px"}
        w={"35px"}
        minH={0}
        minW={0}
        disabled={value >= maximum}
        cursor={value >= maximum ? "not-allowed" : "pointer"}
        opacity={value >= maximum ? 0.5 : 1}
      >
        <AddIcon />
      </Button>
    </HStack>
  );
};
