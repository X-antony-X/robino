import { supabase } from "@/CreateClient";

export async function uploadCar3Images(files) {
  if (!files || files.length === 0) return [];

  const uploadedUrls = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(`carousel3/${fileName}`, file);

    if (error) {
      console.error("Upload error:", error.message);
      throw error;
    }

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`carousel3/${fileName}`);

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}
