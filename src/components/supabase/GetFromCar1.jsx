import { supabase } from "@/CreateClient";

export async function getFromCar1() {
    const { data , error } = await supabase.from("carousel1").select("*")

    if (error) throw Error(error.message)

    return data
}