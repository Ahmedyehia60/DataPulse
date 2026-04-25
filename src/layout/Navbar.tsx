import { Bell, Search } from "lucide-react";
import { useState } from "react";
import PopUp from "../components/PopUp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-100">
        <Search className="text-gray-500 w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder="Search analytics, users, reports..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>
      <div className="flex items-center gap-6">
        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bell className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

          {isOpen && <PopUp />}
        </div>
        <div className="flex items-center gap-3 border-l pl-4">
          <div className="text-right">
            <p className="text-sm font-semibold">RORO</p>
            <p className="text-xs text-gray-500">System Admin</p>
          </div>

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
