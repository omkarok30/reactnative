import { supabase } from "@/integrations/supabase/client";
import { ImagePickerAsset } from "expo-image-picker";
import { decode } from 'base64-arraybuffer';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid"

export const checkUploadLimit = (currentPhotos: string[], newFilesCount: number) => {
  return currentPhotos.length + newFilesCount > 3;
};


export const uploadFile = async (file: ImagePickerAsset) => {
  const uuId = uuidv4();
  const fileExt = file?.fileName?.split('.').pop()?.toLowerCase() || "jpg";
  const fileName = `${uuId}.${fileExt}`;
  const filePath = `${fileName}`;
 
  // Convert ImagePickerAsset to Blob
  const blob = decode(file.uri)

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from("service_photos")
    .upload(filePath, blob, {
      upsert: false,
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  if (data) {
    console.log("File uploaded successfully:", data);
    const { data: { publicUrl } } = supabase.storage
      .from('service_photos')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  return null;
};