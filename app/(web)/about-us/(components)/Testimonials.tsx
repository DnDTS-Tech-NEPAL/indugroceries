"use client";
import { useState, useEffect, useRef } from "react";
import { Box, Text, Flex, VStack, Image, Button } from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { TestimonialsProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { VisibleSection } from "@/components";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  rating: number;
  avatar?: string;
}
const MotionBox = motion(Box);

export const TestimonialCarousel = ({ data }: TestimonialsProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isLoading, setIsLoading] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (data) {
      const formattedTestimonials = data.testimonial.map((content, index) => ({
        id: index,
        content,
        author: data.testimonial_person[index],
        position: data.testimonial_designation[index],
        rating: data.testimonial_rating[index],
        avatar: data.testimonial_picture[index],
      }));

      setTestimonials(formattedTestimonials);
      setIsLoading(false);
    }
  }, [data]);

  const handleNavigation = (newDirection: "left" | "right") => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === "right") {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
    });
  };

  // Autoplay every 10 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;

    autoplayRef.current = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [testimonials]);

  const slideVariants = {
    enter: {
      X: "100%",
      opacity: 0.5,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction: string) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0.5,
      transition: { duration: 0.5 },
    }),
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Text>Loading testimonials...</Text>
      </Flex>
    );
  }

  if (!testimonials.length) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Text>No testimonials available</Text>
      </Flex>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <VisibleSection visibility={data?.testimonial_visibility}>
      <Box
        position="relative"
        maxW="7xl"
        mx="auto"
        minH={"70dvh"}
        display={"flex"}
        alignItems={"center"}
        py={{ base: 16, md: "16" }}
        bg="white"
        overflow="hidden"
      >
        {/* Navigation Arrows */}
        <Button
          aria-label="Previous testimonial"
          onClick={() => handleNavigation("left")}
          position="absolute"
          left={{ base: 2, md: 4 }}
          top={{ base: "8%", md: "40%" }}
          transform="translateY(-50%)"
          width={"40px"}
          height={"40px"}
          zIndex={1}
          boxShadow={{ base: "none", md: "md" }}
          bg="white"
          color={"black"}
          rounded={"full"}
          _hover={{ bg: "gray.100" }}
        >
          <LuArrowLeft />
        </Button>

        <Button
          aria-label="Next testimonial"
          onClick={() => handleNavigation("right")}
          position="absolute"
          right={{ base: 2, md: 4 }}
          top={{ base: "8%", md: "40%" }}
          transform="translateY(-50%)"
          width={"40px"}
          height={"40px"}
          zIndex={1}
          boxShadow={{ base: "none", md: "md" }}
          bg={{ base: "none", md: "white" }}
          color={"black"}
          rounded={"full"}
          _hover={{ bg: "gray.100" }}
        >
          <LuArrowRight size={20} />
        </Button>

        <VStack gap={6} textAlign="center">
          <AnimatePresence mode="wait" custom={direction}>
            <MotionBox
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Star Rating */}
              <Flex justify="center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text
                    key={star}
                    fontSize="2xl"
                    color={
                      star <= currentTestimonial.rating
                        ? "yellow.400"
                        : "gray.200"
                    }
                    mx={1}
                  >
                    ★
                  </Text>
                ))}
              </Flex>

              {/* Testimonial Content */}
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight={"bold"}
                px={{ base: 4, md: 8 }}
                textAlign={{ base: "justify", md: "center" }}
                hyphens={"auto"}
                py={{ base: 2, md: 8 }}
                width={{ base: "full", md: "52%" }}
                mx={"auto"}
              >
                {currentTestimonial.content}
              </Text>

              {/* Author Info */}
              <Flex gap={4}>
                {currentTestimonial.avatar && (
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    width="50px"
                    height="50px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                )}
                <Box borderRight={"2px solid"} borderColor={"gray.300"} pr={4}>
                  <Text fontWeight="bold" fontSize="lg">
                    {currentTestimonial.author}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {currentTestimonial.position}
                  </Text>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
          {/* Pagination Dots */}
          <Flex justify="center" mt={4}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                mx={1}
                w={2}
                h={2}
                borderRadius="full"
                bg={index === currentIndex ? "black" : "gray.300"}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left");
                  setCurrentIndex(index);
                }}
                cursor="pointer"
                transition="background 0.2s"
                _hover={{ bg: "gray.500" }}
              />
            ))}
          </Flex>
        </VStack>
      </Box>
    </VisibleSection>
  );
};
