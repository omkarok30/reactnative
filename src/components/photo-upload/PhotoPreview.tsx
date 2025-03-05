import { View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface PhotoPreviewProps {
  photos: string[];
  onRemove: (index: number) => void;
}

export function PhotoPreview({ photos, onRemove }: PhotoPreviewProps) {
  if (photos.length === 0) return null;

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      {photos.map((photo, index) => (
        <View key={index} style={{ position: "relative" }}>
          <Image
            source={{ uri: photo }}
            style={{
              width: 96, // 24 * 4 (to match w-24 in Tailwind)
              height: 96, // 24 * 4
              borderRadius: 12, // rounded-lg equivalent
              objectFit: "cover",
            }}
          />
          <TouchableOpacity
            onPress={() => onRemove(index)}
            style={{
              position: "absolute",
              top: -8, // Similar to -top-2
              right: -8, // Similar to -right-2
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              borderRadius: 999, // Full circle
              padding: 4,
            }}
          >
            <Ionicons name="close-circle" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
