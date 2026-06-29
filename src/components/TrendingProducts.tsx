import type { DashboardData } from "../hooks/useDashboardData";

type Props = {
  products: DashboardData["topTrendingStockChart"]["products"];
};

const TrendingProducts = ({ products }: Props) => {
  return (
    <div className="p-4 bg-white rounded-xl max-w-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Trending Products
      </h2>

      <div className="flex flex-col gap-5">
        {products.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg shrink-0"></div>
              <div className="flex flex-col">
                <p className="text-[15px] font-semibold text-gray-900 leading-none mb-1">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {item.category}
                </p>
              </div>
            </div>
            <div className="bg-green-50 px-2 py-1 rounded-full">
              <span className="text-green-600 text-xs font-bold">
                {item.growthPercent >= 0 ? "+" : ""}
                {item.growthPercent}%
              </span>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm text-gray-500">No trending products yet.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
