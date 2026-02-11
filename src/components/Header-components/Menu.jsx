import { NavLink } from "react-router-dom";

const baseClass =
  "cursor-pointer relative inline-flex items-center justify-center gap-2 px-3 h-9 rounded-md text-sm font-medium transition-colors";

const activeClass = "bg-[#F5F5F5]";
const inactiveClass = "hover:bg-[#F5F5F5]";

function Menu() {
  return (
    <div className="flex items-center gap-2">

      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? `text-[#06B6D4] ${activeClass}` : inactiveClass}`
        }
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
          <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
        HOME
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? `text-[#60A5FA] ${activeClass}` : inactiveClass}`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-bag text-blue-400 dark:text-blue-600"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        PRODUCTS
      </NavLink>

      <NavLink
        to="/form"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? `text-[#FACC14] ${activeClass}` : inactiveClass}`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FACC14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clipboard-pen text-yellow-400 dark:text-yellow-600"> <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/> <path d="M10 11h4"/> <path d="M10 16h4"/> <path d="m15 11 3 3"/></svg>
        CUSTOM ORDER
      </NavLink>

      <NavLink
        to="/portfolio"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? `text-[#FB923C] ${activeClass}` : inactiveClass}`
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FB923C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-user-round"> <path d="M18 20a6 6 0 0 0-12 0"/> <circle cx="12" cy="10" r="4"/> <circle cx="12" cy="12" r="10"/></svg>
        PORTFOLIO
      </NavLink>

    </div>
  );
}

export default Menu;
