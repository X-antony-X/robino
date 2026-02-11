import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import {useState } from "react"
import { FaWhatsapp } from "react-icons/fa";
import { AddUser } from "@/components/supabase/AddUser";
import { useMutation } from "@tanstack/react-query";

function Footer() {
const [name, setName] = useState("");
const [phone, setPhone] = useState("");

const addMutation = useMutation({
  mutationFn: AddUser,
  onSuccess: () => {
    setName("");
    setPhone("");
    alert("تم الإرسال بنجاح ✅");
  },
  onError: (error) => {
    alert(error.message);
  },
});

    return (
        <footer className="mt-30 border-t-7 border-[gray] py-10 px-5 flex flex-wrap justify-evenly items-center gap-10 bg-gradient-to-b from-[#121212] via-[#121212] to-[#252525] text-white">
            <div className="flex flex-col justify-start">
                <p className="nice-font text-[40px] mb-8">ROBINO</p>
                <p className="nice-font text-[25px] mb-2">EGYPT</p>
                <p className="nice-font text-[25px] mb-2">ISMAILIA</p>
                <p className="nice-font text-[25px] mb-2">contact : +20 10 99018767</p>
                <p className="nice-font text-[25px] mb-2">email : afhmed13@gmail.com</p>
            </div>

            <div className="flex flex-col justify-start items-center gap-6">
                <p className="nice-font text-[40px]">CONTACT US</p>

                <div className="flex items-center justify-center">
                    <div className="relative">
                        <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder=" "
                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"/>
                        <label className="absolute left-0 top-1 cursor-text transition-all text-gray-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-700">
                            NAME
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div className="relative">
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder=" " className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"/>
                        <label className="absolute left-0 top-1 cursor-text transition-all text-gray-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-700">PHONE NUMBER</label>
                    </div>
                </div>

                <button
                disabled={addMutation.isLoading}
                onClick={() => {
                    if (!name || !phone) {
                    alert("من فضلك املى الاسم ورقم الموبايل");
                    return;
                    }

                    addMutation.mutate({ name, phone });
                }}
                className="cursor-pointer relative px-10 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-black text-white transition-all"
                >
                <span className="relative text-xl font-semibold">
                    {addMutation.isLoading ? "SENDING..." : "SUBMIT"}
                </span>
                </button>
            </div>

            <div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <a target="_blank" href="https://www.instagram.com/robino.uniform?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className=" cursor-pointer w-[90px] h-[90px] outline-none border-none bg-white rounded-[90px_5px_5px_5px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 active:scale-110 focus-visible:scale-110 hover:bg-[#cc39a4] active:bg-[#cc39a4] focus-visible:bg-[#cc39a4] group flex items-center justify-center"><svg className=" mt-6 ml-5 fill-[#cc39a4] group-hover:fill-white group-active:fill-white group-focus-visible:fill-white transition-colors" height={30} width={30} viewBox="0,0,256,256" xmlns="http://www.w3.org/2000/svg"><g stroke="none"><g transform="scale(8,8)"><path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" /></g></g></svg></a>
                        <a href="https://www.facebook.com/share/17ezZELBZe/" target="_blank" className=" cursor-pointer w-[90px] h-[90px] outline-none border-none bg-white rounded-[5px_90px_5px_5px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 active:scale-110 focus-visible:scale-110 hover:bg-[#03A9F4] active:bg-[#03A9F4] focus-visible:bg-[#03A9F4] group flex items-center justify-center"><FaFacebookF size={20} className=" mr-6 mt-6 text-[#03A9F4] group-hover:text-white group-active:text-white group-focus-visible:text-white transition-colors"/></a>
                    </div>
                    <div className="flex flex-row gap-2">
                        <a target="_blank" href="https://www.tiktok.com/@robino.uniform?is_from_webapp=1&sender_device=pc" className=" w-[90px] h-[90px] outline-none border-none bg-white rounded-[5px_5px_5px_90px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 active:scale-110 focus-visible:scale-110 hover:bg-black active:bg-black focus-visible:bg-black group flex items-center justify-center"> <FaTiktok size={20} className=" ml-6 mb-6 text-black group-hover:text-white group-active:text-white group-focus-visible:text-white transition-colors"/></a>
                        <a target="_blank" href="https://l.facebook.com/l.php?u=https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D%252B201099018767%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExM2VwWUV5OWxNZjc4ek9uOXNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR5qJUK9fStRWZJrdkY0MKqfPev01Oe9pZV8TSUm_7BGdaZjlDuelo8Yi48emg_aem_DmY8CPKkfp761vNz-21yLw&h=AT1QCqz1uZ0LnzdbqR3lQGz3uWJQJUjeWei3aIONfEjhHJeSqjusl4Sixqgz5nWO9D-s3IRdwbruubDj6b8sMJVJ-jEWmBoXYbK1TUEzsFPBwfWVXcGNyG4HiMp8Ba01ozNNWA" className=" cursor-pointer w-[90px] h-[90px] outline-none border-none bg-white rounded-[5px_5px_90px_5px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 active:scale-110 focus-visible:scale-110 hover:bg-[#25D366] active:bg-[#25D366] focus-visible:bg-[#25D366] group flex items-center justify-center"><FaWhatsapp size={21} className=" mr-6 mb-6 text-[#25D366] group-hover:text-white group-active:text-white group-focus-visible:text-white transition-colors"/></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
