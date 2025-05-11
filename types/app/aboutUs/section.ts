export type SectionProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageDirection?: "left" | "right";
  // points: string[];
  points: {
    title: string;
    description: string;
  }[];
};
