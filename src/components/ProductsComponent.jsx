import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery.jsx";
import DisplayProducts from "./DisplayProducts.jsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Link } from "react-router-dom";
import { GetMock } from "./supabase/GetMock.jsx";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/loaders/Loader.jsx";

function ProductsComponent({ selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const [currentSlides, setCurrentSlides] = useState([]);

  const handleOpenLightbox = (card) => {
    setCurrentSlides(card.image.map((img) => ({ src: img })));
    setOpen(true);
  };

  const { 
    data: mocks = [], 
    isPending: mocksLoading, 
    isError: mocksError,
    refetch: refetchMocks 
  } = useQuery({
    queryKey: ["mock"],
    queryFn: GetMock,
    retry: true, 
    refetchOnWindowFocus: true,
  });

  const handleReconnect = () => {
    if (navigator.onLine) {
      refetchMocks();
    }
  };

  useEffect(() => {
    window.addEventListener("online", handleReconnect);
    return () => window.removeEventListener("online", handleReconnect);
  }, []);

  const LoadingOverlay = ({ error }) => (
    <div className="flex flex-col items-center justify-center py-20 gap-4 w-full">
      <Loader />
      {error && <p className="text-gray-400 animate-pulse">جاري محاولة إعادة الاتصال...</p>}
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      
      <div>
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
                className="relative flex flex-col gap-4 items-center justify-center px-4"
              >
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
                    <Link to="/form">
                      <button
                        onClick={() => setSelected("business")}
                        className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                      >
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                          <div className="relative z-10 flex items-center space-x-2">
                            <span className="transition-all duration-500 group-hover:translate-x-1">Get your custom order now</span>
                            <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                              <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
                            </svg>
                          </div>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="min-h-[400px] flex items-center justify-center px-6">
           {mocksLoading || mocksError ? (
              <LoadingOverlay error={mocksError} />
           ) : (
              <ImageGallery
                duration={800}
                stagger={100}
                easing="cubic-bezier(0.16, 1, 0.3, 1)"
              />
           )}
        </div>
      </div>

      <div className="relative overflow-hidden py-24 sm:py-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
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
                        <Link to="/form"><button onClick={() => setSelected("mock")} className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
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

      <div className="w-[90%] mx-auto py-10 min-h-[300px]">
        {mocksLoading || mocksError ? (
          <LoadingOverlay error={mocksError} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mocks.map((card, index) => (
              <div key={index} className="relative flex w-full max-w-sm mx-auto flex-col rounded-xl bg-[#1a1a1a] text-gray-200 shadow-md border border-gray-800 mb-10">
                <div className="relative mx-4 -mt-6 overflow-hidden rounded-xl shadow-lg bg-[#252525] cursor-pointer group" onClick={() => handleOpenLightbox(card)}>
                  <div className="grid grid-cols-3 grid-rows-2 gap-1 h-44 sm:h-48 transition-transform duration-300 group-hover:scale-105">
                    {card.image.slice(0, 5).map((img, i) => (
                      <img key={i} src={img} className="w-full h-full object-cover rounded-md" alt="" />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-bold text-white">{card.title}</h5>
                  <p className="text-sm font-light text-gray-400 text-right rtl">{card.description}</p>
                </div>
                <div className="p-6 pt-0">
                  <Link to="/form">
                    <button onClick={() => setSelected("mock")} className="w-full rounded-lg bg-white py-3 px-6 text-xs font-bold uppercase text-black hover:scale-105 transition-all">
                      اطلب تصميمك الآن
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox open={open} close={() => setOpen(false)} slides={currentSlides} plugins={[Zoom]} />

      <div className="mt-30 flex flex-col items-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-15">
                ROBINO PRODUCTS
              </h1>

        <div className="w-full min-h-[400px] flex items-center justify-center">
            {mocksLoading || mocksError ? (
                <LoadingOverlay error={mocksError} />
            ) : (
                <DisplayProducts
                    duration={800}
                    stagger={100}
                    easing="cubic-bezier(0.16, 1, 0.3, 1)"
                    setSelected={setSelected}
                />
            )}
        </div>
      </div>
    </div>
  );
}

export default ProductsComponent;