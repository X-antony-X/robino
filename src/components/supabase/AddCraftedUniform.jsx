import { supabase } from "@/CreateClient";

export async function AddCraftedUniform({ description, image }) {
  const { data, error } = await supabase
    .from("craftedUniforms")
    .insert([{ description, image }])
    .select();

  if (error) throw error;
  return data;
}
