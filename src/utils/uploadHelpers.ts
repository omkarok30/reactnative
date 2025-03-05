import { supabase } from "@/integrations/supabase/client";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid"

export const checkUploadLimit = (currentPhotos: string[], newFilesCount: number) => {
  return currentPhotos.length + newFilesCount > 3;
};

const getContentType = (ext: string) => {
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    pdf: "application/pdf",
    txt: "text/plain",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };

  return mimeTypes[ext] || "application/octet-stream"; // Default if unknown
};

export const uploadFile = async (file: File) => {
  const uuId = uuidv4();
  const fileExt = file.name.split('.').pop()?.toLowerCase() || "";
  const contentType = getContentType(fileExt) || "image/jpeg"; // Default to JPEG if unknown
  const fileName = `${uuId}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('service_photos')
    .upload(filePath, file, {
      contentType,
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