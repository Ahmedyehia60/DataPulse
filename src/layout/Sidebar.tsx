import { NavLink } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  const pages = [
    { name: "DashBoard", path: "/", icon: LayoutDashboard },
    { name: "Inventory", path: "inventory", icon: Boxes },
    { name: "Orders", path: "orders", icon: ShoppingCart },
    { name: "Analytics", path: "analytics", icon: BarChart3 },
    { name: "Settings", path: "settings", icon: Settings },
  ];

  return (
    <div
      className={`
      w-70 h-screen bg-[#ffffff] text-gray-800 border-gray-200 border-r flex flex-col transition-all duration-300
      fixed z-50 left-0 top-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0 md:flex
    `}
    >
      <h2 className="text-3xl font-extrabold mx-auto text-[#6557c6] mt-7 italic">
        Data Pulse
      </h2>
      <button
        className="md:hidden mt-7 flex justify-end mr-4"
        onClick={toggleSidebar}
      >
        <X size={24} />
      </button>
      <nav className="mt-10 flex flex-col gap-3 flex-1">
        {pages.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-2.5 rounded transition duration-200 hover:bg-[#f5f8ff] hover:text-[#6557c6] hover:border-l-4 hover:border-[#6557c6]"
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}

        <div className="flex mt-auto mb-2 items-center gap-3 cursor-pointer p-5 rounded transition duration-200 hover:bg-[#b4405d]/10 hover:border-l-4 hover:border-[#b4405d] text-[#b4405d]">
          <LogOut />
          <a href="#">Logout</a>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
