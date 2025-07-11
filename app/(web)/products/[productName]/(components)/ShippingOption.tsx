import { Box, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { ShoppingBag, Truck } from "@/assets/svg";

interface FeatureCardProps {
  icon: ReactElement;
  title: string;
  linkText?: string;
  linkHref?: string;
}

const FeatureCard = ({ icon, title, linkText, linkHref }: FeatureCardProps) => (
  <Box
    border="1px solid"
    borderColor="gray.200"
    borderRadius="md"
    alignContent={"center"}
    px={3}
    py={2}
    minW="fit-content"
    _hover={{ boxShadow: "md" }}
  >
    <Flex align="center" gap={4}>
      <Box color="pink.400" fontSize="xl">
        {icon}
      </Box>
      <Box>
        <Text fontWeight="medium" fontSize={"16px"}>
          {title}
        </Text>
        {linkText && linkHref && (
          <Link fontSize="12px" color="gray.500" href={linkHref}>
            {linkText}
          </Link>
        )}
      </Box>
    </Flex>
  </Box>
);

export const ShippingOptions = () => {
  const points = 126;
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={2} py={4}>
      <FeatureCard icon={<Truck />} title="Express Shipping" />
      <FeatureCard
        icon={<ShoppingBag />}
        title="Buy Online & Pick Up"
        linkText="View Store Locations"
        linkHref="#"
      />
      <FeatureCard
        icon={<ShoppingBag />}
        title={`Earn ${points}KBP Points.`}
        linkText="View Rewards Policy"
        linkHref="#"
      />
    </SimpleGrid>
  );
};
