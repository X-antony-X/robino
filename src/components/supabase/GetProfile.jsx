import { supabase } from "@/CreateClient";

export async function GetProfile() {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
