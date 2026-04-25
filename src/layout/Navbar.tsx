import { Bell, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PopUp from "../components/PopUp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-100">
        <Search className="text-gray-500 w-4 h-4 mr-2" />
        <input
          type="text"
          placeholder="Search analytics, users, reports..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-6">
        <div ref={popupRef} className="relative">
          <div
            className="cursor-pointer relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bell className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

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
