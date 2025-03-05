import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { ServiceFormData } from '@/types/services';
import StepOne from './wizard-form/StepOne';
import StepTwo from './wizard-form/StepTwo';
import StepThree from './wizard-form/StepThree';
import StepFour from './wizard-form/StepFour';
import StepFive from './wizard-form/StepFive';
import { StepHeader } from './StepHeader';
import { Button } from '@/components/ui/button';

interface ServiceFormWrapperProps {
    form: UseFormReturn<ServiceFormData>;
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
    onBackButton: () => void;
    onReset: () => void;
    isStepValid: () => boolean;
}

export function ServiceFormWrapper({
    form,
    currentStep,
    totalSteps,
    onPrevious,
    onNext,
    onBackButton,
    onReset,
    isStepValid,
}: ServiceFormWrapperProps) {
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepOne form={form} />;
            // case 2:
            //     return <StepTwo form={form} />;
            // case 3:
            //     return <StepThree form={form} />;
            // case 4:
            //     return <StepFour form={form} />;
            // case 5:
            //     return <StepFive form={form} onReset={onReset} />;
            default:
                return null;
        }
    };

    return (
        <View className="flex-1 px-4 py-6">
            <StepHeader currentStep={currentStep} totalSteps={totalSteps} />
            <View className="p-6 mb-20 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
                <FormProvider {...form}>
                    <View className="animate-fade-in">{renderStep()}</View>
                    <View className="flex-row justify-between mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                        {currentStep > 1 ? (
                            <Button variant='outline' onPress={onPrevious}>
                                <Text className="text-gray-700 dark:text-gray-300 font-medium">Précédent</Text>
                            </Button>
                        ) : (
                            <Button onPress={onBackButton} variant='outline'>
                                <Text className="text-gray-700 dark:text-gray-300 font-medium">Retour</Text>
                            </Button>
                        )}
                        {currentStep < 5 && (
                            <Button
                                onPress={onNext}
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
    );
}
