import ReactECharts from "echarts-for-react";

export const SalesTrendChart = ({ option }: any) => {
  return <ReactECharts option={option} style={{ height: 300 }} />;
};
