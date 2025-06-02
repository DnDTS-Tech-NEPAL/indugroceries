"use client";
import { SimpleGrid, Box, Image } from "@chakra-ui/react";
import { BenefitItem } from "./BenefitItem";
import { useConfigQuery } from "@/hooks/api";
import { FaQuestionCircle } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import React from "react";

export const BenefitsSection = () => {
  const { data: config } = useConfigQuery();

  if (!config) return null;

  // Function to render either an icon or image
  const renderIcon = (iconSrc: string) => {
    if (iconSrc.startsWith('http')) {
      return (
        <Image 
          src={iconSrc} 
          boxSize={10} 
          alt="benefit icon"
          objectFit="contain"
        />
      );
    }
    
    // Otherwise try to use it as a react-icons name
    const IconComponent = (FaIcons as any)[iconSrc] || FaQuestionCircle;
    return <IconComponent size={20} />;
  };

  const benefits = [
    {
      icon: config.card_1_icon_link,
      title: config.card_1_label,
      subtitle: config.card_1_content,
    },
    {
      icon: config.card_2_icon_link,
      title: config.card_2_label,
      subtitle: config.card_2_content,
    },
    {
      icon: config.card_3_icon_link,
      title: config.card_3_label,
      subtitle: config.card_3_content,
    },
    {
      icon: config.card_4_icon_link,
      title: config.card_4_label,
      subtitle: config.card_4_content,
    },
  ];

  return (
    <Box maxW="6xl" mx="auto" my={[6, 8]}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={[6, 8, 10]} px={[2, 4, 6]}>
        {benefits.map((item, index) => (
          <BenefitItem
            key={index}
            icon={() => renderIcon(item.icon)}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};