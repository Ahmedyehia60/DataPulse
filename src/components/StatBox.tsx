import { Box, TrendingUp } from "lucide-react";

function StatBox() {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 w-80">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h6 className="text-gray-500 font-medium text-lg mb-2">
            Total Products
          </h6>
          <p className="font-bold text-3xl text-gray-900">1,250</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-2xl">
          <Box size={24} className="text-blue-600" />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-semibold">
          <TrendingUp size={16} />
          <span>+2.5%</span>
        </div>
        <span className="text-gray-400 text-sm">vs last month</span>
      </div>
    </div>
  );
}

export default StatBox;
