import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { SummaryStore } from "@/types";

export const useSummaryStore = create<SummaryStore>()(
  persist(
    (set) => ({
      discount: 0,
      setDiscount: (discount) =>
        set(() => ({
          discount: discount,
        })),
    }),
    {
      name: "summary-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        discount: state.discount,
      }),
    }
  )
);
