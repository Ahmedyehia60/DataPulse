import ReactECharts from "echarts-for-react";
import type { DashboardData } from "../../hooks/useDashboardData";

type Props = {
  chart: DashboardData["demandSupplyTrendChart"];
};

const buildOption = (chart: Props["chart"]) => ({
  tooltip: {
    trigger: "axis",
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderWidth: 1,
    textStyle: {
      color: "#333",
    },
  },

  grid: {
    left: "3%",
    right: "3%",
    bottom: "5%",
    top: "10%",
    containLabel: true,
  },

  xAxis: {
    type: "category",
    boundaryGap: false,
    data: chart.labels,
    axisLine: {
      lineStyle: {
        color: "#eee",
      },
    },
    axisTick: { show: false },
    axisLabel: {
      color: "#888",
    },
  },

  yAxis: {
    type: "value",
    min: 0,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: "#888",
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#e5e7eb",
      },
    },
  },

  series: [
    {
      name: "Demand",
      type: "line",
      smooth: 0.4,
      symbol: "none",
      lineStyle: {
        width: 2,
        color: "#0ea5a4",
      },
      data: chart.demandUnits,
      areaStyle: {
        opacity: 1,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(14,165,164,0.25)" },
            { offset: 1, color: "rgba(14,165,164,0.02)" },
          ],
        },
      },
    },

    {
      name: "Supply",
      type: "line",
      smooth: 0.4,
      symbol: "none",
      lineStyle: {
        width: 2,
        color: "#f97316",
      },
      data: chart.supplyUnits,
      areaStyle: {
        opacity: 1,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(249,115,22,0.25)" },
            { offset: 1, color: "rgba(249,115,22,0.02)" },
          ],
        },
      },
    },
  ],
});

export default function AreaChart({ chart }: Props) {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <p className="font-bold">Demand vs Supply Trend</p>
        <select
          name="selectBox"
          id="selectBox"
          className="cursor-pointer border-none bg-gray-100 p-1 rounded-2xl"
        >
          <option value="1">Last 6 Months</option>
          <option value="1">Last Year</option>
        </select>
      </div>

      <ReactECharts option={buildOption(chart)} style={{ height: 650 }} />
    </div>
  );
}
