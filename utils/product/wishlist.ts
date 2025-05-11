import { WishlistType } from "@/types";

export const formatWishlistData = (wishlist: WishlistType[]) => {
  if (!Array.isArray(wishlist)) return [];

  return wishlist.map((item, index) => ({
    id: index.toString(),
    title: item.item_code,
    category: item?.category,
    addedDate: item?.date,
    item_price: item.item_price,
    quantity: item.quantity,
    image: item.image_url,
  }));
};
