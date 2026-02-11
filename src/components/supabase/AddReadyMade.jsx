import { supabase } from "@/CreateClient";

export async function AddReadyMade({ title, description, state, images, price }) {
  const { data, error } = await supabase
    .from("readyMade")
    .insert([
      {
        title,
        description,
        state,
        images,
        price,
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

                <label class="relative inline-flex items-center cursor-pointer">
                    <input class="sr-only peer" type="checkbox" />
                    <div class="peer rounded-full outline-none duration-100 after:duration-500 w-14 h-8 bg-blue-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 
                        after:content-['No'] after:absolute after:outline-none after:rounded-full 
                        after:h-6 after:w-6 after:bg-white after:top-1 after:left-1 
                        after:flex after:justify-center after:items-center after:text-sky-800 after:font-bold after:text-[10px]
                        peer-checked:after:translate-x-6 peer-checked:after:content-['Yes'] peer-checked:after:border-white">
                    </div>
                </label>