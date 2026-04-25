import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Alert = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-red-200/30 rounded-xl border-2 border-red-200 shadow-lg">
      <div className="flex gap-3 items-center">
        <CircleAlert className="w-5 h-5 text-red-900" />
        <p className="text-sm font-bold text-red-900">
          Critical Stock Alert: 5 items below safety stock levels
        </p>
      </div>

      <Link
        to="/"
        className="text-sm font-bold text-red-900 hover:text-red-800"
      >
        View Items
      </Link>
    </div>
  );
};

export default Alert;
