import ReactECharts from "echarts-for-react";

function Analytics() {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const actualSalesRaw = [4200, 4800, 5100, 800];

  // ===== SMART FORECAST =====
  const growthRates = [];
  for (let i = 1; i < actualSalesRaw.length; i++) {
    growthRates.push(
      (actualSalesRaw[i] - actualSalesRaw[i - 1]) / actualSalesRaw[i - 1],
    );
  }

  const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length;

  const last = actualSalesRaw[actualSalesRaw.length - 1];
  const forecast1 = Math.round(last * (1 + avgGrowth));
  const forecast2 = Math.round(forecast1 * (1 + avgGrowth));

  // ===== FINAL DATA =====
  const actualSales = [...actualSalesRaw, null, null];
  const forecastedSales = [null, null, null, null, forecast1, forecast2];

  // ===== KPIs =====
  const totalRevenue = actualSalesRaw.reduce((a, b) => a + b, 0);

  const growthPercent = (
    ((actualSalesRaw[3] - actualSalesRaw[0]) / actualSalesRaw[0]) *
    100
  ).toFixed(1);

  const bestMonthIndex = actualSalesRaw.indexOf(Math.max(...actualSalesRaw));

  // ===== 🎯 FORECAST ACCURACY =====
  const lastActual = actualSalesRaw[actualSalesRaw.length - 1];
  const lastForecast = forecast1;

  const accuracy = (
    (1 - Math.abs(lastActual - lastForecast) / lastActual) *
    100
  ).toFixed(1);

  // ===== ⚠️ RISK ALERT =====
  const isDropComing = forecast1 < lastActual;

  // ===== PRODUCTS =====
  const topProducts = [
    "Pens",
    "Notebooks",
    "Backpacks",
    "Calculators",
    "Colors",
  ];
  const salesVolume = [1200, 950, 800, 450, 300];

  const topIndex = salesVolume.indexOf(Math.max(...salesVolume));
  const topProduct = topProducts[topIndex];

  const contribution = (
    (salesVolume[topIndex] / salesVolume.reduce((a, b) => a + b, 0)) *
    100
  ).toFixed(1);

  // ===== INVENTORY =====
  const underStockItems = [
    { name: "A4 Paper", current: 5, min: 20 },
    { name: "Blue Ink", current: 12, min: 50 },
    { name: "Drawing Pens", current: 3, min: 15 },
  ];

  // ===== CHART 1 =====
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
        markPoint: {
          data: [{ type: "max", name: "Peak" }],
        },
      },
    ],
  };

  // ===== CHART 2 =====
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
        itemStyle: {
          color: "#6366f1",
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        name: "Expected",
        type: "line",
        data: forecastedSales,
        smooth: true,
        lineStyle: {
          type: "dashed",
          width: 3,
          color: "#10b981",
        },
      },
    ],
  };

  // ===== CHART 3 =====
  const topProductsOption = {
    tooltip: {},
    xAxis: { type: "category", data: topProducts },
    yAxis: { type: "value" },
    series: [
      {
        data: salesVolume,
        type: "bar",
        itemStyle: {
          color: "#4f46e5",
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">📊 Business Overview</h1>
        <p className="text-sm text-slate-500">
          Simple insights about your sales and inventory
        </p>
      </div>

      {/* ⚠️ ALERT */}
      {isDropComing && (
        <div className="bg-yellow-100 p-4 rounded-xl text-yellow-800">
          ⚠️ Sales are expected to drop next month
        </div>
      )}

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card title="💰 Total Sales" value={`₤ ${totalRevenue}`} />
        <Card title="📈 Growth" value={`${growthPercent}%`} />
        <Card title="🏆 Best Month" value={months[bestMonthIndex]} />
        <Card title="🔮 Next Month" value={forecast1} />
        <Card title="🎯 Accuracy" value={`${accuracy}%`} />
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-bold text-lg">📈 Your Sales Growth</h2>
          <p className="text-sm text-gray-500 mb-2">
            Shows how your sales changed over time
          </p>

          <ReactECharts option={trendOption} style={{ height: 300 }} />

          <p className="text-green-600 text-sm mt-2">
            Sales increased by {growthPercent}% since May
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="font-bold text-lg">🔮 What Will Happen Next</h2>
          <p className="text-sm text-gray-500 mb-2">
            Blue = past, Green = expected future
          </p>

          <ReactECharts option={forecastOption} style={{ height: 300 }} />

          <p className="text-blue-600 text-sm mt-2">
            Expected next month: {forecast1}
          </p>
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="font-bold text-lg">🏆 Best Selling Products</h2>
        <p className="text-sm text-gray-500 mb-2">
          Products customers buy the most
        </p>

        <ReactECharts option={topProductsOption} style={{ height: 300 }} />

        <p className="text-purple-600 text-sm mt-2">
          🥇 {topProduct} generates {contribution}% of total sales
        </p>
      </div>

      {/* UNDER STOCK */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
        <h2 className="text-red-600 font-bold mb-3">⚠️ Low Stock Alert</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {underStockItems.map((item, i) => (
            <div key={i} className="bg-red-50 p-4 rounded-xl">
              <p className="font-semibold">{item.name}</p>

              <div className="flex justify-between text-sm mt-2">
                <span className="text-red-600 font-bold">{item.current}</span>
                <span>Min {item.min}</span>
              </div>

              <div className="h-2 bg-red-200 mt-2 rounded">
                <div
                  className="h-2 bg-red-500 rounded"
                  style={{
                    width: `${(item.current / item.min) * 100}%`,
                  }}
                />
              </div>

              <p className="text-xs text-red-600 mt-2">
                Order at least: {item.min * 3}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== COMPONENT =====
type CardProps = {
  title: string;
  value: string | number;
};

const Card = ({ title, value }: CardProps) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
  </div>
);

export default Analytics;
