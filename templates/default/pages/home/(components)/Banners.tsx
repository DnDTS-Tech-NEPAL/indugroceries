"use client";

import { Box, Grid } from "@chakra-ui/react";

import { BannerCard } from "@/components";
import { useColors } from "@/config";
import { useHomePageQuery } from "@/hooks/api";
import { VisibleSection } from "@/components/ui/visibleSection";

export const Banners = () => {
  const { data: bannersData } = useHomePageQuery();
  const { THEME_COLORS } = useColors();

  return (
    <VisibleSection visibility={bannersData?.banner_visibility}>
      <Box
        px={{
          base: "20px",
          md: "40px",
        }}
        pb={{
          base: "40px",
          lg: "64px",
          "2xl": "120px",
        }}
      >
        <Grid
          gridTemplateColumns={{
            xl: "repeat(2, 1fr)",
          }}
          gap="24px"
          height={{
            xl: "540px",
          }}
        >
          <Box
            flex={1}
            height={{
              md: "400px",
              xl: "full",
            }}
          >
            <BannerCard
              title={bannersData.banner_1_title}
              description={bannersData.banner_1_description}
              buttonTitle="Explore Now"
              background={THEME_COLORS.blue[100].value}
              imageUrl={bannersData.banner_1_image_url}
              redirectLink="#"
            />
          </Box>

          <Box
            flex={1}
            height={{
              md: "400px",
              xl: "full",
            }}
          >
            <BannerCard
              title={bannersData.banner_2_title}
              description={bannersData.banner_2_description}
              buttonTitle="Shop Now"
              background={THEME_COLORS.blue[200].value}
              direction="column"
              imageUrl={bannersData.banner_2_image_url}
              redirectLink="#"
            />
          </Box>
        </Grid>
      </Box>
    </VisibleSection>
  );
};
