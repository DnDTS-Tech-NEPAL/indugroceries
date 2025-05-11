import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PromoData } from "@/types";

export const usePromoStore = create(
  persist<{
    promoData: PromoData | null;
    setPromoData: (data: PromoData) => void;
  }>(
    (set) => ({
      promoData: null,
      setPromoData: (data) => set({ promoData: data }),
    }),
    {
      name: "promo-data-store", // localStorage key
    }
  )
);
