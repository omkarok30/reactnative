import { supabase } from "@/integrations/supabase/client";
import * as Random from "expo-random";

async function generateUUID() {
  const randomBytes = await Random.getRandomBytesAsync(16);
  return [...randomBytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}


export const checkUploadLimit = (currentPhotos: string[], newFilesCount: number) => {
  return currentPhotos.length + newFilesCount > 3;
};

export const uploadFile = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${generateUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  console.log("Uploading file:", filePath);
  
  const { data, error } = await supabase.storage
    .from('service_photos')
    .upload(filePath, file, {
      upsert: false
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