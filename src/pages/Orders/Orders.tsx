import { Download } from "lucide-react";

const Orders = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-sm mt-1 text-gray-500">
            Track and manage customer orders.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 cursor-pointer bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50 transition-all active:scale-95 group">
          <Download
            size={20}
            className="text-gray-500 group-hover:text-blue-600"
          />
          <span className="font-semibold text-sm ">Export CSV</span>
        </button>
      </div>

    
    </div>
  );
};

export default Orders;
