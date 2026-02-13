import * as React from 'react';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
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
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

function Form({ selected, setSelected }) {
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
    const finalMessage = `*طلب جديد من موقع روبينو* 👕%0A%0A*الاسم:* ${clientName}%0A*رقم التواصل:* ${number}%0A*الطلب:* ${selectedMaterials}%0A*التفاصيل:* ${message}%0A%0A`;
    window.open(`https://wa.me/${myNumber}?text=${finalMessage}`, "_blank");
    resetForm();
  };

  const handleMock = (e) => {
    e.preventDefault();
    const myNumber = "201099018767";
    const finalMessage = `*طلب جديد من موقع روبينو* 👕%0A%0A*الاسم:* ${clientName}%0A*رقم التواصل:* ${number}%0A*التفاصيل:* ${message}%0A%0A_(ملاحظة: سأقوم بإرسال صور التصميم في الرسالة القادمة)_`;
    window.open(`https://wa.me/${myNumber}?text=${finalMessage}`, "_blank");
    resetForm();
  };

  const handleBusiness = (e) => {
    e.preventDefault();
    const myNumber = "201099018767";
    const selectedMaterials = personName.length > 0 ? personName.join(' - ') : "لم يتم التحديد";
    const finalMessage = `*طلب جديد من موقع روبينو* 👕%0A%0A*الاسم:* ${clientName}%0A*رقم التواصل:* ${number}%0A*العنوان:* ${address}%0A*الخامات:* ${selectedMaterials}%0A*التفاصيل:* ${message}%0A%0A_(ملاحظة: سأقوم بإرسال صور التصميم في الرسالة القادمة)_`;
    window.open(`https://wa.me/${myNumber}?text=${finalMessage}`, "_blank");
    resetForm();
  };

  const resetForm = () => {
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
      <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 mt-20 sm:mt-30">
        
        <div className="mb-8 w-full flex justify-center scale-90 sm:scale-100">
          <Toggle setSelected={setSelected} selected={selected} />
        </div>

        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-8 border border-gray-700">
          
          {selected === "items" && (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center uppercase tracking-wide">Available Items Order</h2>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-6 text-center leading-relaxed px-2">تقدر من هنا تطلب اي منتج من منتجات روبينو المتاحة</h3>
              
              <form className="flex flex-col gap-4" onSubmit={handleItems}>
                <input 
                  placeholder="Customer Name" 
                  className="placeholder:text-center text-center w-full bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all" 
                  type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)}
                />
                
                <input 
                  placeholder="Phone Number (WhatsApp)" 
                  className="placeholder:text-center text-center w-full bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all" 
                  type="tel" required value={number} onChange={(e) => setNumber(e.target.value)}
                />

                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#9ca3af', fontSize: '14px' }}>Available Items</InputLabel>
                  <Select
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Available Items" />}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: 'rgba(17, 24, 39, 0.5)', color: 'white', textAlign: 'right', borderRadius: '12px' }}
                  >
                    {readyItems.map((item) => (
                      <MenuItem key={item.id} value={item.title} style={getStyles(item.title, personName, theme)}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <textarea 
                  placeholder="Notes (Optional)" 
                  className="placeholder:text-center text-center w-full max-h-[200px] min-h-[100px] bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all h-28" 
                  onChange={(e) => setMessage(e.target.value)} value={message}
                />

                <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:brightness-110 active:scale-95 text-white font-bold py-3.5 px-4 rounded-xl mt-2 transition-all shadow-lg" type="submit">
                  إرسال الطلب عبر واتساب
                </button>
              </form>
            </>
          )}

          {selected === "mock" && (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center uppercase tracking-wide">Design Preview Request</h2>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-6 text-center leading-relaxed px-2">اطلب تصميمك الخاص باللون والخامة والصورة التي تفضلها</h3>

              <form className="flex flex-col gap-4" onSubmit={handleMock}>
                <input 
                  placeholder="Client Name" 
                  className="placeholder:text-center text-center w-full bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all" 
                  type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)}
                />
                
                <input 
                  placeholder="Phone Number (WhatsApp)" 
                  className="w-full bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all placeholder:text-center text-center" 
                  type="tel" required value={number} onChange={(e) => setNumber(e.target.value)}
                />

                <textarea 
                  placeholder="Notes (اوصف التصميم اللي انت عايزه)" 
                  className="w-full max-h-[200px] min-h-[100px] bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all placeholder:text-center text-center h-28" 
                  onChange={(e) => setMessage(e.target.value)} value={message}
                />

                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 sm:p-4 text-right">
                  <p className="text-indigo-200 text-[11px] sm:text-xs leading-relaxed">
                    ملحوظة: <b>ممكن تبعت اللوجو او التصميم</b> مباشرة في شات الواتساب بعد الضغط على الإرسال
                  </p>
                </div>

                <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:brightness-110 active:scale-95 text-white font-bold py-3.5 px-4 rounded-xl mt-2 transition-all shadow-lg" type="submit">
                  إرسال الطلب عبر واتساب
                </button>
              </form>
            </>
          )}

          {selected === "business" && (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center uppercase tracking-wide">Business Order</h2>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-6 text-center leading-relaxed px-2">اطلب عرض سعر تجاري مخصص لمشروعك</h3>
              
              <form className="flex flex-col gap-4" onSubmit={handleBusiness}>
                <input 
                  placeholder="Business owner name" 
                  className="w-full bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all placeholder:text-center text-center" 
                  type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)}
                />
                
                <input 
                  placeholder="Phone Number (WhatsApp)" 
                  className="w-full bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all placeholder:text-center text-center" 
                  type="tel" required value={number} onChange={(e) => setNumber(e.target.value)}
                />

                <input 
                  placeholder="Business Address" 
                  className="w-full bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all placeholder:text-center text-center" 
                  type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
                />

                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#9ca3af', fontSize: '14px' }}>Material</InputLabel>
                  <Select
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Material" />}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: 'rgba(17, 24, 39, 0.5)', color: 'white', borderRadius: '12px' }}
                  >
                    {materials.map((item) => (
                      <MenuItem key={item.id} value={item.material} style={getStyles(item.material, personName, theme)}>
                        {item.material}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <textarea 
                  placeholder="Additional Details (Colors, Quantity, Sizes)" 
                  className="w-full max-h-[200px] min-h-[100px] bg-gray-900/50 text-gray-200 border border-gray-700 rounded-xl p-3 sm:p-4 outline-none focus:border-indigo-500 transition-all placeholder:text-center text-center h-28" 
                  onChange={(e) => setMessage(e.target.value)} value={message}
                />

                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 sm:p-4 text-right">
                  <p className="text-indigo-200 text-[11px] sm:text-xs leading-relaxed">
                    💡 يمكنك إرسال صور التصميم أو اللوجو مباشرة في محادثة الواتساب
                  </p>
                </div>

                <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:brightness-110 active:scale-95 text-white font-bold py-3.5 px-4 rounded-xl mt-2 transition-all shadow-lg" type="submit">
                  إرسال الطلب عبر واتساب
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Form;