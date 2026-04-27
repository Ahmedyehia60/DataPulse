import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { KPISection } from "../../components/analytics/KPISection";
import { Alerts } from "../../components/analytics/Alerts";
import { LowStockSection } from "../../components/analytics/LowStockSection";
import { SalesTrendChart } from "../../components/analytics/charts/SalesTrendChart";
import { ForecastChart } from "../../components/analytics/charts/ForecastChart";
import { TopProductsChart } from "../../components/analytics/charts/TopProductsChart";

function Analytics() {
  const data = useAnalyticsData();

  return (
    <div className="p-6 bg-slate-100 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">📊 Business Overview</h1>
        <p className="text-sm text-slate-500">
          Sales performance, forecasting & inventory insights
        </p>
      </div>

      {/* ALERT */}
      <Alerts isDropComing={data.isDropComing} />

      {/* KPI SECTION */}
      <KPISection
        totalRevenue={data.totalRevenue}
        growthPercent={data.growthPercent}
        bestMonth={data.months[data.bestMonthIndex]}
        forecast1={data.forecast1}
        accuracy={data.accuracy}
      />

      {/* CHARTS GRID */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SalesTrendChart option={data.trendOption} />

        <ForecastChart option={data.forecastOption} />
      </div>

      {/* TOP PRODUCTS CHART */}
      <TopProductsChart option={data.topProductsOption} />

      {/* LOW STOCK */}
      <LowStockSection items={data.underStockItems} />
    </div>
  );
}

export default Analytics;
