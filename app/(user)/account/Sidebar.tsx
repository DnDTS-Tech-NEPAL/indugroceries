import { SidebarItem } from "@/types/components/ui/sidebar";
import { VStack, Button, Icon } from "@chakra-ui/react";
type SidebarProps = {
  items: SidebarItem[];
  onSelect: (id: string) => void;
};
export default function Sidebar({ items, onSelect }: SidebarProps) {
  return (
    <VStack gap={2} align="stretch">
      {items.map((item) => (
        <Button
          key={item.id}
          onClick={() => onSelect(item.id)}
          variant="ghost"
          justifyContent="flex-start"
          colorScheme={item.active ? "primary" : "gray"}
          bg="transparent"
          color={item.active ? "primary.500" : "gray.700"}
        >
          <Icon as={item.icon} />
          {item.label}
        </Button>
      ))}
    </VStack>
  );
}
