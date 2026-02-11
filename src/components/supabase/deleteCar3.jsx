import { supabase } from "@/CreateClient";

export async function deleteCar3() {
  const { data, error: fetchError } = await supabase
    .from("carousel3")
    .select("images");

  if (fetchError) throw fetchError;

  const filesToDelete = data
    .flatMap(row => row.images || [])
    .map(url => {
      const parts = url.split("/images/");
      return parts[1];
    });

  if (filesToDelete.length > 0) {
    const { error: storageError } = await supabase
      .storage
      .from("images")
      .remove(filesToDelete);

    if (storageError) throw storageError;
  }

  const { error: deleteError } = await supabase
    .from("carousel3")
    .delete()
    .neq("id", 0);

  if (deleteError) throw deleteError;

  return true;
}
