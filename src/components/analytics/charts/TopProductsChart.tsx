import ReactECharts from "echarts-for-react";

type Props = {
  option: any;
};

export const TopProductsChart = ({ option }: Props) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="font-bold text-lg">🏆 Top Selling Products</h2>
      <p className="text-sm text-gray-500 mb-2">
        Products with highest revenue contribution
      </p>

      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
};
