import { supabase } from "@/CreateClient";

export async function deleteReadyMade(id) {
  const { data: item, error: fetchError } = await supabase
    .from("readyMade")
    .select("images")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  if (item?.images?.length) {
    const paths = item.images.map((url) => {
      const parts = url.split("/images/");
      return parts[1];
    });

    const { error: storageError } = await supabase.storage
      .from("images")
      .remove(paths);

    if (storageError) throw storageError;
  }

  const { error: deleteError } = await supabase
    .from("readyMade")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  return true;
}
