export const useAnalyticsData = () => {
  // --- DATA SOURCES ---
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const actualSalesRaw = [4200, 4800, 5100, 4000];
  const topProducts = [
    "Pens",
    "Notebooks",
    "Backpacks",
    "Calculators",
    "Colors",
  ];
  const salesVolume = [1200, 950, 800, 450, 300];
  const underStockItems = [
    { name: "A4 Paper", current: 5, min: 20 },
    { name: "Blue Ink", current: 12, min: 50 },
    { name: "Drawing Pens", current: 3, min: 15 },
  ];

  // --------------------------------------------- ----------GROWTH & TREND CALCULATIONS------------------------------------------------------- ---
  // Calculate month-to-month growth rates
  const growthRates = [];
  for (let i = 1; i < actualSalesRaw.length; i++) {
    growthRates.push(
      (actualSalesRaw[i] - actualSalesRaw[i - 1]) / actualSalesRaw[i - 1],
    );
  }

  // Calculate average growth rate across all months
  const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;

  // Calculate total revenue and overall growth percentage (First vs Last)
  const totalRevenue = actualSalesRaw.reduce((a, b) => a + b, 0);
  const growthPercent = (
    ((actualSalesRaw[actualSalesRaw.length - 1] - actualSalesRaw[0]) /
      actualSalesRaw[0]) *
    100
  ).toFixed(1);

  // --- -----------------------------------------------------------FORECASTING LOGIC ----------------------------------------------------------
  // Project next two months based on average growth
  const last = actualSalesRaw[actualSalesRaw.length - 1];
  const forecast1 = Math.round(last * (1 + avgGrowth));
  const forecast2 = Math.round(forecast1 * (1 + avgGrowth));

  // Determine if a sales drop is projected
  const isDropComing = forecast1 < last;

  // Prepare data arrays for ECharts (padding with nulls for visual alignment)
  const actualSales = [...actualSalesRaw, null, null];
  const forecastedSales = [
    ...Array(actualSalesRaw.length).fill(null),
    forecast1,
    forecast2,
  ];

  // --- ---------------------------------------------------ACCURACY MEASUREMENT (BACKTESTING)-------------------------------------------------- ---
  // Measure accuracy by comparing the latest actual value to a hypothetical forecast
  const salesBeforeLast = actualSalesRaw.slice(0, -1);
  const pastGrowthRates = [];
  for (let i = 1; i < salesBeforeLast.length; i++) {
    pastGrowthRates.push(
      (salesBeforeLast[i] - salesBeforeLast[i - 1]) / salesBeforeLast[i - 1],
    );
  }
  const pastAvgGrowth =
    pastGrowthRates.length > 0
      ? pastGrowthRates.reduce((a, b) => a + b, 0) / pastGrowthRates.length
      : 0;
  const hypotheticalForecast = Math.round(
    salesBeforeLast[salesBeforeLast.length - 1] * (1 + pastAvgGrowth),
  );

  const errorMargin = Math.abs(last - hypotheticalForecast) / last;
  const accuracy = Math.max(0, (1 - errorMargin) * 100).toFixed(1);

  // --------------------------------------------------------------PERFORMANCE INSIGHTS ----------------------------------------------
  // Identify the index of the highest performing month
  const bestMonthIndex = actualSalesRaw.indexOf(Math.max(...actualSalesRaw));

  // --- ECHARTS OPTIONS CONFIGURATIONS ---
  const forecastOption = {
    tooltip: { trigger: "axis" },
    legend: { top: 10 },
    xAxis: { type: "category", data: months },
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
        data: actualSales,
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
    forecast1,
    forecast2,
    totalRevenue,
    growthPercent,
    bestMonthIndex,
    accuracy,
    isDropComing,
    forecastOption,
    topProductsOption,
    underStockItems,
    trendOption,
  };
};
