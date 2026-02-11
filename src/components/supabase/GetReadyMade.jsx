import { supabase } from "@/CreateClient";

export async function GetReadyMade() {
  const { data, error } = await supabase
    .from("readyMade")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
}
