import { supabase } from "@/CreateClient";

export async function GetMock() {
  const { data, error } = await supabase
    .from("mockUp")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
