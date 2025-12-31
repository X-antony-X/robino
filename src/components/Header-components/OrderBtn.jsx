const OrderBtn = () => {
  return (
    <button className="relative rounded-full bg-[#121212] px-4 py-2 font-mono font-bold text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px] text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-center before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-[#121212] cursor-pointer">
      ORDER NOW
    </button>
  );
}

export default OrderBtn;