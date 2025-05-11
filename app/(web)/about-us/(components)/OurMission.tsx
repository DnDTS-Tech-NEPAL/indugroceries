"use client";

import { OurMissionProps } from "@/types";

import { Section } from "./Section";

export const OurMission = ({ data }: OurMissionProps) => {
  // Combine points with descriptions
  const missionPoints =
    data?.mission_points?.map((title: string, index: number) => ({
      title,
      description: data?.mission_points_description?.[index] || "",
    })) || [];

  const visionPoints =
    data?.vision_points?.map((title: string, index: number) => ({
      title,
      description: data?.vision_points_description?.[index] || "",
    })) || [];
  return (
    <>
      <Section
        imageDirection="right"
        title={data?.mission_title}
        description={data?.mission_description}
        imageSrc={data?.mission_image}
        // points={data?.mission_points}
        points={missionPoints}
      />
      <Section
        title={data?.vision_title}
        description={data?.vision_description}
        imageSrc={data?.vision_image}
        // points={data?.vision_points}
        points={visionPoints}
      />
    </>
  );
};
