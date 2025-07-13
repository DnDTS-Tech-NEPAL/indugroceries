"use client";

import React from "react";
import { Box, Grid, Spinner } from "@chakra-ui/react";

import { EmptyState } from "@/components";
import { useWishlistQuery } from "@/hooks/api";

import { FavouritePage } from "./FavoritePage";

export const FavoriteContainer = () => {
  const { data: WishlistData = [], isLoading } = useWishlistQuery();

  return (
    <Box
      px={{
        base: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
      }}
      py={{ base: "24px", lg: "32px", "2xl": "56px" }}
      alignItems={"stretch"}
    >
      {isLoading ? (
        <Grid placeItems="center" height="300px">
          <Spinner />
        </Grid>
      ) : WishlistData?.length > 0 ? (
        <Box maxWidth={"1280px"} mx={"auto"} alignItems={"stretch"}>
          <FavouritePage />
        </Box>
      ) : (
        <EmptyState />
      )}
    </Box>
  );
};
