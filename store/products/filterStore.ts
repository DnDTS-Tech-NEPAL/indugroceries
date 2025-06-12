
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterStore = {
  brand: string[];
  item_group: string[];
  bestseller: number;
  pricerange: number;
  page: number;
  setBrand: (brands: string[]) => void;
  setItemGroup: (groups: string[]) => void;
  setBestseller: (val: number) => void;
  setPriceRange: (val: number) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      brand: [],
      item_group: [],
      bestseller: 0,
      pricerange: 0,
      page: 1,
      setBrand: (brand) => set({ brand }),
      setItemGroup: (item_group) => set({ item_group }),
      setBestseller: (bestseller) => set({ bestseller }),
      setPriceRange: (pricerange) => set({ pricerange }),
      setPage: (page) => set({ page }),
      resetFilters: () =>
        set({
          brand: [],
          item_group: [],
          bestseller: 0,
          pricerange: 0,
          page: 1,
        }),
    }),
    {
      name: "product-filters",
    }
  )
);
