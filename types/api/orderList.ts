export type OrderType = {
  name: string;
  transaction_date: string;
  status: string;
  grand_total: string;
  payment_status: string;
  payment_url: string;
  items: [
    {
      item_code: string;
      item_name: string;
      qty: string;
      rate: number;
      amount: number;
      image_url: string;
    },
  ];
};

export type OrderAPIResponseType = {
  message: OrderType[];
};
