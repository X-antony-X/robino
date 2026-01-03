import React from "react";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery.jsx";
import DisplayProducts from "./DisplayProducts.jsx";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {Link} from "react-router-dom"

function ProductsComponent(){
const [open, setOpen] = useState(false);
const [currentSlides, setCurrentSlides] = useState([]);

const images = [
  {
    image: "/desvelo1.jpg",
    alt: "DESVELO CAFE UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/desvelo2.jpg",
    alt: "DESVELO CAFE UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/desvelo3.jpg",
    alt: "DESVELO CAFE UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/desvelo4.jpg",
    alt: "DESVELO CAFE UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/heaven1.jpg",
    alt: "PIZZA HEAVEN UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/heaven2.jpg",
    alt: "PIZZA HEAVEN UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/heaven3.jpg",
    alt: "PIZZA HEAVEN UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/heaven4.jpg",
    alt: "PIZZA HEAVEN UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/hassan.jpeg",
    alt: "CAFE HASSAN UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/koshari.jpeg",
    alt: "KOSHARI STREET UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/alfares.jpeg",
    alt: "ALFARES SEAFOOD UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/daffa.jpeg",
    alt: "AHL AL-DAFFA SUPERMARKET UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/omda.jpeg",
    alt: "EL-OMDA SUPERMARKET UNIFORM",
    width: "1200",
    height: "800",
  },
  {
    image: "/omda2.jpeg",
    alt: "EL-OMDA SUPERMARKET UNIFORM",
    width: "1200",
    height: "800",
  },
];

const products = [
  {
    img1 : "/coat4.jpeg",
    img2 : "/coat2.jpeg",
    img3 : "/coat1.jpeg",
    title : "MEDICAL COAT",
    body : "Stay comfortable during your longest lab hours",
    state : "Available",
  },
  // {
  //   img1 : "/today1.jpeg",
  //   img2 : "/today2.jpeg",
  //   img3 : "/today3.jpeg",
  //   title : "T-SHIRTS",
  //   body : "Express your style with our unique printed designs. High-quality prints that last and stand out",
  //   state : "Sold out",
  // },
  // {
  //   img1 : "/pants1.jpeg",
  //   img2 : "/pants2.jpeg",
  //   img3 : "",
  //   title : "PANTS",
  //   body : "The perfect blend of comfort and style. Durable fabrics designed for your daily move",
  //   state : "Sold out",
  // },
  // {
  //   img1 : "/basic1.jpeg",
  //   img2 : "/basic2.jpeg",
  //   img3 : "/basic3.jpeg",
  //   title : "BASICS",
  //   body : "Simple, clean, and versatile. The foundation of every great outfit, crafted with soft premium cotton",
  //   state : "Sold out",
  // },
]

const mockUp = [
  {
    img1 : "/mock1.jpeg",
    img2 : "/mock2.jpeg",
    img3 : "/mock3.jpeg",
    img4 : "/mock4.jpeg",
    img5 : "",
  },
]

const handleOpenLightbox = (card) => {
    const slides = [
      { src: card.img1 },
      { src: card.img2 },
      { src: card.img3 },
      { src: card.img4 },
      { src: card.img5 },
      { src: card.img6 },
    ];
    setCurrentSlides(slides);
    setOpen(true);
  };

    return (
<div className="flex flex-col gap-10">

    <div>
      {/* Header */}
      <div className="relative overflow-hidden py-24 sm:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Our Success Stories
              </h1>
              <p className="text-lg leading-8 text-muted-foreground">
                A showcase of custom uniforms we’ve crafted for leading shops. Quality fabrics meet professional branding.
              </p>
              <p className="text-lg leading-8 text-muted-foreground">
                Trusted by +10 shops at ismailia
              </p>
                <div className="flex items-center justify-center">
                    <div className="relative group">
                        <Link to="/form"><button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                            <div className="relative z-10 flex items-center space-x-2">
                            <span className="transition-all duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-focus-visible:translate-x-1">Get your custom order now</span>
                            <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
                            </svg>
                            </div>
                        </span>
                        </button></Link>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <ImageGallery
        duration={800}
        stagger={100}
        easing="cubic-bezier(0.16, 1, 0.3, 1)"
        images={images}
      />
    </div>






      <div className="relative overflow-hidden py-24 sm:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                MOCK UP
              </h1>
              <p className="text-lg leading-8 text-muted-foreground">
                الـ موك أب هو صورة احترافية بتوريك شكل تصميمك أو لوجو شركتك على التيشرت قبل ما نبدأ طباعة فعلياً. ده بيضمن لك إن النتيجة تطلع بالظبط زي ما رسمتها في خيالك وبأعلى دقة
              </p>
              <br />
              <p className="text-lg leading-8 text-muted-foreground">
             لما توافق على الموك أب ، بنضمن لك إن المنتج النهائي يكون نسخة طبق الأصل منه   
              </p>
              <br />
              <p className="text-lg leading-8 text-muted-foreground">
                بنستخدم موديلات رقمية بتخليك تحس بملمس القماش وشكل الألوان الحقيقي
              </p>
                <div className="flex items-center justify-center">
                    <div className="relative group">
                        <Link to="/form"><button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                            <div className="relative z-10 flex items-center space-x-2">
                            <span className="transition-all duration-500 group-hover:translate-x-1">MOCK UP order</span>
                            <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
                            </svg>
                            </div>
                        </span>
                        </button></Link>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>

<div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {mockUp.map((card, index) => (
        <div
          key={index}
          className="relative flex w-full max-w-sm mx-auto flex-col rounded-xl bg-[#1a1a1a] text-gray-200 shadow-md border border-gray-800 mb-10"
        >
          {/* الصور - ضفنا onClick هنا */}
          <div 
            className="relative mx-4 -mt-6 overflow-hidden rounded-xl shadow-lg bg-[#252525] cursor-pointer group"
            onClick={() => handleOpenLightbox(card)}
          >
            <div className="grid grid-cols-3 grid-rows-2 gap-1 h-44 sm:h-48 transition-transform duration-300 group-hover:scale-105">
              <img src={card.img1} className="col-span-1 row-span-1 w-full h-full object-cover rounded-md" alt="" />
              <img src={card.img2} className="col-span-1 row-span-1 w-full h-full object-cover rounded-md" alt="" />
              <img src={card.img3} className="col-span-1 row-span-1 w-full h-full object-cover rounded-md" alt="" />
              <img src={card.img4} className="col-span-1 row-span-1 w-full h-full object-cover rounded-md" alt="" />
              <img src={card.img5} className="col-span-1 row-span-1 w-full h-full object-cover rounded-md" alt="" />
              <p className="col-span-1 row-span-1 w-full h-full object-cover rounded-md text-center mt-2">Click <br />اضغط للعرض </p>
            </div>
            {/* طبقة شفافة تظهر عند التمرير (Hover) لتعطي إيحاء بالضغط */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white bg-black/50 p-2 rounded-full text-xs">عرض الصور</span>
            </div>
          </div>

          <div className="p-6">
            <h5 className="mb-2 text-xl font-bold text-white">CUSTOM DESIGN PRINT</h5>
            <p className="text-sm font-light text-gray-400 text-right rtl">
              حول فكرتك لواقع <br />
              بنطبع تصميمك الخاص على أجود خامات القطن بلمسة احترافية تدوم طويلاً
            </p>
          </div>

          <div className="p-6 pt-0">
            <Link to="/form"><button className="cursor-pointer w-full rounded-lg bg-white py-3 px-6 text-xs font-bold uppercase text-black shadow-md transition-all hover:scale-105 active:opacity-[0.85]">
              اطلب تصميمك الآن
            </button></Link>
          </div>
        </div>
      ))}

      {/* المكون المسئول عن عرض الصور فوق الصفحة */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={currentSlides}
        plugins={[Zoom]} // ضفنا بلجن الزووم عشان التجربة تبقى أحسن
      />
    </div>







    <div className="mt-40 m-auto relative w-[340px] inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 group">
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full" />
        <span className="absolute bottom-0 left-0 h-full -ml-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-auto h-full opacity-100 object-stretch" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" /></svg></span>
        <span className="absolute top-0 right-0 w-12 h-full -mr-3"><svg xmlns="http://www.w3.org/2000/svg" className="object-cover w-full h-full" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" /></svg></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200" />
        <span className="relative text-[25px] font-semibold">READY MADE PRODUCTS</span>
    </div>

    {/* ديف العرض */}
      <DisplayProducts
        duration={800}
        stagger={100}
        easing="cubic-bezier(0.16, 1, 0.3, 1)"
        products={products}
      />

</div>
)
}

export default ProductsComponent
