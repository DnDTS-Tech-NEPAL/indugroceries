import { useConfigQuery } from "@/hooks/api";
import { generateColorsFromConfig } from "@/utils";

export const useColors = () => {
  const { data: config } = useConfigQuery();

  return {
    THEME_COLORS: generateColorsFromConfig(config),
  };
};
