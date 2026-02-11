import { supabase } from "@/CreateClient";
import { uploadImage } from "./uploadImage";

export async function AddProfile(profileData, imageFile) {
  let imageUrl = "";

  if (imageFile) {
    imageUrl = await uploadImage(imageFile);
  }

  const { data, error } = await supabase
    .from('profile')
    .insert([
      { 
        img: imageUrl, 
        cv: profileData.cv,
      }
    ]);

  if (error) throw error;
  return data;
}