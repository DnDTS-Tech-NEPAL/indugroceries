export type ProductCardProps = {
  category?: string;
  item_code: string;
  image: string | null;
  title: string;
  link: string;
  // description: string;
  // name?: string;
  price: string | number;
  originalPrice?: string | number;
  discount?: string;
  hasAddToCart?: boolean;
  id?: string | number;
  isNew?: boolean;
  isSale?: boolean;
  min_price?: number;
  max_price?: number;
};
