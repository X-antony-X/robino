import { supabase } from "@/CreateClient";

export async function getFromCar4() {
    const { data , error } = await supabase.from("carousel4").select("*")

    if (error) throw Error(error.message)

    return data
}