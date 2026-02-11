import { supabase } from "@/CreateClient";

export async function uploadReadyMadeImages(files) {
  const uploadedUrls = [];

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(`readyMade/${fileName}`, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(`readyMade/${fileName}`);

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}
