import { supabase } from "@/CreateClient";
import { uploadImage } from "./uploadImage";

export async function updateProfile(id, updatedData, newImageFile) {
  // 1. نجهز البيانات التي سيتم تحديثها (الكتابة فقط في البداية)
  const updates = {
    cv: updatedData.cv,
  };

  // 2. إذا كان هناك ملف صورة جديد، نقوم برفعه وإضافته للملف المراد تحديثه
  if (newImageFile) {
    const imageUrl = await uploadImage(newImageFile);
    updates.img = imageUrl;
  } 
  // ملاحظة: إذا لم يوجد ملف جديد، لن نضيف حقل "img" إلى كائن "updates" 
  // وبالتالي لن يلمس Supabase الصورة القديمة المخزنة.

  const { data, error } = await supabase
    .from("profile")
    .update(updates) // نرسل كائن التحديثات الجاهز
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}