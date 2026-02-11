import { supabase } from "@/CreateClient";

export async function updateReadyMade(id, data) {
  const { data: updated, error } = await supabase
    .from("readyMade")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return updated;
}
