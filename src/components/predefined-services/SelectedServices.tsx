import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SelectedService {
  name: string;
}

interface SelectedServicesProps {
  selectedServices: SelectedService[];
  onRemove: (serviceName: string) => void;
}

export function SelectedServices({ selectedServices, onRemove }: SelectedServicesProps) {
  if (selectedServices.length === 0) return null;

  return (
    <View className="flex flex-row flex-wrap gap-2 mt-2">
      {selectedServices.map((service) => (
        <View
          key={service.name}
          className="flex-row items-center bg-secondary border border-border/50 rounded-full px-3 py-1"
        >
          {/* Service Name */}
          <Text className="text-sm font-medium text-foreground mr-2">
            {service.name}
          </Text>

          {/* Remove Button */}
          <Pressable onPress={() => onRemove(service.name)} className="p-1 rounded-full">
            <Ionicons name="close-circle" size={16} color="red" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}
