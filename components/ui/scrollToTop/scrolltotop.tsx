"use client";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@/assets/svg";

const Scrolltop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Scroll to the top of the page
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Toggle the visibility of the button based on the scroll position
  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.pageYOffset > 200) {
        // Show button when scrolled 200px or more
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          position="fixed"
          bottom="3rem"
          right="2rem"
          backgroundColor={"primary"}
          height={"30px"}
          width={"30px"}
          zIndex={100}
          borderRadius={"full"}
        >
          <ArrowUpIcon style={{ color: "gray.900" }} />
        </Button>
      )}
    </>
  );
};

export default Scrolltop;
