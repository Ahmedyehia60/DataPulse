import { Link } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData";
import { CircleAlert } from "lucide-react";

const Alert = () => {
  const { data } = useDashboardData();
  if (!data) return null;

  return (
    <div className="w-[80%]">
      {data.stockAlert.criticalItemsCount > 0 && (
        <div className="rounded-xl w-full border border-red-200 bg-red-100 px-3 py-2 md:p-4 gap-2 md:gap-5 text-xs md:text-sm font-semibold text-red-800 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <CircleAlert className="w-4 h-4 md:w-5 md:h-5 text-red-900 shrink-0" />

            <span className="truncate md:whitespace-normal">
              {data.stockAlert.message}
            </span>
          </div>

          <Link
            to="/inventory?filter=low-stock"
            className="shrink-0 text-xs md:text-sm font-bold text-red-900 hover:text-red-800"
          >
            <span className="hidden sm:inline">View Items</span>
            <span className="sm:hidden">View</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Alert;
