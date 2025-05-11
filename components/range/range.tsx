"use client";

import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useConfigQuery } from "@/hooks/api";
import { RangeSliderProps, RangeSliderType } from "@/types";

import { Slider } from "../ui/slider";

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  defaultValue,
  onChange,
}) => {
  const [range, setRange] = useState<[number, number]>(defaultValue);

  const { data: config } = useConfigQuery();

  const handleChange = (details: RangeSliderType) => {
    const values = details.value;
    if (values && values.length === 2) {
      const updatedRange: [number, number] = [values[0], values[1]];
      setRange(updatedRange);
      if (onChange) onChange(updatedRange);
    }
  };

  return (
    <Box width={"218px"}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Text fontSize="sm" fontWeight={400}>
          Min
        </Text>
        <Text fontSize="sm" fontWeight={400}>
          Max
        </Text>
      </Box>

      <Slider
        defaultValue={defaultValue}
        min={min}
        max={max}
        onValueChange={handleChange}
        thumbAlignment="center"
        variant={"solid"}
        size={"sm"}
        ml={3}
      />

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Text fontSize="md" fontWeight={500}>
          {config.currency} {range[0].toLocaleString()}
        </Text>
        <Text fontSize="md" fontWeight={500}>
          {config.currency} {range[1].toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};
