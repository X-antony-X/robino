import { supabase } from "@/CreateClient";

export async function deleteUser(id) {
  const { error } = await supabase
    .from("users_contacts")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
