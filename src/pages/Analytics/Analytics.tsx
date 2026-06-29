import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { KPISection } from "../../components/analytics/KPISection";
import { Alerts } from "../../components/analytics/Alerts";
import { LowStockSection } from "../../components/analytics/LowStockSection";
import { SalesTrendChart } from "../../components/analytics/charts/SalesTrendChart";
import { ForecastChart } from "../../components/analytics/charts/ForecastChart";
import { TopProductsChart } from "../../components/analytics/charts/TopProductsChart";
import { TrendingUpDown } from "lucide-react";

function Analytics() {
  const data = useAnalyticsData();

  if (data.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-semibold text-slate-500">
        Loading analytics...
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
        {data.error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-100 min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
        <div className="mb-4 ">
          <h1 className="text-2xl font-bold">📊 Business Overview</h1>
          <p className="text-sm text-slate-500">
            Sales performance, forecasting & inventory insights
          </p>
        </div>

        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-black px-4 py-2.5 text-white shadow-sm transition-all hover:bg-gray-900 active:scale-95">
          <TrendingUpDown size={20} />
          <span className="text-sm font-semibold">Show Live Analytics</span>
        </button>
      </div>

      <Alerts isDropComing={data.isDropComing} />

      <KPISection
        totalRevenue={data.totalRevenue}
        growthPercent={data.growthPercent}
        bestMonth={data.bestMonth}
        forecast1={data.forecast1}
        accuracy={data.accuracy}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <SalesTrendChart option={data.trendOption} />

        <ForecastChart option={data.forecastOption} />
      </div>

      <TopProductsChart option={data.topProductsOption} />

      <LowStockSection items={data.underStockItems} />
    </div>
  );
}

export default Analytics;
