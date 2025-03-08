import { checkUploadLimit, uploadFile } from "@/utils/uploadHelpers";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { PhotoPreview } from "./PhotoPreview";
import { useToastStore } from "@/store/useToastStore";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../ui/button";
import { Colors } from "@/utils/Constants";
import { Text } from "../ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useServiceFormStore";

interface PhotoUploadProps {
  onPhotosChange: (photos: string[]) => void;
}

export function PhotoUpload({ onPhotosChange }: PhotoUploadProps) {
  const { salesFormData } = useFormStore(); 
  const user = useAuthStore((state) => state?.user)
  const [photos, setPhotos] = useState<string[]>(salesFormData?.photos || []);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToastStore();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "We need access to your photos to upload images.");
      }
    })();
  }, []);

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 3 - photos.length,
      });

      if (result.canceled || !result.assets) return;

      if (checkUploadLimit(photos, result.assets.length)) {
        showToast("error", "Erreur", "Maximum 3 photos autorisées");
        return;
      }

      if (!user) {
        showToast("error", "Erreur", "Vous devez être connecté pour uploader des photos");
        return;
      }

      setUploading(true);
      const uploadedPhotos: string[] = [...photos];

      for (const file of result.assets) {
        if (!file.uri) continue;
        try {
          const filename = file.fileName ?? `image_${Date.now()}.jpg`;
          const publicUrl = await uploadFile(file);
          if (publicUrl) uploadedPhotos.push(publicUrl);
        } catch (error: any) {
          console.log(error.message);
          showToast("error", "Erreur", `Erreur lors de l'upload: ${error.message}`);
        }
      }

      setPhotos(uploadedPhotos);
      onPhotosChange(uploadedPhotos);
    } catch (error) {
      console.log(error);
      console.error("Error selecting image:", error);
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onPhotosChange(newPhotos);
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <PhotoPreview photos={photos} onRemove={removePhoto} />
      {photos.length < 3 && (
        <Button variant="outline" onPress={handleSelectImage} disabled={uploading} className="flex-row">
          {uploading ? <ActivityIndicator color={Colors?.primary} /> : <Ionicons name="cloud-upload-outline" size={20} color={Colors.primary} />}
          <Text className="text-primary" style={{ marginLeft: 8 }}>
            {uploading ? "Upload en cours..." : "Ajouter des photos"}
          </Text>
        </Button>
      )}
    </View>
  );
}
