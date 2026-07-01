import { Link } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData";
import { CircleAlert } from "lucide-react";

const Alert = () => {
  const { data } = useDashboardData();
  if (!data) return null;

  return (
    <div className=" w-[70%] ">
      {data.stockAlert.criticalItemsCount > 0 && (
        <div className="rounded-xl w-full border border-red-200 bg-red-100 p-4 gap-5 text-sm font-semibold text-red-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {" "}
            <CircleAlert className="w-5 h-5 text-red-900" />
            {data.stockAlert.message}{" "}
          </div>

          <Link
            to="/inventory?filter=low-stock"
            className="text-sm font-bold text-red-900 hover:text-red-800"
          >
            View Items
          </Link>
        </div>
      )}
    </div>
  );
};

export default Alert;
