import { create } from "zustand";

import { PromoFormState } from "@/types";

export const usePromoFormStore = create<PromoFormState>((set) => ({
  promoCode: "",
  deliveryLocation: "",
  resetFlag: false,
  setPromoCode: (code) => set({ promoCode: code }),
  setDeliveryLocation: (location) => set({ deliveryLocation: location }),
  resetPromoForm: () =>
    set({
      promoCode: "",
      deliveryLocation: "",
      resetFlag: true,
    }),
  clearResetFlag: () => set({ resetFlag: false }),
}));
