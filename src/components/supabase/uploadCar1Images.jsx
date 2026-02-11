import { supabase } from "@/CreateClient";

export async function uploadCar1Images(files) {
  if (!files || files.length === 0) return [];

  const uploadedUrls = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(`carousel1/${fileName}`, file);

    if (error) {
      console.error("Upload error:", error.message);
      throw error;
    }

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`carousel1/${fileName}`);

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}
