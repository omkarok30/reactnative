import { Category, Subcategory } from "@/types/database";
import { create } from "zustand";

interface FilterStore {
    filters: any;
    showResults: boolean;
    setFilters: (filters: any) => void;
    resetFilters: () => void;
    setShowResults: (value: boolean) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    filters: null,
    showResults: false,
    setFilters: (filters) => set({ filters }),
    setShowResults: (value) => set({ showResults: value }),
    resetFilters: () => set({ filters: null }),
}));
