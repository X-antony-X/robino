import { supabase } from "@/CreateClient";

export const updateUser = async ({ id, name, phone }) => {
  const { data, error } = await supabase
    .from("users_contacts")
    .update({ name, phone })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
