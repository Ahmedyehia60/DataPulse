import StatBox from "../../components/StatBox";
import AreaChart from "../../components/DashboardCharts/AreaChart";
import TrendingProducts from "../../components/TrendingProducts";
import { useDashboardData } from "../../hooks/useDashboardData";

function DashBoard() {
  const { data, error, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-semibold text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
        {error || "Could not load dashboard data."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-3">
      {data.stockAlert.criticalItemsCount > 0 && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          {data.stockAlert.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  relative">
        {data.statBoxes.map((stat) => (
          <StatBox key={stat.title} stat={stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        <div className="md:col-span-2">
          <AreaChart chart={data.demandSupplyTrendChart} />
        </div>

        <div className="md:col-span-1 bg-white shadow-sm border border-gray-100 rounded-3xl p-6">
          <TrendingProducts products={data.topTrendingStockChart.products} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
