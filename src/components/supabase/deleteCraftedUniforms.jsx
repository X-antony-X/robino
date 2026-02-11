import { supabase } from "@/CreateClient";

export async function deleteCraftedUniforms(id, imageUrl) {

  // استخراج اسم الملف من الرابط
  const filePath = imageUrl.split("/images/")[1];

  // مسح الصورة
  await supabase.storage
    .from("images")
    .remove([filePath]);

  // مسح الريكورد
  const { error } = await supabase
    .from("craftedUniforms")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
