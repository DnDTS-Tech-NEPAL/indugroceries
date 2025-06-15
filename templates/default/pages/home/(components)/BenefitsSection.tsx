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

  const footer_card = [
    {
      icon: config.footer_cards[0].card_icon,
      title: config.footer_cards[0].card_label,
      subtitle: config.footer_cards[0].card_content,
    },
    {
      icon: config.footer_cards[1].card_icon,
      title: config.footer_cards[1].card_label,
      subtitle: config.footer_cards[1].card_content,
    },
    {
      icon: config.footer_cards[2].card_icon,
      title: config.footer_cards[2].card_label,
      subtitle: config.footer_cards[2].card_content,
    },
    {
      icon: config.footer_cards[3].card_icon,
      title: config.footer_cards[3].card_label,
      subtitle: config.footer_cards[3].card_content,
    }
    
  ];

  return (
    <Box maxW="6xl" mx="auto" my={[6, 8]}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={[6, 8, 10]} px={[2, 4, 6]}>
        {footer_card.map((item, index) => (
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