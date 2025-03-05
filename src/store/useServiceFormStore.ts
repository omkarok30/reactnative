// import { ServiceFormData } from "@/types/services";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // Default form data
// export const defaultFormData: ServiceFormData = {
//     category: "",
//     subcategory: "",
//     services: [],
//     description: "",
//     price: "",
//     billing_type: "hourly",
//     availability: [],
//     photos: [],
//     service_area: "",
//     spoken_languages: [],
// };

// // Store interface
// interface ServiceFormStore {
//     formData: ServiceFormData;
//     updateFormData: (newData: Partial<ServiceFormData>) => void;
//     resetForm: () => void;
// }
// // Correct Zustand store creation
// export const useServiceFormStore = create<ServiceFormStore>()(
//     persist(
//         (set) => ({
//             formData: defaultFormData,
//             updateFormData: (newData) =>
//                 set((state) => ({
//                     formData: { ...state.formData, ...newData }
//                 })),
//             resetForm: () => set({ formData: defaultFormData }),
//         }),
//         {
//             name: 'service-form-storage',
//             storage: {
//                 getItem: async (name) => {
//                     const value = await AsyncStorage.getItem(name);
//                     return value ? JSON.parse(value) : null;
//                 },
//                 setItem: async (name, value) => {
//                     await AsyncStorage.setItem(name, JSON.stringify(value));
//                 },
//                 removeItem: async (name) => {
//                     await AsyncStorage.removeItem(name);
//                 },
//             },
//         }
//     )
// );

import { ServiceFormSchema } from "@/models/ServiceFormSchema";
import { ServiceFormData } from "@/types/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useCategoryStore } from "./useCategoryStore";

interface ServiceFormStore {
    formData: ServiceFormSchema;
    setFormData: (data: Partial<ServiceFormSchema>) => void;
    resetForm: () => void;
}

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

export const useServiceFormStore = create<ServiceFormStore>()(
    persist((set) => ({
        formData: defaultServiceFormValues,
        setFormData: (data) =>
            set((state) => ({ formData: { ...state.formData, ...data } })),
        resetForm: () => {
            set({ formData: defaultServiceFormValues })
            useCategoryStore.getState().resetCategory();
        },
    }),
        {
            name: "service-form-storage", // Storage key
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
        }
    )
);
