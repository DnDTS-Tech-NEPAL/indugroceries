import { VStack, Button, Icon } from "@chakra-ui/react";

export default function Sidebar({ items, onSelect }: any) {
    
  return (
    <VStack gap={2} align="stretch">
      {items.map((item: any) => (
        <Button
          key={item.id}
          onClick={() => onSelect(item.id)}
          variant="ghost"
          justifyContent="flex-start"
          colorScheme={item.active ? "pink" : "gray"}
          bg="transparent"
          color={item.active ? "pink.500" : "gray.700"}
        >
          <Icon as={item.icon} />
          {item.label}
        </Button>
      ))}
    </VStack>
  );
}
