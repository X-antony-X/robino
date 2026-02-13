import { useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { AddReadyMade } from "./AddReadyMade"
import { GetReadyMade } from "./GetReadyMade"
import { deleteReadyMade } from "./deleteReadyMade"
import { updateReadyMade } from "./updateReadyMade"
import { uploadReadyMadeImages } from "./uploadReadyMadeImages"

import Zoom from "react-medium-image-zoom"
function FormReadyMade() {
  const fileRef = useRef()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [available, setAvailable] = useState(false)
  const [editId, setEditId] = useState(null)

  const startEdit = (item) => {
    setEditId(item.id)
    setTitle(item.title)
    setDescription(item.description)
    setPrice(item.price)
    setAvailable(item.state)
    fileRef.current.value = ""
  }

  const cancelEdit = () => {
    setEditId(null)
    setTitle("")
    setDescription("")
    setPrice("")
    setAvailable(false)
    fileRef.current.value = ""
  }

  const { data: items = [] } = useQuery({
    queryKey: ["ready-made"],
    queryFn: GetReadyMade,
  })

  const addMutation = useMutation({
    mutationFn: async () => {
      const files = fileRef.current.files
      if (files.length !== 4) {
        throw new Error("You must upload exactly 4 images")
      }

      const images = await uploadReadyMadeImages(files)

      return AddReadyMade({
        title,
        description,
        price,
        available,
        images,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["ready-made"])
      setTitle("")
      setDescription("")
      setPrice("")
      setAvailable(false)
      fileRef.current.value = ""
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteReadyMade,
    onSuccess: () => {
      queryClient.invalidateQueries(["ready-made"])
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateReadyMade(id, data),
    onSuccess: () => queryClient.invalidateQueries(["readyMade"])
  })


  return (
    <div className="w-full flex flex-col items-center">

      <div className="w-full flex justify-center">
        <div className="w-full max-w-md px-4 pt-10">

          <p className="mx-auto mb-8 w-fit px-6 py-3 font-semibold text-white rounded-full bg-slate-800">
            READY MADE
          </p>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">
              ADD 4 IMAGES FOR EVERY PRODUCT
            </h2>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault()

                if (editId) {
                  updateMutation.mutate({
                    id: editId,
                    data: {
                      title,
                      description,
                      price,
                      state: available,
                    }
                  })
                  cancelEdit()
                } else {
                  addMutation.mutate()
                }
              }}
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="TITLE....."
                className="bg-gray-100 rounded-md p-2"
              />

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="DESCRIPTION....."
                className="bg-gray-100 rounded-md p-2"
              />

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="PRICE....."
                className="bg-gray-100 rounded-md p-2"
              />

              <div className="flex items-center justify-between">
                <span>Available ?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
                    <div className="peer rounded-full outline-none duration-100 after:duration-500 w-14 h-8 bg-blue-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 
                        after:content-['No'] after:absolute after:outline-none after:rounded-full 
                        after:h-6 after:w-6 after:bg-white after:top-1 after:left-1 
                        after:flex after:justify-center after:items-center after:text-sky-800 after:font-bold after:text-[10px]
                        peer-checked:after:translate-x-6 peer-checked:after:content-['Yes'] peer-checked:after:border-white">
                    </div>
                </label>
              </div>

              <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileRef}
                  onChange={(e) => {
                    if (e.target.files.length > 4) {
                      alert("مسموح بـ 4 صور فقط")
                      e.target.value = ""
                    }
                  }}
                className="bg-gray-100 rounded-md p-2"
              />

              <button
                type="submit"
                className={`py-2 rounded-md text-white ${editId ? "bg-yellow-500" : "bg-blue-600"}`}
              >
                {editId ? "UPDATE" : "ADD"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white py-2 rounded-md"
                >
                  CANCEL
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="w-full px-4 mt-12">
<div className="w-[90%] mx-auto flex flex-col gap-10">
  
  {items.map((item) => (<div key={item.id} className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-b from-[#121212] via-[#2a2a2a] to-[#1a1a1a] text-white border border-gray-800 rounded-2xl shadow-xl">
    
<div className="w-full md:w-48 rounded-lg overflow-hidden">

  <div className="grid grid-cols-2 gap-2 h-60 md:hidden">
    {item.images.slice(0, 4).map((img, i) => (
      <Zoom key={i}>
        <img
          src={img}
          className="object-cover w-full h-28 rounded-md"
          alt=""
        />
      </Zoom>
    ))}
  </div>

  <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-60">
    {item.images.slice(0, 4).map((img, i) => (
      <Zoom key={i}>
        <img
          src={img}
          className="object-cover w-full h-full rounded-md"
          alt=""
        />
      </Zoom>
    ))}
  </div>

</div>


    <div className="flex-1 text-center md:text-left space-y-1">
      <h3 className="text-xl font-bold tracking-tight text-yellow-500">{item.title}</h3>
      <p className="text-lg font-medium opacity-90">{item.price}</p>
      <p className="text-sm md:text-base text-gray-400 mt-2 leading-relaxed">
        {item.description}
      </p>
    </div>

    <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[140px] w-full md:w-auto">
      <button onClick={() => startEdit(item)} className="flex-1 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-black rounded-lg transition-colors shadow-lg uppercase">
        Update
      </button>
      
      <button onClick={() => deleteMutation.mutate(item.id)} className="flex-1 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg transition-colors shadow-lg uppercase">
        Delete
      </button>

      <div className="p-[1px] bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg shadow-inner">
        <div className="bg-[#1a1a1a] rounded-[7px] px-4 py-2 flex items-center justify-center gap-2">
          <span className="text-xs font-bold text-gray-300 tracking-wider uppercase">Status: {item.state ? "Available" : "Sold out"}</span>
        </div>
      </div>
    </div>

  </div>))}
</div>
      </div>
    </div>

















  )
}

export default FormReadyMade
