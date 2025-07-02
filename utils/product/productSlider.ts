import { ProductAPIType } from "@/types";

export const convertProductsData = (products: ProductAPIType[]) => {
  if (!Array.isArray(products)) return [];

  return products.map((item) => ({
    category: item.item_group,
    image: item.custom_image_1_link,
    item_code: item.item_code,
    title: item.item_name,
    link: item.name,
    description: item.description,
    price: item.prices?.[0]?.price_list_rate || 0,
    originalPrice: item.original_price,
    discount: String(item.max_discount),
  }));
};
