import { Tabs } from "@/components";
import { Box } from "@chakra-ui/react";

export const TabsDescription = () => {
  const tabs = [
    {
      value: "description",
      label: "Description",
      content: (
        <div>
          <p>
            AXIS-Y Dark Spot Correcting Glow Toner is a Korean skincare product
            designed to brighten skin and reduce the appearance of dark spots.
            Its dual-layer formula combines potent brightening agents with
            hydrating ingredients, making it suitable for all skin types,
            including sensitive skin.
          </p>
        </div>
      ),
    },
    {
      value: "ingredients",
      label: "Ingredients",
      content: (
        <div>
          <ol>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
          </ol>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
        </div>
      ),
    },
    {
      value: "How to use",
      label: "How to use",
      content: (
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
        </div>
      ),
    },
  ];
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Tabs tabs={tabs} size="sm" />
    </Box>
  );
};
