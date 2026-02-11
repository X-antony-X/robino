import { supabase } from "@/CreateClient";

export async function addToCar3({ title, images }) {
  const { data, error } = await supabase
    .from("carousel3")
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
