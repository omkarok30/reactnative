
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";
interface SelectedItem {
  name: string;
}

interface SelectedItemsProps {
  selectedItems: SelectedItem[];
  onRemove: (itemName: string) => void;
}

export function SelectedItems({ selectedItems, onRemove }: SelectedItemsProps) {
  if (selectedItems.length === 0) return null;

  return (
    <View className="flex flex-row flex-wrap gap-2 mt-2">
      {selectedItems.map((item) => (
        <View
          key={item.name}
          className="flex-row items-center bg-secondary border border-border/50 rounded-full px-3 py-1"
        >
          <Text className="text-sm font-medium text-foreground mr-2">
            {item.name}
          </Text>

          {/* Remove Button */}
          <Pressable onPress={() => onRemove(item.name)} className="p-1 rounded-full">
            <Ionicons name="close-circle" size={16} color="red" />
          </Pressable>
        </View>
      ))}
    </View>
  );
}