import { CartType } from "@/types/api/products/cart";

export const formatCartData = (cart: CartType[]) => {
  if (!Array.isArray(cart)) return [];

  return cart.map((item, index) => ({
    id: index.toString(),
    title: item.item_code,
    category: "",
    type: item.item_group,
    subType: "",
    price: item.item_price,
    discountPercentage: item.discount_percentage,
    discountedPrice: item.discounted_price,
    totalprice: item.total,
    stock_qty: item.stock_qty,
    quantity: item.quantity,
    image: item.image_url,
    description: "",
    minimumQuantity: item.custom_minimum_order_quantity,
    maximumQuantity: item.custom_maximum_order_quantity,
    incrementStep: item.custom_increment_on_quantity,
  }));
};
