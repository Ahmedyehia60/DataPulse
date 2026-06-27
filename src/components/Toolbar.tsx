import { Search } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "../utils/pagination";

type ToolbarProps = {
  search: string;
  pageSize: number;
  onSearchChange: (value: string) => void;
  onPageSizeChange: (value: number) => void;
};

function Toolbar({
  search,
  pageSize,
  onSearchChange,
  onPageSizeChange,
}: ToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex h-11 w-full items-center rounded-xl bg-gray-50 px-3 ring-1 ring-gray-100 md:max-w-sm">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search inventory..."
          className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      <label className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        Rows per page
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 outline-none"
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Toolbar;
