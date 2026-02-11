import { supabase } from "@/CreateClient";

export async function AddMaterial(material) {
  const { data, error } = await supabase
    .from("materials")
    .insert([{ material }])
    .select();

  if (error) {
    console.error("Error adding material:", error);
    throw error;
  }

  return data;
}
