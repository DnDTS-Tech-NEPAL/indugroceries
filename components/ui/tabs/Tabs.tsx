// import { Tabs as ChakraTabs, Box } from "@chakra-ui/react";
// import { IconType } from "react-icons";
// import React, { ReactNode } from "react";

// export type TabItem = {
//   value: string;
//   label: string;
//   icon?: IconType;
//   content: string | ReactNode;
//   shortContent?: string;
//   skin_types?: string[];
// };

// type TabsProps = {
//   defaultValue?: string;
//   tabs: TabItem[];
//   orientation?: "horizontal" | "vertical";
//   size?: "sm" | "md" | "lg";
//   className?: string;
//   style?: React.CSSProperties;
//   // variant?: "default" | "line" | "enclosed" | "enclosed-colored" | "soft-rounded" | "solid-rounded"
// };

// export const Tabs = ({
//   defaultValue,
//   tabs,
//   orientation = "horizontal",
//   size = "md",
//   className = "",
//   style = {},
// }: TabsProps) => {
//   const defaultTab = defaultValue || tabs[0]?.value;
//   const [showFullContent, setShowFullContent] = React.useState(false);

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" width="100%">
//       <ChakraTabs.Root
//         defaultValue={defaultTab}
//         orientation={orientation}
//         size={size}
//         className={className}
//         style={{
//           width: "100%",
//           maxWidth: "100%",
//           ...style,
//         }}
//         // variant={variant}
//       >
//         <Box display="flex" justifyContent="center" width="100%">
//           <ChakraTabs.List>
//             {tabs.map((tab) => (
//               <ChakraTabs.Trigger
//                 key={tab.value}
//                 value={tab.value}
//                 style={{
//                   fontSize: "20px",
//                   borderRadius: "20px",
//                   fontWeight: "500",
//                   width: "fit-content",
//                 }}
//               >
//                 {tab.icon && <Box as={tab.icon} mr={2} />}
//                 {tab.label}
//               </ChakraTabs.Trigger>
//             ))}
//           </ChakraTabs.List>
//         </Box>

//         {tabs.map((tab) => (
//           <ChakraTabs.Content
//             key={tab.value}
//             value={tab.value}
//             p={4}
//             style={{
//               textAlign: "left",
//               width: "100%",
//               fontSize: "16px",
//               fontWeight: "400",
//             }}
//           >
//             {tab.shortContent ? (
//               <>
//                 <Box mb={2}>
//                   {tab.shortContent}
//                   <Box
//                     color={"#2C8FFF"}
//                     cursor={"pointer"}
//                     textDecoration={"underline"}
//                     mt={2}
//                     onClick={() => setShowFullContent(!showFullContent)}
//                   >
//                     {tab.content === " "
//                       ? null
//                       : showFullContent
//                         ? "See Less"
//                         : "See More"}
//                   </Box>
//                 </Box>
//                 {showFullContent &&
//                   (typeof tab.content === "string" ? (
//                     <Box dangerouslySetInnerHTML={{ __html: tab.content }} />
//                   ) : (
//                     tab.content
//                   ))}
//               </>
//             ) : typeof tab.content === "string" ? (
//               <Box dangerouslySetInnerHTML={{ __html: tab.content }} />
//             ) : (
//               tab.content
//             )}
//             {tab.skin_types && tab.skin_types.length > 0 && (
//   <Box mt={4}>
//     <Box fontWeight="600" mb={2}>Suitable Skin Types:</Box>
//     <ul>
//       {tab.skin_types.map((type, index) => (
//         <li key={index}>• {type}</li>
//       ))}
//     </ul>
//   </Box>
// )}
//           </ChakraTabs.Content>
//         ))}
//       </ChakraTabs.Root>
//     </Box>
//   );
// };

import { Tabs as ChakraTabs, Box, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import React, { ReactNode } from "react";
import { Button } from "../button";

type TabItem = {
  value: string;
  label: string;
  icon?: IconType;
  content: string | ReactNode | string[];
  shortContent?: string;
  isFromVariant?: boolean;
  parentContent?: string | string[];
};

type TabsProps = {
  defaultValue?: string;
  tabs: TabItem[];
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  // showParentInfo?: boolean;
};

export const Tabs = ({
  defaultValue,
  tabs,
  orientation = "horizontal",
  size = "md",
  className = "",
  style = {},
  // showParentInfo = false,
}: TabsProps) => {
  const defaultTab = defaultValue || tabs[0]?.value;
  const [showFullContent, setShowFullContent] = React.useState(false);

  const renderContent = (content: string | ReactNode | string[]) => {
    if (Array.isArray(content)) {
      return (
        <Box mt={4}>
          <Box fontWeight="600" mb={2}>
            Suitable Skin Types:
          </Box>

          {content.map((type, index) => (
            <Button
              key={index}
              borderRadius={"full"}
              mx={2}
              border={"1px solid #CBD5E0"}
              minH={0}
              minW={0}
              width={"fit-content"}
              bg={"white"}
              color={"#2E2E2E"}
            >
              {type}
            </Button>
          ))}
        </Box>
      );
    }

    if (typeof content === "string") {
      return <Box dangerouslySetInnerHTML={{ __html: content }} />;
    }

    return content;
  };

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
            <VStack align="stretch" gap={4}>
              {/* Main content */}
              {tab.shortContent ? (
                <>
                  <Box mb={2}>
                    {renderContent(tab.shortContent)}
                    <Box
                      color={"#2C8FFF"}
                      cursor={"pointer"}
                      textDecoration={"underline"}
                      mt={2}
                      onClick={() => setShowFullContent(!showFullContent)}
                    >
                      {tab.content === " "
                        ? null
                        : showFullContent
                          ? "See Less"
                          : "See More"}
                    </Box>
                  </Box>
                  {showFullContent && renderContent(tab.content)}
                </>
              ) : (
                renderContent(tab.content)
              )}
            </VStack>
          </ChakraTabs.Content>
        ))}
      </ChakraTabs.Root>
    </Box>
  );
};
