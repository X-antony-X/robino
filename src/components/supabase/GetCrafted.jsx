import { supabase } from "@/CreateClient";

export async function GetCrafted() {
  const { data, error } = await supabase
    .from("craftedUniforms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
