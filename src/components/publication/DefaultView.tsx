import { Colors } from "@/utils/Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";

interface DefaultViewProps {
    onListClick: () => void;
    onNewClick: () => void;
}

export function DefaultView({ onListClick, onNewClick }: DefaultViewProps) {
    return (
        <View className="flex flex-col gap-4">
            <TouchableOpacity
                onPress={onNewClick}
                className="w-full flex-row items-center justify-center gap-2 bg-background/50 border border-border h-12 rounded-lg"
            >
                <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
                <Text className="text-foreground font-semibold">Nouvelle annonce</Text>
            </TouchableOpacity>
        </View>
    );
}
