import { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import { goBack, navigate } from "@/utils/NavigationUtils";
import { ServiceFormWrapper } from "@/components/publication/service-form/ServiceFormWrapper";
import CustomSafeAreaView from "@/components/global/CustomSafeView";
import { useAuthStore } from "@/store/useAuthStore";
import { ServiceFormData } from "@/types/services";
import { PageHeader } from "@/components/layout/PageHeader";
import { useFetchService } from "@/hooks/publication/useFetchService";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";
import { StepHeader } from "@/components/publication/service-form/StepHeader";
import StepOne from "@/components/publication/service-form/wizard-form/StepOne";
import { Button } from "@/components/ui/button";
import { serviceFormSchema, ServiceFormSchema } from "@/models/ServiceFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/store/useServiceFormStore";
import StepTwo from "@/components/publication/service-form/wizard-form/StepTwo";
import StepThree from "@/components/publication/service-form/wizard-form/StepThree";
import StepFour from "@/components/publication/service-form/wizard-form/StepFour";
import StepFive from "@/components/publication/service-form/wizard-form/StepFive";
import { Colors } from "@/utils/Constants";


export default function AddService() {
    const { showToast } = useToastStore();
    const { serviceFormData: formData, setServiceFormData: setFormData, resetServiceForm: resetForm } = useFormStore();
    const route = useRoute();
    const [serviceId, setServiceId] = useState<string | null>(null);
    const { id } = route.params as { id?: string };

    const methods = useForm<ServiceFormSchema>({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: formData,
    });

    const { control, setValue, watch, reset, getValues, formState: { errors } } = methods;
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    // Fetch service data using the custom hook
    const { isLoading, error } = useFetchService(serviceId || null, reset);

    // Update form store as user fills inputs
    useEffect(() => {
        const subscription = watch((values) => {
            setFormData({
                ...values,
                services: values.services?.filter((item): item is string => !!item) || [],
                photos: values.photos?.filter((item): item is string => !!item) || [],
                availability: values.availability?.filter((item): item is string => !!item) || [],
                spoken_languages: values.spoken_languages?.filter((item): item is string => !!item) || [],
            });
        });

        return () => subscription.unsubscribe();
    }, [watch, setFormData]);

    const isStepValid = () => {
        const values = methods.getValues();
        switch (currentStep) {
            case 1:
                return Boolean(values.category && values.subcategory && values.services.length > 0 && values.description);
            case 2:
                return Boolean(values.service_area && values.spoken_languages.length > 0);
            case 3:
                return Boolean(values.billing_type && values.price && values.availability.length > 0);
            case 4:
            case 5:
                return true;
            default:
                return false;
        }
    };

    const onSubmit = (data: ServiceFormSchema) => {
        setFormData(data);
        console.log("Submitted Data:", data);
    };

    return (
        <CustomSafeAreaView>
            <PageHeader title={serviceId ? "Modifier l'annonce" : "Ajouter un service"} backUrl />
            {isLoading ? <ActivityIndicator size="large" color={Colors.primary} /> :
                <FlatList
                    ListHeaderComponent={
                        <View className="flex-1 px-4 py-6">
                            <StepHeader currentStep={currentStep} totalSteps={totalSteps} />
                            <View className="p-6 mb-20 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
                                <FormProvider {...methods}>
                                    <View className="animate-fade-in">
                                        {currentStep === 1 && <StepOne control={control} setValue={setValue} />}
                                        {currentStep === 2 && <StepTwo control={control} setValue={setValue} />}
                                        {currentStep === 3 && <StepThree control={control} setValue={setValue} watch={watch} />}
                                        {currentStep === 4 && <StepFour getValues={getValues} />}
                                        {currentStep === 5 && <StepFive getValues={getValues} reset={reset} />}
                                    </View>
                                    <View className="flex-row justify-between mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                                        {currentStep > 1 ? (
                                            <Button variant='outline' onPress={() => setCurrentStep(Math.max(currentStep - 1, 1))}>
                                                <Text className="text-gray-700 dark:text-gray-300 font-medium">Précédent</Text>
                                            </Button>
                                        ) : (
                                            <Button onPress={() => { goBack(); resetForm(); }} variant='outline'>
                                                <Text className="text-gray-700 dark:text-gray-300 font-medium">Retour</Text>
                                            </Button>
                                        )}
                                        {currentStep < 5 && (
                                            <Button
                                                onPress={() => isStepValid() && setCurrentStep(Math.min(currentStep + 1, totalSteps))}
                                                className={`ml-auto px-4 py-2 rounded-lg`}
                                                disabled={!isStepValid()}
                                            >
                                                <Text className='text-white font-medium'>Suivant</Text>
                                            </Button>
                                        )}
                                    </View>
                                </FormProvider>
                            </View>
                        </View>
                    }
                    data={[]} // Empty array since content is in ListHeaderComponent
                    renderItem={null} // No need to render anything else
                    keyboardShouldPersistTaps="handled"
                />}

        </CustomSafeAreaView>
    );
}
