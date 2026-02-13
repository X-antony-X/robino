import { useState , useEffect} from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import ProductsComponent from './components/ProductsComponent.jsx'
import Footer from './sections/Footer.jsx'
import Me from './sections/Me.jsx'
import Form from './components/Form.jsx'
import Portfolio from './Portfolio.jsx'
import { Routes, Route , useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx'
import ProtectedRoute from './components/supabase/ProtectedRoute.jsx'
import AdminForm from './AdminForm.jsx'
import { supabase } from './CreateClient.jsx'
import AdminPage from "./AdminPage.jsx"
import Carousels from './Carousels.jsx'
import AdminMenu from './AdminMenu.jsx'
import FormCraftedUniforms from './components/supabase/FormCraftedUniforms.jsx'
import FormMock from './components/supabase/FormMock.jsx'
import FormReadyMade from './components/supabase/FormReadyMade.jsx'
import FormUsers from './components/supabase/FormUsers.jsx'
import FormMaterials from './components/supabase/FormMaterials.jsx'
import MyPortfolio from './components/supabase/MyPortfolio.jsx'
import Feedback from './components/supabase/Feedback.jsx'

function App() {
  const location = useLocation();
  const [selected, setSelected] = useState("items");
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const adminRoutes = ["/adminPage", "/carousels", "/craftedUniforms", "/mockUp", "/readyMade", "/users", "/materials", "/myPortfolio"];
  const isAdminRoute = adminRoutes.includes(location.pathname);
  
  const hideLayout = isAdminRoute || location.pathname === "/adminForm";

  return (
    <>
      {!hideLayout && <Header />}

      {session && isAdminRoute && <AdminMenu />}

      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsComponent selected={selected} setSelected={setSelected} />} />
        <Route path='/form' element={<Form selected={selected} setSelected={setSelected} />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/feedback' element={<Feedback />} />
        
        <Route path='/adminForm' element={<AdminForm />} />

        <Route 
          path="/adminPage" 
          element={
            <ProtectedRoute session={session}>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/carousels" 
          element={
            <ProtectedRoute session={session}>
              <Carousels />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/craftedUniforms" 
          element={
            <ProtectedRoute session={session}>
              <FormCraftedUniforms />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mockUp" 
          element={
            <ProtectedRoute session={session}>
              <FormMock />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/readyMade" 
          element={
            <ProtectedRoute session={session}>
              <FormReadyMade />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute session={session}>
              <FormUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/materials" 
          element={
            <ProtectedRoute session={session}>
              <FormMaterials />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/myPortfolio" 
          element={
            <ProtectedRoute session={session}>
              <MyPortfolio />
            </ProtectedRoute>
          } 
        />
      </Routes>

      {!hideLayout && <Footer />}
      {!hideLayout && <Me />}
    </>
  );
}

export default App