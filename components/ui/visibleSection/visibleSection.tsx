"use client";
import { ReactNode } from "react";

interface visibleSectionProps {
  visibility?: number;
  children: ReactNode;
}

export const VisibleSection = ({
  visibility,
  children,
}: visibleSectionProps) => {
  if (visibility === 0) return null;
  return <>{children}</>;
};
interface VisibleContentSectionProps {
  content: string | null;
  children: ReactNode;
}

export const VisibleContentSection = ({
  content,
  children,
}: VisibleContentSectionProps) => {
  const isEmpty = !content || content.trim() === "" || content === "null";

  if (isEmpty) return null;

  return <>{children}</>;
};
