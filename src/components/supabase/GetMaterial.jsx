import { supabase } from "@/CreateClient";

export async function GetMaterial() {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }

  return data;
}
