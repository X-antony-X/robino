import CarouselProductNo1 from "@/react-bits/CarouselProductNo1";
import CarouselProductNo2 from "@/react-bits/CarouselProductNo2";
import CarouselProductNo3 from "@/react-bits/CarouselProductNo3";
import CarouselProductNo4 from "@/react-bits/CarouselProductNo4";
import {Link} from "react-router-dom"

function Products() {
    return (
        <div className="flex flex-col items-center justify-center gap-20">
            <div className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 group">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full" />
                <span className="absolute bottom-0 left-0 h-full -ml-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-auto h-full opacity-100 object-stretch" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" /></svg></span>
                <span className="absolute top-0 right-0 w-12 h-full -mr-3"><svg xmlns="http://www.w3.org/2000/svg" className="object-cover w-full h-full" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" /></svg></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200" />
                <span className="relative text-[25px] font-semibold">PRODUCTS</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10">
                <CarouselProductNo1 />
                <CarouselProductNo2 />
                <CarouselProductNo3 />
                <CarouselProductNo4 />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10">
                <div>
                    <Link to="/products"><button className="cursor-pointer bg-gray-950 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md outline-none duration-300 group transition-all hover:brightness-150 hover:border-t-4 hover:border-b active:brightness-150 active:border-t-4 active:border-b focus-visible:brightness-150 focus-visible:border-t-4 focus-visible:border-b active:opacity-75">
                        <span className=" bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500 group-hover:top-[150%] group-active:top-[150%] group-focus-visible:top-[150%] shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"/>
                        VIEW ALL PRODUCTS
                    </button></Link>
                </div>
                <div>
                    <Link to="/form"><button className=" cursor-pointer bg-gray-950 text-gray-400 border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md outline-none duration-300 group transition-all hover:brightness-150 hover:border-t-4 hover:border-b active:brightness-150 active:border-t-4 active:border-b focus-visible:brightness-150 focus-visible:border-t-4 focus-visible:border-b active:opacity-75">
                        <span className=" bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500 group-hover:top-[150%] group-active:top-[150%] group-focus-visible:top-[150%] shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"/>
                        CUSTOM ORDER
                    </button></Link>
                </div>
            </div>
        </div>
    )
}

export default Products;