import type { DashboardData } from "../hooks/useDashboardData";

type Props = {
  products: DashboardData["topTrendingStockChart"]["products"];
};

const TrendingProducts = ({ products }: Props) => {
  return (
    <div className="flex h-full w-full flex-col bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-bold text-gray-900 tracking-tight">
            Trending Products
          </h2>
          <p className="text-xs text-gray-400">
            Top performing items this period
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
          Live
        </div>
      </div>

      {/* Product List */}
      <div className="flex flex-col divide-y divide-gray-50">
        {products.map((item, index) => {
          const isNegative = item.growthPercent < 0;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
            >
              {/* Rank & Text Info */}
              <div className="flex items-center gap-4 min-w-0">
                <span className="w-5 text-sm font-bold text-gray-400 font-mono text-center shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col min-w-0">
                  <p className="truncate text-[14px] font-semibold text-gray-900 mb-0.5">
                    {item.name}
                  </p>
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                    {item.category || "Uncategorized"}
                  </span>
                </div>
              </div>

              {/* Growth Badge */}
              <div className="flex items-center gap-1 shrink-0 pl-3">
                <span
                  className={`text-xs font-bold font-mono ${
                    isNegative ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {!isNegative && "+"}
                  {item.growthPercent}%
                </span>

                <svg
                  className={`h-3 w-3 shrink-0 ${
                    isNegative ? "text-rose-500 rotate-180" : "text-emerald-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="flex h-48 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-gray-400">
              No trending products records found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
