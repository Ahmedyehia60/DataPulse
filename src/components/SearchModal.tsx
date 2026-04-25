import { Search, Clock, ArrowUpRight } from "lucide-react";

function SearchModal() {
  const recentSearches = [
    "Monthly Analytics",
    "Inventory Report",
    "Order #5432",
  ];

  return (
    <div className="absolute top-22 right-6 w-87.5 bg-white shadow-2xl border border-gray-100 rounded-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
      <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
        <Search className="text-[#6557c6] w-5 h-5" />
        <input
          type="text"
          autoFocus
          placeholder="Search anything..."
          className="bg-transparent outline-none w-full text-sm font-medium text-gray-700 placeholder:text-gray-400"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Recent Searches
          </span>
        </div>

        <div className="space-y-1">
          {recentSearches.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#f5f8ff] cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-4 h-4 text-gray-300" />
                <span className="text-sm font-medium group-hover:text-[#6557c6]">
                  {item}
                </span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
