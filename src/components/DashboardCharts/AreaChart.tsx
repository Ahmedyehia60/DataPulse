import ReactECharts from "echarts-for-react";

const option = {
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
    data: [
      "Feb 8",
      "Feb 15",
      "Feb 22",
      "Mar 1",
      "Mar 8",
      "Mar 15",
      "Mar 22",
      "Mar 29",
      "Apr 5",
      "Apr 12",
      "Apr 19",
      "Apr 26",
    ],
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
      data: [
        700, 1200, 1350, 1350, 950, 1100, 1300, 1550, 1500, 1300, 1100, 1600,
      ],
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
      data: [950, 1250, 1220, 800, 1100, 550, 950, 850, 1300, 600, 950, 700],
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
};
export default function AreaChart() {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6">
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

      <ReactECharts option={option} style={{ height: 650 }} />
    </div>
  );
}
