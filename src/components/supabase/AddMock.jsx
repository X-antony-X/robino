import { supabase } from "@/CreateClient";

export async function AddMock({ title, description, images }) {
  const { data, error } = await supabase
    .from("mockUp")
    .insert([
      {
        title,
        description,
        image: images, // array
      },
    ])
    .select();

  if (error) throw error;
  return data;
}
