import { supabase } from "@/CreateClient";

export async function AddUser({ name, phone }) {
  const { data, error } = await supabase
    .from("users_contacts")
    .insert([{ name, phone }]);

  if (error) {
    // رقم مكرر
    if (error.code === "23505") {
      throw new Error("رقم التليفون ده متسجل قبل كده");
    }
    throw error;
  }

  return data;
}
