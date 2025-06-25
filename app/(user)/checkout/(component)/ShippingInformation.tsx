import { Box, Heading, Stack, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const ShippingInformation = () => {
  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" mb={6}>
        Shipping Information
      </Heading>

      <Stack gap={4}>
        {/* Name Section */}
        <Stack direction={{ base: "column", md: "row" }} gap={4}>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">First Name</FormLabel>
            <Input placeholder="First Name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Last Name</FormLabel>
            <Input placeholder="Last Name" />
          </FormControl>
        </Stack>

        {/* Contact Section */}
        <Stack direction={{ base: "column", md: "row" }} gap={4}>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Email Address</FormLabel>
            <Input type="email" placeholder="Email Address" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Phone Number</FormLabel>
            <Input type="tel" placeholder="Phone Number" />
          </FormControl>
        </Stack>

        {/* Address Section */}
        <FormControl isRequired>
          <FormLabel fontWeight="bold">Country / Region</FormLabel>
          <select>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
        </FormControl>

        <Stack direction={{ base: "column", md: "row" }} gap={4}>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Province</FormLabel>
            <Input placeholder="Province" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">City</FormLabel>
            <Input placeholder="City" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Zip Code</FormLabel>
            <Input placeholder="Zip Code" />
          </FormControl>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ShippingInformation;
