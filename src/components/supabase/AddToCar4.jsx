import { supabase } from "@/CreateClient";

export async function addToCar4({ title, images }) {
  const { data, error } = await supabase
    .from("carousel4")
    .insert([
      {
        title,
        images
      }
    ])
    .select();

  if (error) {
    console.error("Insert error:", error.message);
    throw error;
  }

  return data;
}
