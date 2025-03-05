import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/utils/Constants";

interface ChooseTypeViewProps {
    onServiceClick: () => void;
    onSaleClick: () => void;
    onBackClick: () => void;
}

export function ChooseTypeView({ onServiceClick, onSaleClick, onBackClick }: ChooseTypeViewProps) {
    return (
        <View className="flex flex-col gap-4">
            <TouchableOpacity
                onPress={onServiceClick}
                className="w-full flex-row items-center justify-center gap-2 bg-background/50 border border-border h-12 rounded-lg"
            >
                <MaterialCommunityIcons name="hammer-wrench" size={24} color={Colors.primary} />
                <Text className="text-foreground font-semibold">Proposer un service</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onSaleClick}
                className="w-full flex-row items-center justify-center gap-2 bg-background/50 border border-border h-12 rounded-lg"
            >
                <MaterialCommunityIcons name="shopping" size={24} color={Colors.primary} />
                <Text className="text-foreground font-semibold">Publier une vente</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onBackClick}
                className="w-full flex-row items-center justify-center gap-2 bg-background/50 border border-border h-12 rounded-lg"
            >
                <MaterialCommunityIcons name="arrow-left-thin" size={24} color={Colors.primary} />
                <Text className="text-foreground font-semibold">Retour</Text>
            </TouchableOpacity>
        </View>
    );
}
