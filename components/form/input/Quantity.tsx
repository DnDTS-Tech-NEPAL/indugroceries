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
    <HStack gap={"12px"}>
      <Button
        onClick={decrement}
        bg={"grey.100"}
        borderRadius="4px"
        p={2}
        h={"40px"}
        disabled={value <= minimum}
        cursor={value <= minimum ? "not-allowed" : "pointer"}
        opacity={value <= minimum ? 0.5 : 1}
      >
        <SubtractIcon />
      </Button>

      <ChakraInput
        value={tempValue}
        height={"40px !important"}
        onChange={handleChange}
        onBlur={validateAndSetValue}
        minH={0}
        textAlign="center"
        width={"95px"}
        readOnly
      />

      <Button
        onClick={increment}
        bg={"grey.100"}
        borderRadius="4px"
        p={2}
        h={"40px"}
        disabled={value >= maximum}
        cursor={value >= maximum ? "not-allowed" : "pointer"}
        opacity={value >= maximum ? 0.5 : 1}
      >
        <AddIcon />
      </Button>
    </HStack>
  );
};
