export type WishlistFormType = {
  id: string;
  title: string;
  category: string;
  item_price: string | number;
  quantity: number;
  addedDate: string;
  image: string;
};

export type WishlistType = {
  item_code: string;
  quantity: number;
  item_price: number;
  image_url: string;
  category: string;
  date: string;
};

export type WishlistApiType = {
  data: WishlistType[];
};

export type WishlistPayloadType = {
  item_code?: string;
  quantity: number;
  guid?: string | null;
};

export type RemoveFromWishlistPayloadType = {
  item_code: string[];
  guid?: string | null;
};
