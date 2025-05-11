import { create } from "zustand";

import { ItemStore, VariantStore } from "@/types";

export const useVariantStore = create<VariantStore>((set) => ({
  activeVariant: "",
  updateVariant: (variant) => set(() => ({ activeVariant: variant })),
}));

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  setItems: (items) =>
    set((state) => ({
      items: typeof items === "function" ? items(state.items) : items,
    })),
}));
