// import { Grid, Heading, Spinner, VStack } from "@chakra-ui/react";

// import {
//   AccordionItem,
//   AccordionItemContent,
//   CheckboxGroup,
//   AccordionRoot,
//   AccordionItemTrigger,
// } from "@/components";
// import { FilterAccordionProps } from "@/types";

// export const FilterAccordion = ({
//   title,
//   items,
//   isFetching,
//   name,
// }: FilterAccordionProps) => {
//   return (
//     <VStack>
//       <AccordionRoot
//         collapsible
//         as={VStack}
//         alignItems="stretch"
//         defaultValue={[title]}
//       >
//         <AccordionItem value={title} border={"none"}>
//           <AccordionItemTrigger
//             hasAccordionIcon
//             isOpen
//             cursor="pointer"
//             outline={"none"}
//           >
//             <Heading variant="heading7">{title}</Heading>
//           </AccordionItemTrigger>

//           <AccordionItemContent>
//             {isFetching ? (
//               <Grid placeItems="center" height="160px">
//                 <Spinner />
//               </Grid>
//             ) : (
//               <CheckboxGroup
//                 name={name}
//                 items={items.map(({ value, title }) => ({
//                   value,
//                   label: title,
//                 }))}
//               />
//             )}
//           </AccordionItemContent>
//         </AccordionItem>
//       </AccordionRoot>
//     </VStack>
//   );
// };

"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import type { FilterAccordionProps } from "@/types";
import { SearchInput } from "@/components";

export const FilterAccordion = ({
  items,
  isFetching,
}: FilterAccordionProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (value: string) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  return (
    <VStack
      align="stretch"
      w="full"
      gap={0}
      borderTop="1px"
      borderColor={"gray.200"}
    >
      <Box marginBottom={5}>
        {" "}
        <SearchInput name="search" />
      </Box>
      <Box
        py={3}
        px={4}
        borderBottom="1px"
        borderColor={"gray.200"}
        cursor="pointer"
        onClick={() => setSelectedItems([])}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          bg: "gray.200",
        }}
      >
        <Text fontWeight="bold">ALL</Text>
      </Box>

      {/* Filter items */}
      {!isFetching &&
        items.map(({ value, title: itemTitle }) => (
          <Flex
            key={value}
            py={5}
            px={4}
            borderBottom="1px"
            borderColor={"gray.200"}
            justify="space-between"
            align="center"
            cursor="pointer"
            onClick={() => handleItemClick(value)}
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              bg: "gray.200",
            }}
          >
            <Text>{itemTitle}</Text>
            {selectedItems.includes(value) && (
              <Box w="6px" h="6px" borderRadius="full" bg="red.500" />
            )}
          </Flex>
        ))}
    </VStack>
  );
};
