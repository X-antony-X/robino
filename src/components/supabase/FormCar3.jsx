import { useMutation , useQueryClient} from "@tanstack/react-query";
import { uploadCar3Images } from "./uploadCar3Images";
import { addToCar3 } from "./AddToCar3";
import { useState , useRef} from "react";
import { deleteCar3 } from "./deleteCar3";

function FormCar3() {
    const fileRef = useRef()
    const queryClient = useQueryClient()
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState([]);
    
    const mutation = useMutation({
        mutationFn: async () => {
            const imageUrls = await uploadCar3Images(files);
            return addToCar3({ title, images: imageUrls });
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey : ["carousel3"]})
            setTitle("")
            if (fileRef.current) {
                fileRef.current.value = ""
            }
        }
    });

    const deleteMutation = useMutation({
    mutationFn: deleteCar3, 
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["carousel3"] });
    },
    onError: (err) => {
        console.error("Delete Error:", err);
        alert("Error deleting carousel");
    },
    });

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-md px-4 pt-10">
                
                <p className="relative mx-auto mb-8 w-fit inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-50 bg-gradient-to-tr from-slate-900/30 via-slate-900/70 to-slate-900/30 ring-4 ring-slate-900/20 rounded-full overflow-hidden before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:w-[100px] before:h-[100px] before:rounded-full before:bg-gradient-to-b before:from-slate-50/10 before:blur-xl">
                CAROUSEL 3
                </p>

                <div className="w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ADD or DELETE
                </h2>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();}
                    } className="flex flex-col">

                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="TITLE....."
                    className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4
                        focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <input
                    multiple
                    type="file"
                    ref={fileRef}
                    onChange={(e) => setFiles([...e.target.files])}
                    className="bg-gray-100 text-gray-900 rounded-md p-2 mb-4
                        focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-gradient-to-r from-indigo-500 to-blue-500
                        text-white font-bold py-2 px-4 rounded-md mt-4
                        hover:from-indigo-600 hover:to-blue-600 transition">
                    {mutation.isPending ? "Uploading..." : "Apply"}
                    </button>
                    <button
                    type="button"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending}
                    className="bg-gradient-to-r from-red-500 to-red-500
                        text-white font-bold py-2 px-4 rounded-md mt-4
                        hover:from-red-600 hover:to-red-600 transition">
                    {deleteMutation.isPending ? "Deleteing..." : "Delete"}
                    </button>
                </form>
                </div>

            </div>
        </div>
    )
}

export default FormCar3