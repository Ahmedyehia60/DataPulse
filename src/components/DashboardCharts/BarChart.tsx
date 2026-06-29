import ReactECharts from "echarts-for-react";
import TrendingProducts from "../TrendingProducts";
import type { DashboardData } from "../../hooks/useDashboardData";

type Props = {
  chart: DashboardData["topTrendingStockChart"];
};

const buildOption = (chart: Props["chart"]) => ({
  xAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#E0E0E0",
      },
    },
  },
  tooltip: {
    trigger: "axis",
  },
  yAxis: {
    type: "category",
    data: chart.products.map((product) => product.name),
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      name: "Inventory",
      type: "bar",
      data: chart.products.map((product) => product.currentStock),
      itemStyle: {
        color: "#F4511E",
        borderRadius: [0, 5, 5, 0],
      },
      barWidth: "25%",
      barGap: "20%",
    },
    {
      name: "Store",
      type: "bar",
      data: chart.products.map((product) =>
        Math.round(product.currentStock * (1 + product.growthPercent / 100)),
      ),
      itemStyle: {
        color: "#1A535C",
        borderRadius: [0, 5, 5, 0],
      },
      barWidth: "25%",
    },
  ],
  grid: {
    top: "10%",
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
});

export default function BarChart({ chart }: Props) {
  return (
    <div>
      <div className="border-b border-gray-200 p-3">
        <p className="font-bold">{chart.title}</p>
        <p className="font-light">{chart.subtitle}</p>
        <ReactECharts option={buildOption(chart)} style={{ height: 300 }} />
      </div>
      <TrendingProducts products={chart.products} />
    </div>
  );
}
