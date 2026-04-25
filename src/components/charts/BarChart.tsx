import ReactECharts from "echarts-for-react";

const option = {
  xAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#E0E0E0",
      },
    },
  },
  yAxis: {
    type: "category",
    data: ["Prod 1", "Prod 2", "Prod 3", "Prod 4", "Prod 5", "Prod 6"],
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      name: "Inventory",
      type: "bar",
      data: [120, 200, 150, 80, 70, 110],
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
      data: [90, 130, 110, 60, 55, 95],
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
};
export default function BarChart() {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6">
      <p className="font-bold">Inventory vs Store</p>
      <p className="font-light">Real time stock comparison</p>
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
}
