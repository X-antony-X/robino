import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";

import { AddCraftedUniform } from "./AddCraftedUniform";
import { deleteCraftedUniforms } from "./deleteCraftedUniforms";
import { UploadCraftedImage } from "./UploadCraftedImage";
import { GetCrafted } from "./GetCrafted";

import Zoom from 'react-medium-image-zoom';

function FormCraftedUniforms() {
  const fileRef = useRef();
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const { data: crafted = [] } = useQuery({
    queryKey: ["crafted"],
    queryFn: GetCrafted,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const file = fileRef.current.files[0];
      if (!file) throw new Error("No file selected");

      const imageUrl = await UploadCraftedImage(file);

      return AddCraftedUniform({
        description,
        image: imageUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["crafted"]);
      setDescription("");
      fileRef.current.value = "";
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, image }) =>
      deleteCraftedUniforms(id, image),
    onSuccess: () => {
      queryClient.invalidateQueries(["crafted"]);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    addMutation.mutate();
  }

  return (
    <div className="w-full flex flex-col items-center">

      <div className="w-full flex justify-center">
        <div className="w-full max-w-md px-4 pt-10">

          <p className="mx-auto mb-8 w-fit px-6 py-3 font-semibold text-white rounded-full bg-slate-800">
            CRAFTED UNIFORMS
          </p>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">
              ADD IMAGES TO YOUR GALLERY
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="TITLE....."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-100 rounded-md p-2 mb-4"
              />

              <input
                type="file"
                ref={fileRef}
                className="bg-gray-100 rounded-md p-2 mb-4"
              />

              <button
                type="submit"
                disabled={addMutation.isPending}
                className="bg-blue-600 text-white py-2 rounded-md"
              >
                {addMutation.isPending ? "ADDING..." : "ADD"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">

          {crafted.map((item) => (
            <div key={item.id} className="w-60 bg-gray-50 p-3 flex flex-col gap-2">
                <Zoom>
                    <img
                        src={item.image}
                        alt={item.description}
                        className="h-48 w-full object-cover"
                    />
                </Zoom>
              <span className="font-bold">{item.description}</span>

              <button
                onClick={() =>
                  deleteMutation.mutate({
                    id: item.id,
                    image: item.image,
                  })
                }
                className="bg-red-600 text-white py-2"
              >
                DELETE
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default FormCraftedUniforms;
