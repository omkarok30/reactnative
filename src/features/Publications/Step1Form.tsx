import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { useForm, useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useServiceFormStore } from "@/store/useServiceFormStore";
import { z } from "zod";
import { step1Schema } from "@/models/ServiceFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

// Type for Form Data
type Step1FormData = z.infer<typeof step1Schema>;

// Data
const categories = [
    { id: "1", name: "Services Domestiques" },
    { id: "2", name: "Santé, Beauté et Bien-être" },
    { id: "3", name: "Alimentation et Événementiel" },
    { id: "4", name: "Artisanat et Services Techniques" },
    { id: "5", name: "Éducation, Formation et Services Numériques" },
    { id: "6", name: "Transport et Services Commerciaux" },
];

const subcategories = [
    { id: "10", category_id: "6", name: "Transport et livraison" },
    { id: "11", category_id: "6", name: "Services commerciaux" },
];

const services = [
    { id: "153", subcategory_id: "11", name: "Agent de microfinance" },
    { id: "156", subcategory_id: "11", name: "Agent immobilier informel" },
    { id: "73", subcategory_id: "11", name: "Agent immobilier informel / Démarcheur" },
    { id: "154", subcategory_id: "11", name: "Collecteur d'argent mobile" },
    { id: "75", subcategory_id: "11", name: "Collecteur d'argent mobile (mobile money)" },
    { id: "77", subcategory_id: "11", name: "Conseiller / Conseillère en achats" },
    { id: "152", subcategory_id: "11", name: "Conseiller en achats" },
    { id: "151", subcategory_id: "11", name: "Courtier local" },
    { id: "79", subcategory_id: "11", name: "Distributeur itinérant de recharges / services financiers" },
    { id: "150", subcategory_id: "11", name: "Distributeur itinérant de recharges/services financiers" },
    { id: "155", subcategory_id: "11", name: "Vendeur à domicile" },
];

const Step1Form: React.FC = () => {
    const { data, updateFormData } = useServiceFormStore();
    const {
        register,
        handleSubmit,
        getValues,
        setValue, watch,
        formState: { errors },
    } = useForm<Step1FormData>({
        resolver: zodResolver(step1Schema),
        defaultValues: data,
    });

    const [filteredSubcategories, setFilteredSubcategories] = useState<typeof subcategories>([]);
    const [filteredServices, setFilteredServices] = useState<typeof services>([]);
    const selectedServices: string[] = watch("services") || [];

    const selectedCategory = watch("category");
    const selectedSubcategory = watch("subcategory");

    // Handle selecting/deselecting services
    const handleServiceChange = (serviceId: string) => {
        const newSelection = selectedServices.includes(serviceId)
            ? selectedServices.filter((id) => id !== serviceId) // Remove if already selected
            : [...selectedServices, serviceId]; // Add if not selected

        setValue("services", newSelection);
    };

    // Update Subcategories when Category changes
    useEffect(() => {
        if (selectedCategory) {
            setFilteredSubcategories(subcategories.filter((sub) => sub.category_id === selectedCategory));
            setValue("subcategory", "");
            setFilteredServices([]);
        }
    }, [selectedCategory]);

    // Update Services when Subcategory changes
    useEffect(() => {
        if (selectedSubcategory) {
            setFilteredServices(services.filter((service) => service.subcategory_id === selectedSubcategory));
            setValue("services", []);
        }
    }, [selectedSubcategory]);

    // Persist form state in Zustand
    useEffect(() => {
        const subscription = watch((values) => updateFormData(values));
        return () => subscription.unsubscribe();
    }, [watch, updateFormData]);

    return (
        <ScrollView>
            <View>
                <Text>Step 1: Basic Details</Text>

                {/* Category Dropdown */}
                <Text>Category</Text>
                <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} label={cat.name} value={cat.id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category && <Text>{errors.category.message}</Text>}

                {/* Subcategory Dropdown */}
                <Text>Subcategory</Text>
                <Select onValueChange={(value) => setValue("subcategory", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredSubcategories.map((sub) => (
                            <SelectItem key={sub.id} label={sub.name} value={sub.id}>
                                {sub.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.subcategory && <Text>{errors.subcategory.message}</Text>}

                {/* Multi-Select Dropdown for Services */}
                <Text>Services</Text>
                <Select onValueChange={handleServiceChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select services" />
                    </SelectTrigger>
                    <SelectContent>
                        {filteredServices.map((service) => (
                            <SelectItem key={service.id} label={service.name} value={service.id}>
                                {service.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Display Selected Services */}
                <ScrollView horizontal className="mt-2 flex-row">
                    {selectedServices.map((serviceId) => {
                        const service = services.find((s) => s.id === serviceId);
                        if (!service) return null;
                        return (
                            <View key={service.id} className="flex-row items-center bg-gray-200 px-3 py-1 rounded-full mr-2">
                                <Text className="text-sm">{service.name}</Text>
                                <Pressable onPress={() => handleServiceChange(serviceId)} className="ml-2">
                                    <Ionicons name="close-circle" size={18} color="red" />
                                </Pressable>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Description */}
                <Text>Description</Text>
                <TextInput
                    placeholder="Enter Description"
                    onChangeText={(text) => setValue("description", text)}
                    value={getValues("description")}
                    multiline
                />
                {errors.description && <Text>{errors.description.message}</Text>}
            </View>
        </ScrollView>
    );
};

export default Step1Form;
