import { Subcategory } from "@/types/database";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import { SelectedServices } from "../predefined-services/SelectedServices";
import { AnnonceList } from "../predefined-services/AnnonceList";
import { usePredefinedServices } from "../predefined-services/usePredefinedServices";
import { useSelectedServices } from "../predefined-services/useSelectedServices";
import { View } from "react-native";
import { UseFormSetValue } from "react-hook-form";
import { ServiceFormData } from "@/types/services";

interface PredefinedServicesSelectorProps {
    selectedSubcategory: Subcategory | null;
    value: string[];
    onChange: (value: string[]) => void;
    setValue?: UseFormSetValue<ServiceFormData>
}

export function PredefinedServicesSelector({
    selectedSubcategory,
    value,
    onChange, setValue
}: PredefinedServicesSelectorProps) {
    const services = usePredefinedServices(selectedSubcategory);
    const selectedServicesData = useSelectedServices(services, value);

    const handleSelect = (option: { value: string }) => {
        console.log("option", option);
        const selectedServiceName = option.value;
        const updatedServices = value.includes(selectedServiceName)
            ? value.filter(name => name !== selectedServiceName)
            : [...value, selectedServiceName];

        setValue?.("services", updatedServices, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });

        onChange(updatedServices);
        console.log("Selected services:", updatedServices);
    };

    const removeService = (serviceName: string) => {
        const updatedServices = value.filter(name => name !== serviceName);
        setValue?.("services", updatedServices, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
        onChange(updatedServices);
    };

    if (!selectedSubcategory) return null;

    return (
        <View className="space-y-4">
            <Select
                // value={value.length > 0 ? { value: value[0], label: value[0] } : undefined}
                onValueChange={(option) => {
                    if (option?.value) {
                        handleSelect(option);
                    }
                }}
            >
                <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Sélectionnez vos services" />
                </SelectTrigger>
                <AnnonceList services={services} selectedServices={value} />
            </Select>



            <SelectedServices
                selectedServices={selectedServicesData}
                onRemove={removeService}
            />
        </View>
    );
}
