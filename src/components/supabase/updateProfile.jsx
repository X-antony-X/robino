import { supabase } from "@/CreateClient";
import { uploadImage } from "./uploadImage";

export async function updateProfile(id, updatedData, newImageFile) {
  let imageUrl = updatedData.img || "";

  if (newImageFile) {
    imageUrl = await uploadImage(newImageFile);
  }

  const { data, error } = await supabase
    .from("profile")
    .update({
      img: imageUrl,
      cv: updatedData.cv,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
