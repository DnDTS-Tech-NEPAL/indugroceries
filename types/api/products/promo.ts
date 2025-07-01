import { LoyaltyPoints } from '@/assets/svg';
export type PromoCouponType = {
  coupon: string;
  delivery_place: string;
  loyalty_points: number;
};

export type PromoCouponResponseData = {
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

export type PromoFormData = {
  promoCode: string;
  deliveryLocation: string;
  LoyaltyPoints:number;
};

export type PromoData = {
  total: number;
  total_tax: number;
  total_after_tax: number;
  discount_amount: number;
  grand_total_after_discount: number;
  delivery_charge: number;
  final_total: number;
};

export type PromoFormState = {
  promoCode: string;
  deliveryLocation: string;
  resetFlag: boolean;
  setPromoCode: (code: string) => void;
  setDeliveryLocation: (location: string) => void;
  resetPromoForm: () => void;
  clearResetFlag: () => void;
};
