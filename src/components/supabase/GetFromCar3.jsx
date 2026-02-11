import { supabase } from "@/CreateClient";

export async function getFromCar3() {
    const { data , error } = await supabase.from("carousel3").select("*")

    if (error) throw Error(error.message)

    return data
}