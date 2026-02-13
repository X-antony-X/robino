import { NavLink } from "react-router-dom";
import { useState } from "react";

const Icons = {
  Admin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/> 
      <path d="M7 20H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/> 
      <path d="M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/> 
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/> 
      <path d="M12 7V8M12 12V13M15 10H14M10 10H9M14.12 7.88L13.41 8.59M10.59 11.41L9.88 12.12M14.12 12.12L13.41 11.41M10.59 8.59L9.88 7.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  ),
  Carousels: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="2" y="6" width="16" height="12" rx="2" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.4"/> <rect x="6" y="4" width="16" height="16" rx="2" fill="white" stroke="#60A5FA" strokeWidth="2"/>  <circle cx="10" cy="16" r="1" stroke="#121212"/> <circle cx="14" cy="16" r="1" stroke="#121212" fillOpacity="0.3"/> <circle cx="18" cy="16" r="1" stroke="#121212" fillOpacity="0.3"/> <line x1="10" y1="8" x2="18" y2="8" stroke="#121212" strokeWidth="1.5" strokeLinecap="round"/> <line x1="10" y1="11" x2="15" y2="11" stroke="#121212" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  Uniforms: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 8L16 4H8L4 8V20H20V8Z" stroke="#FACC14" strokeWidth="2" strokeLinejoin="round"/> <path d="M8 4L12 9L16 4" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> <circle cx="12" cy="12" r="1" fill="#2D3436"/> <circle cx="12" cy="15" r="1" fill="#2D3436"/> <circle cx="12" cy="18" r="1" fill="#2D3436"/> <path d="M19 15L19.5 16.5L21 17L19.5 17.5L19 19L18.5 17.5L17 17L18.5 16.5L19 15Z" fill="#FFD700" stroke="#FFD700" strokeWidth="0.5"/></svg>
  ),
  Mock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="2" y="5" width="16" height="11" rx="1.5" stroke="#FB923C" strokeWidth="2"/> <path d="M1 18H19" stroke="#FB923C" strokeWidth="2" strokeLinecap="round"/> <rect x="15" y="9" width="6" height="11" rx="1.2" stroke="#121212" strokeWidth="2"/> <line x1="17" y1="11" x2="19" y2="11" stroke="#121212" strokeWidth="1" strokeLinecap="round"/> <circle cx="18" cy="18" r="0.8" stroke="#121212"/> <rect x="5" y="8" width="6" height="4" rx="0.5" stroke="#121212" fillOpacity="0.2"/></svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  ),
  Made: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/> <rect x="4" y="8" width="16" height="12" rx="2" stroke="#94A3B8" strokeWidth="2"/> <path d="M9 14L11 16L15 12" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Materials: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
  ),
  Portfolio: () => ( 
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="7" width="18" height="12" rx="2" stroke="#4ADE80" strokeWidth="2"/> <path d="M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round"/> <rect x="11" y="12" width="2" height="3" rx="0.5" fill="#4ADE80"/> <line x1="3" y1="11" x2="21" y2="11" stroke="#4ADE80" strokeWidth="1.5" strokeOpacity="0.3"/></svg>
  )
};

function AdminMenu() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/adminPage", label: "HOME", icon: <Icons.Home />, color: "#06B6D4" },
    { to: "/carousels", label: "CAROUSELS", icon: <Icons.Carousels />, color: "#60A5FA" },
    { to: "/craftedUniforms", label: "CRAFTED", icon: <Icons.Uniforms />, color: "#FACC14" },
    { to: "/mockUp", label: "MOCK UP", icon: <Icons.Mock />, color: "#FB923C" },
    { to: "/readyMade", label: "READY MADE", icon: <Icons.Made />, color: "#94A3B8" },
    { to: "/users", label: "USERS", icon: <Icons.Users />, color: "#818CF8" },
    { to: "/materials", label: "MATERIALS", icon: <Icons.Materials />, color: "#F472B6" },
    { to: "/myPortfolio", label: "PORTFOLIO", icon: <Icons.Portfolio />, color: "#4ADE80" },
  ];

  return (
    <header className="w-full bg-white shadow-md border-b-2 border-[#121212] relative overflow-x-clip">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        <h1 className="font-bold text-lg flex items-center gap-2 flex-shrink-0">
          <div className="text-[#121212]">
             <Icons.Admin />
          </div>
          <span className="whitespace-nowrap">Admin Panel</span>
        </h1>

        <div className="hidden lg:flex items-center gap-1 flex-nowrap">
          {navLinks.map((link) => (
            <NavItem 
              key={link.to}
              to={link.to} 
              label={link.label} 
              icon={link.icon} 
              activeColor={link.color} 
            />
          ))}
        </div>

        <button 
          className="lg:hidden text-2xl p-2 flex-shrink-0" 
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden flex flex-col gap-1 p-4 border-t bg-white absolute top-full left-0 w-full z-[999] shadow-xl">
          {navLinks.map((link) => (
            <NavItem 
              key={link.to}
              to={link.to} 
              label={link.label} 
              icon={link.icon} 
              activeColor={link.color}
              onClick={() => setOpen(false)} 
            />
          ))}
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label, icon, activeColor, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => ({
        color: isActive ? activeColor : "#374151",
        backgroundColor: isActive ? `${activeColor}10` : "transparent",
      })}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md font-semibold transition flex items-center gap-2 ${
          !isActive && "hover:bg-gray-100"
        }`
      }
    >
      <span className="opacity-100">{icon}</span>
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}

export default AdminMenu;