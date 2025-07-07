// store/products/brandFilterStore.ts
import { create } from "zustand";

interface BrandFilterState {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  discount: number;
  inStock: number;
  skinTypes: string[];
  skinConcern: string[];
  item_group?: string[];
  page: number;
  setSkinTypes: (types: string[]) => void;
  setSkinConcernTypes: (types: string[]) => void;
  setCategory: (category: string[]) => void;
  setBrand: (brand: string[]) => void;
  setItemGroup: (item_group: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setDiscount: (discount: number) => void;
  setInStock: (inStock: number) => void;
  setPage: (page: number) => void;
  resetFilters: (maxPrice: number) => void;
}

export const useBrandFilterStore = create<BrandFilterState>((set) => ({
  category: [],
  brand: [],
  priceRange: [0, 0],
  discount: 0,
  inStock: 0,
  skinTypes: [],
  skinConcern: [],
  page: 1,
  item_group: [],
  setSkinTypes: (types) => set({ skinTypes: types }),
  setSkinConcernTypes: (types) => set({ skinConcern: types }),
  setCategory: (category) => set({ category }),
  setBrand: (brand) => set({ brand }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setDiscount: (discount) => set({ discount }),
  setPage: (page) => set({ page }),
  setItemGroup: (item_group) => set({ item_group }),
  setInStock: (inStock) => set({ inStock }),
  resetFilters: (maxPrice) =>
    set({
      category: [],
      brand: [],
      item_group: [],
      priceRange: [0, maxPrice],
      discount: 0,
      inStock: 0,
      skinTypes: [],
      skinConcern: [],
      page: 1,
    }),
}));
