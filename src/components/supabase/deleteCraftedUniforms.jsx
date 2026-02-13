import { supabase } from "@/CreateClient";

export async function deleteCraftedUniforms(id, imageUrl) {

  const filePath = imageUrl.split("/images/")[1];

  await supabase.storage
    .from("images")
    .remove([filePath]);

  const { error } = await supabase
    .from("craftedUniforms")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
