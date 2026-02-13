import { supabase } from "@/CreateClient";

export async function AddReadyMade({ title, description, state, images, price }) {
  const { data, error } = await supabase
    .from("readyMade")
    .insert([
      {
        title,
        description,
        state,
        images,
        price,
      },
    ])
    .select();

  if (error) throw error;
  return data;
}