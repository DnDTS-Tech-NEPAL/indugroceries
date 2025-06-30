import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, VStack, Grid, GridItem, Input, Button, Heading, Flex, Separator, Text } from "@chakra-ui/react";

export default function PersonalInfo({ bgColor, borderColor }: any) {
  return (
    <Box bg={bgColor} rounded="lg" border="1px" borderColor={borderColor} >
      <Text fontSize={"2xl"} fontWeight={"medium"} mb={8}>Personal</Text>
      <VStack gap={8} align="stretch">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem><FormControl><FormLabel>Full Name</FormLabel><Input placeholder="First name" /></FormControl></GridItem>
          <GridItem><FormControl><FormLabel>Email Address</FormLabel><Input placeholder="Email" /></FormControl></GridItem>
          <GridItem><FormControl><FormLabel>Phone Number</FormLabel><Input placeholder="Phone" /></FormControl></GridItem>
          <GridItem ><FormControl><FormLabel>Country / Region</FormLabel><Input placeholder="Country / Region" /></FormControl></GridItem>
        </Grid>
        <Flex justify="flex-end"><Button bgColor={"#FF6996"} colorScheme="pink" px={4} borderRadius={"md"}>Save Changes</Button></Flex>
        <Separator />
        <Box>
          <Text fontSize={"2xl"} fontWeight={"medium"} mb={8}>Change Password</Text>
          <VStack gap={6} align="stretch" >
            <FormControl><FormLabel>Old password</FormLabel><Input type="password" placeholder="Enter password" /></FormControl>
            <FormControl><FormLabel>New password</FormLabel><Input type="password" placeholder="Enter password" /></FormControl>
            <FormControl><FormLabel>Confirm password</FormLabel><Input type="password" placeholder="Enter password" /></FormControl>
            <Flex justify="flex-end"><Button bgColor={"#FF6996"} colorScheme="pink" px={4} borderRadius={"md"}>Save Changes</Button></Flex>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
