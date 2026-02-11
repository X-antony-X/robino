import { supabase } from "@/CreateClient";

export async function deleteMock(id, images) {
  // استخراج paths من الـ URLs
  const paths = images.map((url) => url.split("/images/")[1]);

  // مسح الصور
  await supabase.storage
    .from("images")
    .remove(paths);

  // مسح الريكورد
  const { error } = await supabase
    .from("mockUp")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
