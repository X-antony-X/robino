import * as React from 'react';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState , useEffect } from 'react';
import Toggle from '@/ui-verse/Toggle';
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetReadyMade } from "./supabase/GetReadyMade";
import { GetMaterial } from './supabase/GetMaterial';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: '#374151',
      color: '#f3f4f6',
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Form({selected, setSelected}) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [clientName, setClientName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const { state } = useLocation();

  const { data: readyItems = [] } = useQuery({
    queryKey: ["ready-made"],
    queryFn: GetReadyMade,
  });

  const { data: materials = [] } = useQuery({
    queryKey: ["materials"],
    queryFn: GetMaterial,
  });

  const handleItems = (e) => {
    e.preventDefault();

    const myNumber = "201099018767";
    const selectedMaterials = personName.length > 0 ? personName.join(' - ') : "لم يتم التحديد";

    const finalMessage = 
      `*طلب جديد من موقع روبينو* 👕%0A%0A` +
      `*الاسم:* ${clientName}%0A` +
      `*رقم التواصل:* ${number}%0A` +
      `*الطلب:* ${selectedMaterials}%0A` +
      `*التفاصيل:* ${message}%0A%0A`;

    const whatsappURL = `https://wa.me/${myNumber}?text=${finalMessage}`;
    window.open(whatsappURL, "_blank");

    // تصفير الفورم
    setClientName("");
    setNumber("");
    setAddress("");
    setMessage("");
    setPersonName([]);
  };
  const handleMock = (e) => {
    e.preventDefault();

    const myNumber = "201099018767";
    const selectedMaterials = personName.length > 0 ? personName.join(' - ') : "لم يتم التحديد";

    const finalMessage = 
      `*طلب جديد من موقع روبينو* 👕%0A%0A` +
      `*الاسم:* ${clientName}%0A` +
      `*رقم التواصل:* ${number}%0A` +
      `*الطلب:* ${selectedMaterials}%0A` +
      `*التفاصيل:* ${message}%0A%0A` +
      `_(ملاحظة: سأقوم بإرسال صور التصميم في الرسالة القادمة)_`;

    const whatsappURL = `https://wa.me/${myNumber}?text=${finalMessage}`;
    window.open(whatsappURL, "_blank");

    // تصفير الفورم
    setClientName("");
    setNumber("");
    setAddress("");
    setMessage("");
    setPersonName([]);
  };
  const handleBusiness = (e) => {
    e.preventDefault();

    const myNumber = "201099018767";
    const selectedMaterials = personName.length > 0 ? personName.join(' - ') : "لم يتم التحديد";

    const finalMessage = 
      `*طلب جديد من موقع روبينو* 👕%0A%0A` +
      `*الاسم:* ${clientName}%0A` +
      `*رقم التواصل:* ${number}%0A` +
      `*العنوان:* ${address}%0A` +
      `*الخامات:* ${selectedMaterials}%0A` +
      `*التفاصيل:* ${message}%0A%0A` +
      `_(ملاحظة: سأقوم بإرسال صور التصميم في الرسالة القادمة)_`;

    const whatsappURL = `https://wa.me/${myNumber}?text=${finalMessage}`;
    window.open(whatsappURL, "_blank");

    // تصفير الفورم
    setClientName("");
    setNumber("");
    setAddress("");
    setMessage("");
    setPersonName([]);
  };

  const handleChange = (event) => {
    const { target: { value } } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

useEffect(() => {
  if (state?.item) {
    setPersonName([state.item]);
  }
}, [state]);

  return (
    <ThemeProvider theme={darkTheme}>

      <div className="flex flex-col items-center justify-center min-h-screen mt-30">
      <Toggle setSelected={setSelected} selected={selected} />
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          {selected === "items" && (<>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Available Items Order</h2>
          <h3 className="text-sm font-bold text-gray-200 mb-6 text-center">تقدر من هنا تطلب اي منتج من منتجات روبينو المتاحه</h3>
          <form className="flex flex-col" onSubmit={handleItems}>
            <input 
                placeholder="Customer Name" 
                className="placeholder:text-center bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right" 
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
            />
            
            <input 
                placeholder="Phone Number (WhatsApp)" 
                className="placeholder:text-center bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right" 
                type="tel"
                required 
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel sx={{ color: '#9ca3af' }}>
                Available Items
              </InputLabel>

              <Select
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Available Items" />}
                MenuProps={MenuProps}
                sx={{ backgroundColor: '#374151', color: 'white', textAlign: 'right' }}
              >
                {readyItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.title}
                    style={getStyles(item.title, personName, theme)}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            <textarea 
                placeholder="Notes (Optional)" 
                className="placeholder:text-center max-h-[300px] min-h-[100px] bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right h-32" 
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />

            <button 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] text-white font-bold py-3 px-4 rounded-md mt-2 transition duration-150"
              type="submit"
            >
              إرسال الطلب عبر واتساب
            </button>
          </form></>)}
          {selected === "mock" && (<>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Design Preview Request</h2>
          <h3 className="text-sm font-bold text-gray-200 mb-6 text-center">تقدر من هنا تطلب تصميم خاص بيك انت تقدر تختار فيه اللون و الخامه و اي صوره انت حابب تطبعها عليه</h3>

          <form className="flex flex-col" onSubmit={handleMock}>
            <input 
                placeholder="Client Name" 
                className="placeholder:text-center bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right" 
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
            />
            
            <input 
                placeholder="Phone Number (WhatsApp)" 
                className="placeholder:text-center bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right" 
                type="tel"
                required 
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />

            <textarea 
                placeholder="Notes (اوصف التصميم اللي انت عايزه)" 
                className="placeholder:text-center max-h-[300px] min-h-[100px] bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right h-32" 
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />

            {/* صندوق تنبيه للعميل بخصوص الصور */}
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-md p-4 mb-4 text-right">
              <p className="text-blue-200 text-sm leading-relaxed">
                 ملحوظة: <b>ممكن تبعت اللوجو او التصميم اللي انت عايز تطبعه </b>مباشرة في شات الواتساب بعد الضغط على زرار الإرسال بالأسفل 
              </p>
            </div>

            <button 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] text-white font-bold py-3 px-4 rounded-md mt-2 transition duration-150"
              type="submit"
            >
              إرسال الطلب عبر واتساب
            </button>
          </form></>)}
          {selected === "business" && (<>
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Business Order</h2>
          <h3 className="text-sm font-bold text-gray-200 mb-6 text-center">تقدر من هنا تطلب طلب تجاري لمشروعك من روبينو</h3>
          <form className="flex flex-col" onSubmit={handleBusiness}>
            <input 
                placeholder="Business owner name" 
                className="placeholder:text-center bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right" 
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
            />
            
            <input 
                placeholder="Phone Number (WhatsApp)" 
                className="placeholder:text-center bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right" 
                type="tel"
                required 
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />

            <input 
                placeholder="Business Address" 
                className="placeholder:text-center bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right" 
                type="text"
                required 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel sx={{ color: '#9ca3af' }}>Material</InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Material" />}
                MenuProps={MenuProps}
                sx={{ backgroundColor: '#374151', color: 'white' }}
              >
              {materials.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.material}
                  style={getStyles(item.material, personName, theme)}
                >
                  {item.material}
                </MenuItem>
              ))}
              </Select>
            </FormControl>

            <textarea 
                placeholder="Additional Details (Colors, Quantity, Sizes, Quantity.)" 
                className="max-h-[300px] min-h-[100px] bg-gray-700 text-gray-200 border-0 rounded-md p-3 mb-4 outline-none text-right h-32" 
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />

            {/* صندوق تنبيه للعميل بخصوص الصور */}
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-md p-4 mb-4 text-right">
              <p className="text-blue-200 text-sm leading-relaxed">
                💡 ملحوظة: <b>يمكنك إرسال صور التصميم أو اللوجو الخاص بك </b>مباشرة في محادثة الواتساب بعد الضغط على زر الإرسال بالأسفل 
              </p>
            </div>

            <button 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] text-white font-bold py-3 px-4 rounded-md mt-2 transition duration-150"
              type="submit"
            >
              إرسال الطلب عبر واتساب
            </button>
          </form></>)}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Form;