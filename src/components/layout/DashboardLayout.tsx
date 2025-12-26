import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";

import logo from '../../assets/logo-removebg-preview.png'
import { FiMenu, FiX } from "react-icons/fi";
import type { User } from "../../types";
import { useGetProfileQuery } from "../../redux/features/auth/auth.api";
import { getSidebarItems } from "../../utils/getSidebarItems";
import LoadingScreen from "../../shared/LoaingScreen";

type DashboardLayoutProps = {
  role: User["role"];
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ fetch profile from RTK Query
  const {  isLoading } = useGetProfileQuery();

  if (isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  const sidebarItems = getSidebarItems(role);

  return (
    <div className="flex h-screen bg-[#1c3144] text-[#E6D5B8]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform w-64 bg-[#1c3144] border-r border-[#C8A978]/30 p-4 transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <img className="h-14 w-16" src={logo} alt="" />
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        {/* <h2 className="hidden lg:block text-2xl font-bold mb-6">Dashboard</h2> */}
        <img className="hidden lg:block text-2xl font-bold mb-6" src={logo} alt="" />
        
        <nav className="space-y-6">
          {sidebarItems.map((section, idx) => (
            <div key={idx}>
              {/* <h3 className="text-sm uppercase tracking-wide text-[#C8A978] font-semibold mb-2">
                {section.title}
              </h3> */}
              <div className="space-y-1">
                {section.items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.url}
                    onClick={() => setIsOpen(false)} // close on mobile
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#C8A978] text-[#1c3144] font-bold"
                          : "hover:text-[#C8A978]"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Navbar (mobile only) */}
        <header className="lg:hidden flex items-center justify-between bg-[#1c3144] border-b border-[#C8A978]/30 p-4">
          
           <img className="h-12 w-16" src={logo} alt="" />
          <button onClick={() => setIsOpen(true)}>
            <FiMenu size={24} />
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
