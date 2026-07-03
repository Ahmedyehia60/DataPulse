import { useEffect, useState } from "react";

const ANALYTICS_API_URL = "http://192.168.1.2:5000/api/analytics";

type LowStockItem = {
  name: string;
  current: number;
  min: number;
  orderAtLeast?: number;
};

type TopProduct = {
  name: string;
  salesVolume: number;
};

type AnalyticsApiResponse = {
  kpis: {
    totalRevenue: number;
    growthPercent: number;
    bestMonth: string;
    forecastNextMonth: number;
    forecastAccuracy: number;
  };
  alerts: {
    isDropComing: boolean;
  };
  salesTrendChart: {
    months: string[];
    sales: number[];
  };
  forecastChart: {
    months: string[];
    actualSales: Array<number | null>;
    forecastedSales: Array<number | null>;
  };
  topProductsChart: {
    products: TopProduct[];
  };
  lowStock: {
    totalCount?: number;
    items: LowStockItem[];
  };
};

export const useAnalyticsData = () => {
  const [apiData, setApiData] = useState<AnalyticsApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(ANALYTICS_API_URL, { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load analytics");
        }

        return res.json();
      })
      .then((data: AnalyticsApiResponse) => {
        setApiData(data);
        setError("");
      })
      .catch((err) => {
        console.error("Analytics API Error:", err);
        setError("Could not load analytics data.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const months = apiData?.salesTrendChart.months ?? [];
  const actualSalesRaw = apiData?.salesTrendChart.sales ?? [];

  const forecastMonths = apiData?.forecastChart.months ?? [];
  const actualSales = apiData?.forecastChart.actualSales ?? [];
  const forecastedSales = apiData?.forecastChart.forecastedSales ?? [];

  const topProducts =
    apiData?.topProductsChart.products.map((p) => p.name) ?? [];
  const salesVolume =
    apiData?.topProductsChart.products.map((p) => p.salesVolume) ?? [];

  const underStockItems = apiData?.lowStock.items ?? [];
  const underStockTotalCount =
    apiData?.lowStock.totalCount ?? underStockItems.length;

  const forecastOption = {
    tooltip: { trigger: "axis" },
    legend: { top: 10 },
    xAxis: { type: "category", data: forecastMonths },
    yAxis: { type: "value" },
    series: [
      {
        name: "Actual",
        type: "bar",
        data: actualSales,
        itemStyle: { color: "#6366f1", borderRadius: [6, 6, 0, 0] },
      },
      {
        name: "Forecast",
        type: "line",
        data: forecastedSales,
        smooth: true,
        lineStyle: { type: "dashed", width: 3, color: "#10b981" },
      },
    ],
  };

  const trendOption = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: months },
    yAxis: { type: "value" },
    series: [
      {
        name: "Sales",
        type: "line",
        data: actualSalesRaw,
        smooth: true,
        lineStyle: { width: 3, color: "#4f46e5" },
        areaStyle: { color: "rgba(79,70,229,0.1)" },
        markPoint: { data: [{ type: "max", name: "Peak" }] },
      },
    ],
  };

  const topProductsOption = {
    tooltip: {},
    xAxis: { type: "category", data: topProducts },
    yAxis: { type: "value" },
    series: [
      {
        data: salesVolume,
        type: "bar",
        itemStyle: { color: "#4f46e5", borderRadius: [6, 6, 0, 0] },
      },
    ],
  };

  return {
    months,
    actualSales,
    actualSalesRaw,
    forecastedSales,
    forecast1: apiData?.kpis.forecastNextMonth ?? 0,
    forecast2: 0,
    totalRevenue: apiData?.kpis.totalRevenue ?? 0,
    growthPercent: apiData?.kpis.growthPercent ?? 0,
    bestMonth: apiData?.kpis.bestMonth ?? "N/A",
    accuracy: apiData?.kpis.forecastAccuracy ?? 0,
    isDropComing: apiData?.alerts.isDropComing ?? false,
    forecastOption,
    topProductsOption,
    underStockTotalCount,
    underStockItems,
    trendOption,
    isLoading,
    error,
  };
};
