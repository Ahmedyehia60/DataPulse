import { NavLink } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react";

function Sidebar() {
  const pages = [
    { name: "DashBoard", path: "/", icon: LayoutDashboard },
    { name: "Inventory", path: "inventory", icon: Boxes },
    { name: "Orders", path: "orders", icon: ShoppingCart },
    { name: "Analytics", path: "analytics", icon: BarChart3 },
    { name: "Settings", path: "settings", icon: Settings },
  ];

  return (
    <div className="w-70 h-screen bg-[#ffffff] text-gray-800 border-gray-200 border-r flex flex-col">
      <h2 className="text-3xl font-extrabold mx-auto text-[#6557c6] mt-7 italic">
        Data Pulse
      </h2>

      <nav className="mt-10 flex flex-col gap-3 flex-1">
        {pages.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
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
