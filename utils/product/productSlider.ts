import { ProductAPIType } from "@/types";

export const convertProductsData = (products: ProductAPIType[]) => {
  if (!Array.isArray(products)) return [];

  return products.map((item) => ({
    category: item.item_group,
    brand: item.brand,
    image: item.custom_image_1_link,
    item_code: item.item_code,
    title: item.item_name,
    link: item.name,
    description: item.description,
    price: item.prices?.[0]?.discounted_price || 0,
    originalPrice: item.prices?.[0]?.price_list_rate,
    min_price: item.prices?.[0]?.min_price,
    max_price: item.prices?.[0]?.max_price,
    discount: String(item.prices?.[0]?.discount || 0),
    creation : item.creation,
    stock_qty: item.stock_qty,
    skin_types: item.skin_types,
    skin_concerns: item.skin_concerns,
  
  }));
};
