// store/products/brandFilterStore.ts
import { create } from "zustand";

interface BrandFilterState {
  category: string[];
  priceRange: [number, number];
  discount: number;
  inStock: number;
  skinTypes: string[];
  setSkinTypes: (types: string[]) => void;
  setCategory: (category: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setDiscount: (discount: number) => void;
  setInStock: (inStock: number) => void;
  resetFilters: (maxPrice: number) => void;
}

export const useBrandFilterStore = create<BrandFilterState>((set) => ({
  category: [],
  priceRange: [0, 0], 
  discount: 0,
  inStock: 0,
  skinTypes: [],
  setSkinTypes: (types) => set({ skinTypes: types }),
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setDiscount: (discount) => set({ discount }),
  setInStock: (inStock) => set({ inStock }),
  resetFilters: (maxPrice) =>
    set({
      category: [],
      priceRange: [0, maxPrice],
      discount: 0,
      inStock: 0,
      skinTypes: [],
    }),
}));