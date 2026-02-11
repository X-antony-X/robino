import { supabase } from "@/CreateClient"

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}
