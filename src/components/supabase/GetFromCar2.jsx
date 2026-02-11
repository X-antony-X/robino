import { supabase } from "@/CreateClient";

export async function GetFromCar2() {
    const { data , error } = await supabase.from("carousel2").select("*")

    if (error) throw Error(error.message)

    return data
}