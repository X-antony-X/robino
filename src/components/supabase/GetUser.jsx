import { supabase } from "@/CreateClient";

export async function GetUser() {
  const { data, error } = await supabase
    .from("users_contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
