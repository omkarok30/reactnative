import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { View } from "react-native";



interface StepHeaderProps {
    currentStep: number;
    totalSteps: number;
}

export function StepHeader({ currentStep, totalSteps }: StepHeaderProps) {
    const progress = Math.round((currentStep / totalSteps) * 100);

    return (
        <View className="space-y-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700">
            <View className="flex-row items-center justify-between">
                <Text className="text-sm font-bold text-gray-400 dark:text-gray-400">
                    Étape {currentStep}/{totalSteps}
                </Text>
                <Text className="text-sm font-bold text-primary dark:text-blue-400">
                    {progress}%
                </Text>
            </View>
            <Progress value={progress} className="h-2 mt-3 bg-gray-200 dark:bg-gray-600" indicatorClassName="bg-primary" />
        </View>
    );
}
