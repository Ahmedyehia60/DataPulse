import { Box, TrendingDown, TrendingUp } from "lucide-react";
import type { DashboardStatBox } from "../hooks/useDashboardData";

type Props = {
  stat: DashboardStatBox;
};

const formatValue = (value: number, valueType: DashboardStatBox["valueType"]) => {
  const formatted = new Intl.NumberFormat("en").format(value);
  return valueType === "percent" ? `${formatted}%` : formatted;
};

const formatChange = (stat: DashboardStatBox) => {
  const value = stat.changePercent ?? stat.changeValue ?? 0;
  const prefix = value > 0 ? "+" : "";
  const suffix = stat.changePercent !== undefined ? "%" : "";
  return `${prefix}${value}${suffix}`;
};

function StatBox({ stat }: Props) {
  const isUp = stat.changeDirection === "up";
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-3">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h6 className="text-gray-500 font-medium text-md mb-2">
            {stat.title}
          </h6>
          <p className="font-bold text-2xl text-gray-900">
            {formatValue(stat.value, stat.valueType)}
          </p>
        </div>

        <div className="bg-blue-50 p-3 rounded-xl">
          <Box size={24} className="text-blue-600" />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold ${
            isUp ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
          }`}
        >
          <TrendIcon size={16} />
          <span>{formatChange(stat)}</span>
        </div>
        <span className="text-gray-400 text-sm">{stat.comparisonLabel}</span>
      </div>
    </div>
  );
}

export default StatBox;
