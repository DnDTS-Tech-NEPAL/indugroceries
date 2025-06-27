"use client"

import { Box, Text, VStack, Input} from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
  Checkbox
} from "@/components"

import { FormControl, FormLabel } from "@chakra-ui/form-control"

export default function RememberMeSection() {
  const title = "Remember Me"

  return (
    <AccordionRoot
      collapsible
      as={VStack}
      alignItems="stretch"
      defaultValue={[title]}
      borderTop="1px solid #D0D0D0"
      pt={10}
    >
      <AccordionItem value={title} border="none">
        <AccordionItemTrigger hasAccordionIcon isOpen>
          <Text fontSize="xl" fontWeight={500}>
            {title}
          </Text>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <VStack align="start" gap={4} spaceY={5} mt={4} width={"full"}>
            <Checkbox colorScheme="pink">
              Save my information for a faster checkout.
            </Checkbox>
<Box width={"full"}>
            <FormControl flex={1}>
              <FormLabel fontSize="sm" color="gray.600" mb={10}>
                Phone Number
              </FormLabel>
              <Input placeholder="Phone Number" />
            </FormControl>
            </Box>
          </VStack>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )
}
