import ReactECharts from "echarts-for-react";

type Props = {
  option: any;
};

export const ForecastChart = ({ option }: Props) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="font-bold text-lg">🔮 Sales Forecast</h2>
      <p className="text-sm text-gray-500 mb-2">
        Blue = actual, Green = predicted
      </p>

      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
};
