import {
  Box,
  Warehouse,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from "lucide-react";

// 1. تعريف نوع البيانات لكل كارد (TypeScript Type)
type StatItem = {
  id: number;
  title: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trendText: string;
  trendIcon: LucideIcon;
  trendBg: string;
  trendColor: string;
};

// 2. الـ Array اللي بيحتوي على بيانات الـ 4 كاردز بالظبط كما في الصورة
const statsData: StatItem[] = [
  {
    id: 1,
    title: "Total Products",
    value: "1,250",
    icon: Box,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trendText: "+2.5%",
    trendIcon: ArrowUpRight,
    trendBg: "bg-green-50",
    trendColor: "text-green-600",
  },
  {
    id: 2,
    title: "Capacity Used",
    value: "78%",
    icon: Warehouse,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    trendText: "+5%",
    trendIcon: ArrowDownRight, // السهم المائل لأسفل المتعرج في الصورة
    trendBg: "bg-red-50",
    trendColor: "text-red-500",
  },
  {
    id: 3,
    title: "Inventory Shortage",
    value: "12",
    icon: AlertTriangle,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    trendText: "-2",
    trendIcon: ArrowUpRight,
    trendBg: "bg-green-50",
    trendColor: "text-green-600",
  },
  {
    id: 4,
    title: "Growth Index",
    value: "+14.5%",
    icon: TrendingUp,
    iconBg: "bg-green-50/50",
    iconColor: "text-green-600",
    trendText: "+1.2%",
    trendIcon: ArrowUpRight,
    trendBg: "bg-green-50",
    trendColor: "text-green-600",
  },
];

function StatBoxesGroup() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((item) => {
        const Icon = item.icon;
        const TrendIcon = item.trendIcon;

        return (
          <div
            key={item.id}
            className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h6 className="mb-1 text-sm font-medium text-gray-400">
                  {item.title}
                </h6>
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              </div>

              <div className={`rounded-xl p-2.5 ${item.iconBg}`}>
                <Icon size={22} className={item.iconColor} />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <div
                className={`flex items-center gap-0.5 rounded-lg px-2 py-0.5 text-xs font-bold ${item.trendBg} ${item.trendColor}`}
              >
                <TrendIcon size={14} />
                <span>{item.trendText}</span>
              </div>
              <span className="text-xs font-medium text-gray-400">
                vs last month
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatBoxesGroup;
