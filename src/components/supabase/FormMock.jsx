import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AddMock } from "./AddMock";
import { GetMock } from "./GetMock";
import { deleteMock } from "./deleteMock";
import { UploadMock } from "./UploadMock";

function FormMock() {
  const fileRef = useRef();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: mocks = [] } = useQuery({
    queryKey: ["mock"],
    queryFn: GetMock,
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const files = Array.from(fileRef.current.files);

      if (files.length === 0) throw new Error("No images selected");
      if (files.length > 5) throw new Error("Max 5 images allowed");

      const images = await UploadMock(files);

      return AddMock({
        title,
        description,
        images,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mock"]);
      setTitle("");
      setDescription("");
      fileRef.current.value = "";
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, images }) => deleteMock(id, images),
    onSuccess: () => {
      queryClient.invalidateQueries(["mock"]);
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
            MOCK UP
          </p>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">
              ADD 5 IMAGES OR LESS
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="TITLE....."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-100 rounded-md p-2 mb-4"
              />

              <input
                type="text"
                placeholder="DESCRIPTION....."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-100 rounded-md p-2 mb-4"
              />

              <input
                multiple
                type="file"
                ref={fileRef}
                className="bg-gray-100 rounded-md p-2 mb-4"
              />

              <button
                type="submit"
                disabled={addMutation.isPending}
                className="bg-blue-600 text-white py-2 rounded-md"
              >
                {addMutation.isPending ? "UPLOADING..." : "ADD"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full px-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">

          {mocks.map((item) => (
            <div
              key={item.id}
              className="relative flex w-full max-w-sm flex-col rounded-xl bg-[#1a1a1a] text-gray-200 shadow-md border border-gray-800 mb-10"
            >
              <div className="relative mx-4 -mt-6 overflow-hidden rounded-xl shadow-lg bg-[#252525]">
                <div className="grid grid-cols-3 grid-rows-2 gap-1 h-44">
                  {item.image.slice(0, 5).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-full h-full object-cover rounded-md"
                      alt=""
                    />
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h5 className="mb-2 text-xl font-bold text-white">
                  {item.title}
                </h5>
                <p className="text-sm font-light text-gray-400 text-right rtl">
                  {item.description}
                </p>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() =>
                    deleteMutation.mutate({
                      id: item.id,
                      images: item.image,
                    })
                  }
                  className="w-full rounded-lg bg-red-600 py-3 text-xs font-bold uppercase text-white hover:scale-105 transition"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default FormMock;
