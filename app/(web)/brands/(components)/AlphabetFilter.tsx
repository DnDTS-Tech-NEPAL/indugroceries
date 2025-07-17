import { HStack, Button } from "@chakra-ui/react";

const ALPHABETS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export default function AlphabetFilter({
  activeLetter,
  onSelect,
}: {
  activeLetter: string;
  onSelect: (letter: string) => void;
}) {
  return (
    <HStack gap={2} wrap="wrap" justifyContent={"center"}>
      {ALPHABETS.map((letter) => (
        <Button
          key={letter}
          size="sm"
          variant={letter === activeLetter ? "solid" : "ghost"}
          bg={letter === activeLetter ? "primary.400" : "gray.200"}
          onClick={() => onSelect(letter)}
        >
          {letter}
        </Button>
      ))}
    </HStack>
  );
}
