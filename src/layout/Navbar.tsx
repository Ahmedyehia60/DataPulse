import { Bell, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PopUp from "../components/PopUp";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const adminName = localStorage.getItem("user") ?? "";
  const name = adminName ? JSON.parse(adminName) : null;
  const user = name?.name || "Admin";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (bellRef.current && !bellRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 mr-4"
        >
          <Menu size={28} />
        </button>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div ref={bellRef} className="relative">
          <div
            className="cursor-pointer relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bell className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {isOpen && <PopUp onClose={() => setIsOpen(false)} />}
        </div>

        <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
          <div className="text-right">
            <p className="text-sm font-semibold leading-tight">{user}</p>
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
