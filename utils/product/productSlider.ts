import { ProductAPIType } from "@/types";

export const convertProductsData = (products: ProductAPIType[]) => {
  if (!Array.isArray(products)) return [];

  return products.map((item) => ({
    category: item.item_group,
    image: item.custom_image_1_link,
    title: item.name,
    description: item.description,
    price: String(item.prices?.[0]?.price_list_rate),
    originalPrice: item.original_price,
    discount: String(item.max_discount),
  }));
};
