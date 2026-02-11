import { supabase } from "@/CreateClient";

export async function deleteMaterial(id) {
  const { error } = await supabase
    .from("materials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting material:", error);
    throw error;
  }

  return true;
}
