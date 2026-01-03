import { motion } from "framer-motion";
import {Link} from "react-router-dom"

function DisplayProducts({ products, duration = 0.6, stagger = 0.1 }) {
  return (
    <div className="w-[90%] mx-auto flex flex-col gap-10">
      {products.map((product, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: duration / 1000,
            delay: index * (stagger / 1000),
            ease: "easeOut",
          }}
          className="">
<div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 p-5 bg-gradient-to-b from-[#121212] via-[#4A4A4A] to-[#252525] text-white border border-[#121212] rounded-lg">
        <div className="w-full md:w-48 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 gap-2 h-60 md:hidden">
            <img src={product.img1} className="object-cover w-full h-28 rounded-md"/>
            <img src={product.img3} className="object-cover w-full h-28 rounded-md"/>
            <img src={product.img2} className="col-span-2 object-cover w-full h-28 rounded-md"/>
          </div>
          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-60">
            <img src={product.img1} className="col-span-2 row-span-2 object-cover rounded-md"/>
            <img src={product.img2} className="object-cover rounded-md"/>
            <img src={product.img3} className="object-cover rounded-md"/>
          </div>
        </div>


            
        <div className="text-center md:text-center flex-1 lg:mt-10 md:mt-10">
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-sm md:text-base mt-2">{product.body}</p>
        </div>

        <div className="flex flex-col gap-5 justify-center items-center pr-5">
            <div className="flex justify-center items-center gap-12">
                <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px]">
                    <button className="group p-[4px] rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                    <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-3 py-2">
                        <div className="flex gap-2 items-center">
                        <span className="font-semibold text-white">{product.state}</span>
                        </div>
                    </div>
                    </button>
                </div>
            </div>
                
            <div className="flex items-center justify-center">
                <div className="relative group">
                    <Link to="/form"><button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                        <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1">Get</span>
                        <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
                        </svg>
                        </div>
                    </span>
                    </button></Link>
                </div>
            </div>
        </div>
</div>
        </motion.div>
      ))}
    </div>
  );
}

export default DisplayProducts;