
import React, { useEffect, useState } from 'react'
import CustomSafeAreaView from '@/components/global/CustomSafeView'
import { PageHeader } from '@/components/layout/PageHeader'
import { FormProvider, useForm } from 'react-hook-form';
import { saleFormSchema, SalesFormSchema } from '@/models/SalesFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '@/store/useServiceFormStore';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { StepHeader } from '@/components/publication/service-form/StepHeader';
import SalesStepOne from '@/components/publication/sales-form/SalesStepOne';
import SalesStepTwo from '@/components/publication/sales-form/SalesStepTwo';
import SalesStepThree from '@/components/publication/sales-form/SalesStepThree';
import SalesStepFour from '@/components/publication/sales-form/SalesStepFour';
import SalesStepFive from '@/components/publication/sales-form/SalesStepFive';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { goBack } from '@/utils/NavigationUtils';

const AddSales = () => {
    const { salesFormData, setSalesFormData, resetSalesForm } = useFormStore();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const methods = useForm<SalesFormSchema>({
        resolver: zodResolver(saleFormSchema),
        defaultValues: salesFormData,
    });
    const { control, setValue, watch, reset, getValues, formState: { errors } } = methods;

    // Update form store as user fills inputs
    useEffect(() => {
        const subscription = watch((values) => {
            setSalesFormData({
                ...values,
                photos: values.photos?.filter((photo): photo is string => !!photo),
                items: values.items?.filter((item): item is string => !!item),
            });
        });

        return () => subscription.unsubscribe();
    }, [watch, setSalesFormData]);

    const isStepValid = () => {
        const values = methods.getValues();
        switch (currentStep) {
            case 1:
                return !!(values.title && values.category && values.subcategory && values.description);
            case 2:
                return values.photos.length > 0;
            case 3:
                return !!(values.price && values.condition);
            case 4:
                return !!values.location;
            default:
                return true;
        }
    };

    function handleReset() {
        reset();
        resetSalesForm();
    }

    return (
        <CustomSafeAreaView>
            <PageHeader title="Publier une annonce de vente" backUrl />

            <FlatList
                ListHeaderComponent={
                    <View className="flex-1 px-4 py-6">
                        <StepHeader currentStep={currentStep} totalSteps={totalSteps} />
                        <View className="p-6 mb-20 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
                            <FormProvider {...methods}>
                                <View className="animate-fade-in">
                                    {currentStep === 1 && <SalesStepOne control={control} setValue={setValue} errors={errors} />}
                                    {currentStep === 2 && <SalesStepTwo control={control} setValue={setValue} />}
                                    {currentStep === 3 && <SalesStepThree control={control} setValue={setValue} />}
                                    {currentStep === 4 && <SalesStepFour control={control} setValue={setValue} />}
                                    {currentStep === 5 && <SalesStepFive getValues={getValues} reset={handleReset} />}
                                </View>
                                <View className="flex-row justify-between mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                                    {currentStep > 1 ? (
                                        <Button variant='outline' onPress={() => setCurrentStep(Math.max(currentStep - 1, 1))}>
                                            <Text className="text-gray-700 dark:text-gray-300 font-medium">Précédent</Text>
                                        </Button>
                                    ) : (
                                        <Button onPress={() => { goBack(); resetSalesForm(); }} variant='outline'>
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
            />
        </CustomSafeAreaView>
    )
}

export default AddSales