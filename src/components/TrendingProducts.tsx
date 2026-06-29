import type { DashboardData } from "../hooks/useDashboardData";

type Props = {
  products: DashboardData["topTrendingStockChart"]["products"];
};

const TrendingProducts = ({ products }: Props) => {
  return (
    <div className="h-full max-w-md bg-white p-3">
      <h2 className="mb-6 text-lg font-bold text-gray-800">
        Trending Products
      </h2>

      <div className="flex flex-col gap-7">
        {products.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-200" />
              <div className="flex flex-col">
                <p className="mb-1 text-[15px] font-semibold leading-none text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {item.category}
                </p>
              </div>
            </div>

            <div className="rounded-full bg-green-50 px-2 py-1">
              <span className="text-xs font-bold text-green-600">
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
