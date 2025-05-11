import { useQuery } from "@tanstack/react-query";

import { getWishlistCountData } from "@/api";

export const useWishlistCountQuery = () => {
  return useQuery({
    queryKey: ["wishlist-count"],
    queryFn: getWishlistCountData,
    select: (response) => response?.data.data,
  });
};
