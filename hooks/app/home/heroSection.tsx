"use client";

import Image from "next/image";
import { RefObject, useLayoutEffect, useState } from "react";

import { useConfigQuery, useHomePageQuery } from "@/hooks/api";

import { useWindowSize } from "../layout";
import { HomePageType } from "@/types";

// calcualtes the width and padding for the swiper images in hero section
export const useHeroSectionSliderCalculations = (
  containerRef: RefObject<HTMLDivElement | null>
) => {
  const { width } = useWindowSize();

  const [innerContainerWidth, setInnerContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      // const element = containerRef.current!;
      // setInnerContainerWidth(element.clientWidth);
      if (containerRef.current) {
        const element = containerRef.current;
        setInnerContainerWidth(element.clientWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tenPercentOfInnerContainer =
    width >= 1536 ? innerContainerWidth * 0.1 : 0;

  // since padding is added in the main container add this to image width
  const extraPadding = width >= 1536 ? 32 : 16;

  return {
    extraPadding,
    tenPercentOfInnerContainer,
    width,
  };
};

export const useSliderImages = () => {
  const { data: config } = useConfigQuery();
  const { data: homeData } = useHomePageQuery();

  // Get all hero images from content array
  const heroImages = homeData?.content?.map(item => ({
    imageUrl: item.hero_image_link || config?.company_details_url || "",
    redirectUrl: "#" // You can add redirect URLs to your content items if needed
  })) || [];

  // Fallback to main_img if no content images exist
  const fallbackImages = (Object.keys(homeData || {}) as (keyof HomePageType)[])
    .filter(
      (key) =>
        key.startsWith("main_img") &&
        key.endsWith("_url") &&
        typeof homeData?.[key as keyof HomePageType] === "string" &&
        (homeData?.[key as keyof HomePageType] as string).trim() !== ""
    )
    .map((key) => {
      const imageUrl = String(
        homeData?.[key] || config?.company_details_url || ""
      );
      const redirectKey = key.replace(
        "_url",
        "_redirect"
      ) as keyof HomePageType;
      const redirectUrl = String(homeData?.[redirectKey] || "#");

      return { imageUrl, redirectUrl };
    });

  // Use hero images if available, otherwise fall back to main_img images
  const imagesToUse = heroImages.length > 0 ? heroImages : fallbackImages;

  const slides = imagesToUse.map(({ imageUrl, redirectUrl }, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => (window.location.href = redirectUrl)}
    >
      <Image
        src={imageUrl}
        alt={`Banner ${index + 1}`}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />
    </div>
  ));

  return slides;
};