export type CouponCalculationAPIResponseType = {
  message: string;
  data: {
    total: number;
    total_tax: number;
    total_after_tax: number;
    discount_amount: number;
    grand_total_after_discount: number;
    delivery_charge: number;
    final_total: number;
  };
};
