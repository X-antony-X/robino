import React from 'react';
import GradientText from './react bits/GradientText';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from './CreateClient';

const AdminForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      alert("بيانات غلط")
      return
    }

    navigate("/adminPage")
  }

  return (
  <div className='p-10 bg-gradient-to-b from-[#252525] via-[#252525] to-[#121212] w-screen h-screen'>
    <GradientText colors={["#fff", "#4A4A4A", "#FFFFFF", "#4A4A4A", "#fff"]} animationSpeed={3} showBorder={false} className="custom-class font-bold text-3xl md:text-4xl lg:text-5xl">ROBINO ADMIN LOGIN</GradientText>
    <div className="w-64 h-80 bg-indigo-50 rounded shadow flex flex-col justify-between p-3 mx-auto my-20">
      <form className="text-[#4A4A4A]" action method="post" onSubmit={handleSubmit}>
        <fieldset className="border-4 border-dotted border-[#4A4A4A] p-5">
          <legend className="px-2 font-bold -mx-2 text-[#121212]">Welcome Ahmed !</legend>
          <label className="text-xs font-bold after:content-['*'] after:text-red-400 text-[#121212]" htmlFor="email">Mail </label>     
          <input value={data.email} onChange={(e) => setData({...data, email: e.target.value})} className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-[#4A4A4A]" type="email" required />   
          <label className="text-xs font-bold after:content-['*'] after:text-red-400 text-[#121212]" htmlFor="password">Password</label>
          <input value={data.password} onChange={(e) => setData({...data, password: e.target.value})} className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-[#4A4A4A]" type="password" required />
          <button type='submit' className="w-full rounded bg-[#4A4A4A] text-indigo-50 p-2 text-center font-bold cursor-pointer active:bg-[#121212] hover:bg-[#121212]">Log In</button>
        </fieldset>
      </form>
    </div>
  </div>
  );
}

export default AdminForm
