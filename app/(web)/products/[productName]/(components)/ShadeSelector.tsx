"use client";

import { useState } from "react";
import { Box, HStack, Text, Stack } from "@chakra-ui/react";

interface Shade {
  id: string;
  color: string;
  name: string;
}

export const ShadeSelector = () => {
  const staticShades: Shade[] = [
    { id: "1", color: "#8B0000", name: "Dark Red" },
    { id: "2", color: "#A10000", name: "Deep Red" },
    { id: "3", color: "#C50505", name: "Ruby Red" },
    { id: "4", color: "#D01C28", name: "Crimson" },
    { id: "5", color: "#FF0217", name: "Bright Red" },
  ];

  const [selected, setSelected] = useState<string>(staticShades[0].id);

  const handleShadeSelect = (shadeId: string) => {
    setSelected(shadeId);
  };

  const selectedShade =
    staticShades.find((shade) => shade.id === selected) || staticShades[0];

  return (
    <Stack gap="12px">
      <Text variant="subtitle1" color="system.text.normal.light">
        Shade
      </Text>
      <Box position="relative">
        {/* Color swatches */}
        <HStack gap="0" align="flex-end">
          {staticShades.map((shade) => (
            <Box
              key={shade.id}
              w={"60px"}
              h={"60px"}
              bg={shade.color}
              cursor="pointer"
              //   borderWidth={selected === shade.id ? "3px" : "0"}
              borderColor="gray.300"
              _hover={{ opacity: 0.9 }}
              onClick={() => handleShadeSelect(shade.id)}
              transition="all 0.2s"
              zIndex={selected === shade.id ? 1 : 0}
            />
          ))}
        </HStack>

        {/* Selected shade name */}
        <Text fontSize="sm" color="gray.700" mt="2">
          {selectedShade.name} ({selectedShade.color})
        </Text>
      </Box>
    </Stack>
  );
};
