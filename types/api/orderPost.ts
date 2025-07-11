export type OrderPostType = {
  items: {
    item_code: string;
    qty: number;
    rate: number;
  }[];
  selectedPaymentMethod?: string;
  delivery_note?: string;
};
