import { Tabs as ChakraTabs, Box } from "@chakra-ui/react";
import { IconType } from "react-icons";
import React, { ReactNode } from "react";

export type TabItem = {
  value: string;
  label: string;
  icon?: IconType;
  content: string | ReactNode;
  shortContent?: string;
};

type TabsProps = {
  defaultValue?: string;
  tabs: TabItem[];
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  // variant?: "default" | "line" | "enclosed" | "enclosed-colored" | "soft-rounded" | "solid-rounded"
};

export const Tabs = ({
  defaultValue,
  tabs,
  orientation = "horizontal",
  size = "md",
  className = "",
  style = {},
}: TabsProps) => {
  const defaultTab = defaultValue || tabs[0]?.value;
  const [showFullContent, setShowFullContent] = React.useState(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <ChakraTabs.Root
        defaultValue={defaultTab}
        orientation={orientation}
        size={size}
        className={className}
        style={{
          width: "100%",
          maxWidth: "100%",
          ...style,
        }}
        // variant={variant}
      >
        <Box display="flex" justifyContent="center" width="100%">
          <ChakraTabs.List>
            {tabs.map((tab) => (
              <ChakraTabs.Trigger
                key={tab.value}
                value={tab.value}
                style={{
                  fontSize: "20px",
                  borderRadius: "20px",
                  fontWeight: "500",
                  width: "fit-content",
                }}
              >
                {tab.icon && <Box as={tab.icon} mr={2} />}
                {tab.label}
              </ChakraTabs.Trigger>
            ))}
          </ChakraTabs.List>
        </Box>

        {tabs.map((tab) => (
          <ChakraTabs.Content
            key={tab.value}
            value={tab.value}
            p={4}
            style={{
              textAlign: "left",
              width: "100%",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {tab.shortContent ? (
              <>
                <Box mb={2}>
                  {tab.shortContent}
                  <Box
                    color={"#2C8FFF"}
                    cursor={"pointer"}
                    textDecoration={"underline"}
                    mt={2}
                    onClick={() => setShowFullContent(!showFullContent)}
                  >
                    {showFullContent ? "See Less" : "See More"}
                  </Box>
                </Box>
                {showFullContent &&
                  (typeof tab.content === "string" ? (
                    <Box dangerouslySetInnerHTML={{ __html: tab.content }} />
                  ) : (
                    tab.content
                  ))}
              </>
            ) : typeof tab.content === "string" ? (
              <Box dangerouslySetInnerHTML={{ __html: tab.content }} />
            ) : (
              tab.content
            )}
          </ChakraTabs.Content>
        ))}
      </ChakraTabs.Root>
    </Box>
  );
};
