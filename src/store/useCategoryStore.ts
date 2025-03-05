import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

type Category = {
    id: number;
    name: string;
    created_at: string;
    type_id: number;
};

type Subcategory = {
    id: number;
    category_id: number;
    name: string;
    created_at: string;
};

interface CategoryStore {
    categories: Category[];
    subcategories: Subcategory[];
    selectedCategory: Category | null;
    selectedSubcategory: Subcategory | null;
    selectedServices: string[];

    setCategories: (categories: Category[]) => void;
    setSubcategories: (subcategories: Subcategory[]) => void;
    setSelectedCategory: (category: Category | null) => void;
    setSelectedSubcategory: (subcategory: Subcategory | null) => void;
    setSelectedServices: (services: string[]) => void;

    resetSelections: () => void;
    resetCategory: () => void; // New function to reset all categories and subcategories
}

export const useCategoryStore = create<CategoryStore>()(
    persist(
        (set) => ({
            categories: [],
            subcategories: [],
            selectedCategory: null,
            selectedSubcategory: null,
            selectedServices: [],

            setCategories: (categories) => set({ categories }),
            setSubcategories: (subcategories) => set({ subcategories }),
            setSelectedCategory: (category) =>
                set({
                    selectedCategory: category,
                    selectedSubcategory: null,
                    selectedServices: [],
                }),
            setSelectedSubcategory: (subcategory) =>
                set({ selectedSubcategory: subcategory, selectedServices: [] }),
            setSelectedServices: (services) => set({ selectedServices: services }),

            // Reset selected items (Triggered from UI)
            resetSelections: () => {
                set({
                    selectedCategory: null,
                    selectedSubcategory: null,
                    selectedServices: [],
                });
            },

            // Reset categories & subcategories (Triggered from another store)
            resetCategory: () => {
                set({
                    categories: [],
                    subcategories: [],
                    selectedCategory: null,
                    selectedSubcategory: null,
                    selectedServices: [],
                });
            },
        }),
        {
            name: "category-store",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
