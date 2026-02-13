import { supabase } from "@/CreateClient";

export async function deleteMock(id, images) {
  const paths = images.map((url) => url.split("/images/")[1]);

  await supabase.storage
    .from("images")
    .remove(paths);

  const { error } = await supabase
    .from("mockUp")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
