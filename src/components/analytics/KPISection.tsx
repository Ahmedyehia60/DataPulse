import { Card } from "./Card";

export const KPISection = ({
  totalRevenue,
  growthPercent,
  bestMonth,
  forecast1,
  accuracy,
}: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card title="💰 Total Sales" value={`₤ ${totalRevenue}`} />
      <Card title="📈 Growth" value={`${growthPercent}%`} />
      <Card title="🏆 Best Month" value={bestMonth} />
      <Card title="🔮 Next Month" value={forecast1} />
      <Card title="🎯 Accuracy" value={`${accuracy}%`} />
    </div>
  );
};
