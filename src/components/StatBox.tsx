import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Box,
  TrendingUp,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { DashboardStatBox } from "../hooks/useDashboardData";

type Props = {
  stat: DashboardStatBox;
};

const statIcons: Record<
  string,
  {
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
  }
> = {
  "Total Products": {
    icon: Box,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  "Capacity Used": {
    icon: Warehouse,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  "Inventory Shortage": {
    icon: AlertTriangle,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  "Growth Index": {
    icon: TrendingUp,
    iconBg: "bg-green-50/50",
    iconColor: "text-green-600",
  },
};

const defaultIcon = {
  icon: Box,
  iconBg: "bg-blue-50",
  iconColor: "text-blue-600",
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
  const iconConfig = statIcons[stat.title] ?? defaultIcon;
  const Icon = iconConfig.icon;
  const TrendIcon = stat.changeDirection === "up" ? ArrowUpRight : ArrowDownRight;
  const trendClass =
    stat.changeDirection === "up"
      ? "bg-green-50 text-green-600"
      : "bg-red-50 text-red-500";

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h6 className="mb-1 text-sm font-medium text-gray-400">
            {stat.title}
          </h6>
          <p className="text-3xl font-bold text-gray-900">
            {formatValue(stat.value, stat.valueType)}
          </p>
        </div>

        <div className={`rounded-xl p-2.5 ${iconConfig.iconBg}`}>
          <Icon size={22} className={iconConfig.iconColor} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <div
          className={`flex items-center gap-0.5 rounded-lg px-2 py-0.5 text-xs font-bold ${trendClass}`}
        >
          <TrendIcon size={14} />
          <span>{formatChange(stat)}</span>
        </div>
        <span className="text-xs font-medium text-gray-400">
          {stat.comparisonLabel}
        </span>
      </div>
    </div>
  );
}

export default StatBox;
