import { useQuery } from "@tanstack/react-query";

import { getWishlistCountData } from "@/api";

export const useWishlistCountQuery = (guid: string) => {
  return useQuery({
    queryKey: ["wishlist-count", guid],
    queryFn: () => getWishlistCountData(guid),
    select: (response) => response?.data.data,
  });
};
