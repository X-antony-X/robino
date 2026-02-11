import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useQuery } from "@tanstack/react-query";
import { GetProfile } from "@/components/supabase/GetProfile";

function Portfolio(){
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: GetProfile,
  });

  if (isLoading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading profile</div>;
  }

    return (
<div className="
  flex flex-col gap-20 items-center
  lg:flex-row lg:justify-evenly
  mt-30
">


<div className="mb-15 group origin-bottom-right duration-500 rotate-0 -skew-x-12 -translate-x-6 translate-y-12 md:-rotate-12 md:skew-x-0 md:translate-x-0 md:translate-y-0 md:hover:rotate-0 md:hover:-skew-x-12 md:hover:-translate-x-6 md:hover:translate-y-12 active:-translate-x-10 active:translate-y-16">
  <div className=" relative w-64 h-36 rounded-2xl bg-zinc-800 text-gray-50 flex flex-col justify-center items-center gap-1 duration-500 before:absolute before:content-[''] before:rounded-2xl before:bg-neutral-700 before:w-64 before:h-32 before:top-0 before:-z-10 before:duration-500 before:-right-3 before:skew-x-12 md:before:right-3 md:before:-skew-x-12 md:group-hover:before:-right-3 md:group-hover:before:skew-x-12 group-active:before:-right-6">
    <span className="text-5xl font-bold uppercase">FATHY JR</span>
    <p className="text-amber-300 font-thin">- Robino uniform owner -</p>
  </div>
</div>





<div
  className="
    w-52
    px-5 py-6
    bg-[#2cb5a0]
    border-4 border-[#7cdacc]
    rounded-[20px]
    text-center text-white
    shadow-lg
    transition-all duration-300
    hover:-translate-y-2
  "
>
  <div className=" w-40 h-40 mx-auto relative rounded-full border-4 border-[#7cdacc] overflow-hidden">
  <Zoom>
  <img
    src={profile?.img}
    alt="Profile"
    className="
      w-full h-full 
      object-cover 
      scale-150 object-top
      transition-transform 
      duration-500 
      hover:scale-[1.8] translate-x-5
    "
  />
  </Zoom>
  </div>

  {/* البيانات */}
  <div className="mt-5">
    <p className="text-xl font-bold tracking-wide">Ahmed Fathy</p>
    <span className="block text-sm font-medium opacity-90 italic">
      Robino Owner
    </span>
  </div>

      {/* Divider */}
      <div className="w-full h-[2px] bg-[#7cdacc] my-5" />

      {/* Social Media */}
      <div className="flex justify-center gap-4">
        {[
        //   { name: "TikTok", viewBox: "0 0 512 512", path: "M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" },
        { name: "My Facebook", href:"https://www.facebook.com/ahmed.fathy.102010" ,viewBox: "0 0 512 512", path: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" },
        { name: "My Instagram", href:"https://www.instagram.com/fathy__jr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" ,viewBox: "0 0 448 512", path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" },
        //   { name: "LinkedIn", viewBox: "0 0 448 512", path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" },
        ].map((item, i) => (
          <a key={i} href={item.href} target="_blank" className="relative group">
            <svg
              viewBox={item.viewBox}
              className="w-[1.1rem] fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={item.path} />
            </svg>

            {/* Tooltip */}
            <span
              className="
                absolute left-1/2 bottom-0
                -translate-x-1/2 -translate-y-[90%]
                bg-[#262626]
                px-2 py-1
                rounded
                text-xs font-semibold
                opacity-0
                cursor-pointer
                transition-all duration-400
                group-hover:opacity-100
                group-hover:-translate-y-[130%]
                group-active:opacity-100
                group-active:-translate-y-[130%]
                group-active-visible:opacity-100
                group-active-visible:-translate-y-[130%]
                after:content-['']
                after:absolute
                after:left-1/2
                after:top-full
                after:-translate-x-1/2
                after:border-[10px]
                after:border-transparent
                after:border-t-[#262626]
              "
            >
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </div>











    <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
      <div className="absolute z-[1] rounded-xl inset-0.5 bg-[#323132] p-4 overflow-y-auto">
        <p className="text-white text-sm leading-relaxed whitespace-pre-line">
          {profile?.cv}
        </p>
      </div>
      <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2" />
    </div>




</div>
    )
}

export default Portfolio