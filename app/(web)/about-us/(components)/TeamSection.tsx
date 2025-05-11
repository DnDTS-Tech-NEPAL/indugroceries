// "use client";
// import { useConfigQuery } from "@/hooks/api";
// import { TeamSectionProps } from "@/types";
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   VStack,
//   SimpleGrid,
//   Image,
//   Flex,
// } from "@chakra-ui/react";
// export const TeamSection = ({ data }: TeamSectionProps) => {
//   const { data: config } = useConfigQuery();
//   const {
//     our_team_title,
//     our_team_description,
//     our_team_name,
//     our_team_designation,
//     our_team_person_description,
//     our_team_image,
//   } = data;

//   return (
//     <Container maxW="7xl" py={12}>
//       <VStack gap={6} align="center" mb={12}>
//         <Heading as="h1" size="2xl">
//           {our_team_title}
//         </Heading>
//         <Text fontSize="lg">{our_team_description}</Text>
//       </VStack>

//       <SimpleGrid gap={10}>
//         {our_team_name.map((name, index) => {
//           const image = our_team_image[index] || config.company_details_url;
//           const designation = our_team_designation[index];
//           const description = our_team_person_description[index];

//           return (
//             <Box
//               key={index}
//               borderWidth="1px"
//               borderRadius="lg"
//               boxShadow="md"
//               transition="all 0.2s"
//             >
//               <Flex
//                 gap={6}
//                 direction={{ base: "column", md: "row" }}
//                 align="center"
//               >
//                 <Box
//                   flex={1}
//                   w={{ base: "200px", md: "200px" }}
//                   h={{ base: "200px", md: "200px" }}
//                   overflow="hidden"
//                 >
//                   <Image
//                     src={image}
//                     alt={name}
//                     w="full"
//                     h="full"
//                     borderRadius={"full"}
//                     objectFit="contain"
//                     objectPosition="center"
//                   />
//                 </Box>

//                 <Box flex="1" bg={"gray.200"} p={10}>
//                   <Heading as="h3" size="md" my={2}>
//                     {name}
//                   </Heading>
//                   <Text
//                     fontWeight="semibold"
//                     color="gray.500"
//                     fontStyle="italic"
//                   >
//                     {designation}
//                   </Text>
//                   <Text
//                     fontWeight="light"
//                     color="gray.800"
//                     textAlign="justify"
//                     mt={2}
//                   >
//                     {description}
//                   </Text>
//                 </Box>
//               </Flex>
//             </Box>
//           );
//         })}
//       </SimpleGrid>
//     </Container>
//   );
// };
"use client";
import { useConfigQuery } from "@/hooks/api";
import { TeamSectionProps } from "@/types";
import Slider from "react-slick";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  // Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
// import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/svg";
import { ReactNode } from "react";

// Custom Arrow Components
const NextArrow = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Next"
    onClick={onClick}
    position="absolute"
    right="-16px"
    bottom="-8%"
    transform="translateY(-50%)"
    zIndex={2}
    bg="gray.200"
    _hover={{ bg: "gray.300" }}
    borderRadius="full"
  >
    <ArrowRightIcon />
  </IconButton>
);

const PrevArrow = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Prev"
    onClick={onClick}
    position="absolute"
    right="32px"
    bottom="-8%"
    transform="translateY(-50%)"
    zIndex={2}
    bg="gray.200"
    _hover={{ bg: "gray.300" }}
    borderRadius="full"
  >
    <ArrowLeftIcon />
  </IconButton>
);

export const TeamSection = ({ data }: TeamSectionProps) => {
  const { data: config } = useConfigQuery();

  const {
    our_team_title,
    our_team_description,
    our_team_name,
    our_team_designation,
    our_team_person_description,
    our_team_image,
  } = data;

  const slidesToShow = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3,
  });

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    appendDots: (dots: ReactNode) => (
      <Box mt={8}>
        <ul style={{ position: "absolute", bottom: "-8%", left: "2%" }}>
          {dots}
        </ul>
      </Box>
    ),
    // dotsClass: "slick-dots slick-thumb",
  };

  return (
    <Box
      maxW={"7xl"}
      mx="auto"
      position="relative"
      py={{ base: 10, md: 20 }}
      px={{ base: 4, md: 8 }}
    >
      <VStack gap={6} align="start" mb={12} px={4} textAlign="start">
        <Heading as="h1">{our_team_title}</Heading>
        <Text fontSize={{ base: "md", md: "lg" }}>{our_team_description}</Text>
      </VStack>

      <Box position="relative">
        <Slider {...settings}>
          {our_team_name.map((name, index) => {
            const image = our_team_image[index] || config.company_details_url;
            const designation = our_team_designation[index];
            const description = our_team_person_description[index];

            return (
              <Box key={index} px={4}>
                <Box
                  minHeight={{ base: "auto", md: "480px" }}
                  display="flex"
                  flexDirection="column"
                  py={4}
                  p={4}
                >
                  <Flex justify="start" gap={4} mb={4}>
                    <Image
                      src={image}
                      alt={name}
                      boxSize="100px"
                      borderRadius="full"
                      objectFit="cover"
                    />
                  </Flex>
                  <Heading as="h3" size="md" textAlign="start" mb={2}>
                    {name}
                  </Heading>
                  <Text fontWeight="semibold" color="gray.500" mb={2}>
                    {designation}
                  </Text>
                  <Text
                    fontSize="16px"
                    color="gray.700"
                    flex="1"
                    textAlign={"justify"}
                  >
                    {description}
                  </Text>
                  {/* <Flex justify="start" gap={4} py={2} mt="auto">
                    <Icon as={FaFacebook} boxSize={5} />
                    <Icon as={FaLinkedin} boxSize={5} />
                    <Icon as={FaTwitter} boxSize={5} />
                  </Flex> */}
                </Box>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
};
