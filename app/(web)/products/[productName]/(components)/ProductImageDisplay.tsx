import Image from "next/image";
import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { ProductImageDisplayProps } from "@/types";

export const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({
  selectedImage,
  productName,
  productDetail,
}) => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const isHovered = hoverPosition.x !== 0 || hoverPosition.y !== 0;

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoverPosition({ x, y });
  };

  return (
    <Flex
      justify="center"
      align="center"
      pb={{ base: 6, md: 10 }}
      px={{ base: 4, md: 8 }}
    >
      <Box
        position="relative"
        width="100%"
        maxW="500px"
        height="560px"
        overflow="hidden"
        borderRadius="2xl"
        boxShadow="xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverPosition({ x: 0, y: 0 })}
        bg="white"
      >
        {/* Item Group Ribbon */}
        {productDetail && productDetail.item_group ? (
          <Box
            position="absolute"
            top="2"
            right="2"
            px={2}
            width="fit-content"
            borderRadius={"2rem"}
            bg="primary.300"
            color="white"
            textAlign="center"
            lineHeight="1"
            fontSize="md"
            fontWeight="semibold"
            py={1}
            zIndex="1"
          >
            {productDetail.item_group}
          </Box>
        ) : null}
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={productName}
            width={500}
            height={500}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              transform: isHovered ? "scale(2)" : "scale(1)",
              transformOrigin: `${hoverPosition.x}% ${hoverPosition.y}%`,
              transition: "transform 0.4s ease",
            }}
            priority
          />
        )}
      </Box>
    </Flex>
  );
};
