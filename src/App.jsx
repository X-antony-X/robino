import { useState } from 'react'
import Loader from './components/Loader.jsx'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import ProductsComponent from './components/ProductsComponent.jsx'
import Footer from './sections/Footer.jsx'
import Me from './sections/Me.jsx'

function App() {

  return (
    <>
      <Header />
      {/* <Loader /> */}
      {/* <Home /> */}
      <ProductsComponent />
      <Footer />
      <Me />
    </>
  )
}

export default App


// سود عميق (Deep Black)	#121212	الخلفيات الأساسية أو النصوص الكبيرة (أهدى من الأسود الصريح).
// رمادي متوسط (Slate Gray)	#4A4A4A	الأيقونات، النصوص الثانوية، أو الحدود (Borders).
// رمادي فاتح (Cool Gray)	#F5F5F7	الخلفيات الفاتحة، البطاقات (Cards)، أو الـ Hover.
// أبيض نقي (Pure White)	#FFFFFF النصوص فوق الخلفيات الغامقة أو المساحات البيضاء الأساسية.