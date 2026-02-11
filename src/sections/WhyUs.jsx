import React from 'react';

const WhyUs = () => {
  return (
<div className='flex flex-col items-center justify-center mt-25'>
    <div className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 group">
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full" />
        <span className="absolute bottom-0 left-0 h-full -ml-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-auto h-full opacity-100 object-stretch" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" /></svg></span>
        <span className="absolute top-0 right-0 w-12 h-full -mr-3"><svg xmlns="http://www.w3.org/2000/svg" className="object-cover w-full h-full" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" /></svg></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200" />
        <span className="relative text-[25px] font-semibold">WHY US</span>
    </div>
    <div className="max-w-[300px] rounded-[1.2rem] p-[1px] bg-gradient-to-br from-[#121212] via-[#121212] to-[#4A4A4A] shadow-[0_1rem_1.5rem_-0.9rem_#000000e1] mt-10">
      <div className="rounded-[1.2rem] p-6 text-[#FFFFFF] bg-gradient-to-br from-[#121212] via-[#4A4A4A] to-[#4A4A4A] text-center font-medium text-lg leading-7">
        Premium Quality Fabrics
        <br />
        <br />
        Designed for Your Business
        <br />
        <br />
        Comfortable Fit
        <br />
        <br />
        Trusted by Real Businesses
        <br />
        <br />
        Real clients, real results
      </div>
    </div>
</div>
  );
};

export default WhyUs
