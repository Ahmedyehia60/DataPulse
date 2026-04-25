import ReactECharts from "echarts-for-react";

const option = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["Nov 24", "Dec 1", "Dec 8", "Dec 15", "Dec 22"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Demand",
      type: "line",
      smooth: true,
      data: [1400, 1300, 800, 1100, 1400],
      lineStyle: {
        color: "#00A8A8",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(0,168,168,0.4)" },
            { offset: 1, color: "rgba(0,168,168,0)" },
          ],
        },
      },
    },
    {
      name: "Supply",
      type: "line",
      smooth: true,
      data: [1100, 900, 700, 800, 750],
      lineStyle: {
        color: "#FF6B35",
      },
      itemStyle: {
        color: "#FF6B35",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,107,53,0.4)" },
            { offset: 1, color: "rgba(255,107,53,0)" },
          ],
        },
      },
    },
  ],
};

export default function AreaChart() {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6">
      <p className="font-bold">Demand vs Supply Trend</p>
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
}
