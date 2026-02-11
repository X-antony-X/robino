import { supabase } from "@/CreateClient";

export async function deleteReadyMade(id) {
  // 1️⃣ هات الصور الأول
  const { data: item, error: fetchError } = await supabase
    .from("readyMade")
    .select("images")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  // 2️⃣ استخراج paths من الـ URLs
  if (item?.images?.length) {
    const paths = item.images.map((url) => {
      const parts = url.split("/images/");
      return parts[1]; // readyMade/filename.jpg
    });

    const { error: storageError } = await supabase.storage
      .from("images")
      .remove(paths);

    if (storageError) throw storageError;
  }

  // 3️⃣ مسح الصف
  const { error: deleteError } = await supabase
    .from("readyMade")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  return true;
}
