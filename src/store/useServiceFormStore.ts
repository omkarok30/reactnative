import { ServiceFormSchema } from "@/models/ServiceFormSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useCategoryStore } from "./useCategoryStore";
import { SalesFormSchema } from "@/models/SalesFormSchema";

export const defaultServiceFormValues: ServiceFormSchema = {
    category: "",
    subcategory: "",
    services: [],
    description: "",
    photos: [],
    price: "",
    billing_type: "",
    availability: [],
    service_area: "",
    spoken_languages: [],
};

export const defaultSalesFormValues: SalesFormSchema = {
    title: "",
    category: "",
    subcategory: "",
    description: "",
    photos: [],
    price: "",
    condition: "",
    location: "",
    items: []
}

interface FormStore {
    serviceFormData: ServiceFormSchema;
    salesFormData: SalesFormSchema;
    setServiceFormData: (data: Partial<ServiceFormSchema>) => void;
    resetServiceForm: () => void;
    setSalesFormData: (data: Partial<SalesFormSchema>) => void;
    resetSalesForm: () => void;
}

export const useFormStore = create<FormStore>()(
    persist(
        (set) => ({
            serviceFormData: defaultServiceFormValues,
            salesFormData: defaultSalesFormValues,

            setServiceFormData: (data) =>
                set((state) => ({
                    serviceFormData: { ...state.serviceFormData, ...data },
                })),

            resetServiceForm: () => {
                set({ serviceFormData: defaultServiceFormValues });
                // Reset category store if needed
                useCategoryStore.getState().resetCategory();
            },

            setSalesFormData: (data) =>
                set((state) => ({
                    salesFormData: { ...state.salesFormData, ...data },
                })),

            resetSalesForm: () => {
                set({ salesFormData: defaultSalesFormValues });
                // Reset category store if needed
                // useCategoryStore.getState().resetCategory();
            },
        }),
        {
            name: "form-storage", // Unified storage key
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
        }
    )
);
