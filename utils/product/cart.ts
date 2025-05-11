import { CartType } from "@/types/api/products/cart";

export const formatCartData = (cart: CartType[]) => {
  if (!Array.isArray(cart)) return [];

  return cart.map((item, index) => ({
    id: index.toString(),
    title: item.item_code,
    category: "",
    type: item.item_group,
    subType: "",
    price: item.item_price > 0 ? item.item_price?.toString() : "1000",
    quantity: item.quantity,
    image: item.image_url,
    description: "",
    minimumQuantity: item.custom_minimum_order_quantity,
    maximumQuantity: item.custom_maximum_order_quantity,
    incrementStep: item.custom_increment_on_quantity,
  }));
};
