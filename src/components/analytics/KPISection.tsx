import { Card } from "./Card";

const formatCurrency = (value: number | string) => {
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numeric)) return `$ ${value}`;
  return `$ ${Math.round(numeric).toLocaleString("en-US")}`;
};

const formatPercent = (value: number | string, decimals = 1) => {
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numeric)) return `${value}%`;
  return `${numeric.toFixed(decimals)}%`;
};

export const KPISection = ({
  totalRevenue,
  growthPercent,
  bestMonth,
  forecast1,
  accuracy,
}: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card title="💰 Total Sales" value={formatCurrency(totalRevenue)} />
      <Card title="📈 Growth" value={formatPercent(growthPercent)} />
      <Card title="🏆 Best Month" value={bestMonth} />
      <Card title="🔮 Next Month Sales" value={formatCurrency(forecast1)} />
      <Card title="🎯 Forecast Accuracy" value={formatPercent(accuracy)} />
    </div>
  );
};
