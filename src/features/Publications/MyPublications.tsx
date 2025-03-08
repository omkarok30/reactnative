
import CustomSafeAreaView from "@/components/global/CustomSafeView";
import { PageHeader } from "@/components/layout/PageHeader";
import ServiceList from "@/components/publication/service-management/PublicationServiceList";
import { H4 } from "@/components/ui/typography"
import { useFormStore } from "@/store/useServiceFormStore";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

const MyPublications = () => {
    const { resetServiceform, resetSalesForm } = useFormStore((state) => ({ resetServiceform: state.resetServiceForm, resetSalesForm: state.resetSalesForm })); // Zustand reset function
    const { reset } = useFormContext(); // React Hook Form reset function
    useFocusEffect(
        useCallback(() => {
            reset(); // Reset form when the screen is focused
            resetServiceform(); resetSalesForm()
        }, [reset, resetServiceform, resetSalesForm])
    );

    return (
        <CustomSafeAreaView style={{ flex: 1 }}>
            <PageHeader title="Mes annonces de services" backUrl />
            <View className="mt-4 px-4 flex-1">
                <ServiceList />
            </View>
        </CustomSafeAreaView>
    )
}

export default MyPublications