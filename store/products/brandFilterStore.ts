// store/products/brandFilterStore.ts

import { create } from "zustand";

interface BrandFilterState {
  category: string[];
  priceRange: [number, number];
  discount: number;
  inStock: number;
  setCategory: (category: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setDiscount: (discount: number) => void;
  setInStock: (inStock: number) => void;
  resetFilters: () => void;
}

export const useBrandFilterStore = create<BrandFilterState>((set) => ({
  category: [],
  priceRange: [0, 2500],
  discount: 0,
  inStock: 0,
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setDiscount: (discount) => set({ discount }),
  setInStock: (inStock) => set({ inStock }),
  resetFilters: () =>
    set({
      category: [],
      priceRange: [0, 2500],
      discount: 0,
      inStock: 0,
    }),
}));
