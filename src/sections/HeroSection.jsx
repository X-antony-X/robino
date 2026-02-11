import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {Link} from "react-router-dom"

function HeroSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".title", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        clearProps: "all",
      });

      tl.from(".paragraph, .cta", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        clearProps: "all",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section flex flex-col lg:flex-row items-center min-h-[90vh] px-4 lg:px-16 justify-evenly">
      <div className="content flex flex-col gap-6 lg:gap-10 items-center justify-center w-full lg:w-1/2 text-center">

        <div className="title">
            <span className="btn"><i className="animation"></i>ROBINO<i className="animation"></i></span>
        </div >

        <div className="flex flex-col justify-center items-center gap-4">
          <p className="paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-center">
            Welcome to <span className="nice-font text-[#4A4A4A] text-bold">ROBINO</span>
          </p>
          <hr />
          <p className="paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-center">
            Style is more than what you wear
          </p>
          <p className="paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-center">
            it’s who you are.
          </p>
          <hr />
          <hr />
          <p className="paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-center">
            Custom Workwear & Uniforms for Cafés, Clinics & Restaurants
          </p>
        </div>

        <div>
          <Link to="/products" className=" cta flex justify-center gap-2 items-center mx-auto shadow-xl cursor-pointer text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group transition-all duration-300 hover:text-white active:text-white focus-visible:text-white before:absolute before:w-full before:aspect-square before:bg-black before:rounded-full before:-left-full before:top-1/2 before:-translate-y-1/2 before:transition-all before:duration-700 before:-z-10 hover:before:left-0 hover:before:scale-150 active:before:left-0 active:before:scale-150 focus-visible:before:left-0 focus-visible:before:scale-150">
            See Our Work<svg className="w-8 h-8 text-gray-800 ease-linear duration-300 rounded-full border border-gray-700 p-2 rotate-45 group-hover:rotate-90 group-active:rotate-90 group-focus-visible:rotate-90 group-hover:bg-gray-50 group-active:bg-gray-50 group-focus-visible:bg-gray-50 group-hover:border-none group-active:border-none group-focus-visible:border-none " viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg"><path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" className="fill-gray-800"/></svg>
          </Link>
        </div>
      </div>
        <img
          src="/logo.png"
          alt="logo"
          className="image w-[] sm:w-[200px] md:w-[200px] lg:w-[300px] h-auto"
        />
    </section>
  );
}

export default HeroSection;
