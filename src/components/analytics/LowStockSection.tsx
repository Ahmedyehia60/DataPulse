type Item = {
  name: string;
  current: number;
  min: number;
};

type Props = {
  items: Item[];
};

export const LowStockSection = ({ items }: Props) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
      <h2 className="text-red-600 font-bold mb-3">⚠️ Low Stock Alert</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const percent = (item.current / item.min) * 100;

          return (
            <div key={i} className="bg-red-50 p-4 rounded-xl">
              <p className="font-semibold">{item.name}</p>

              <div className="flex justify-between text-sm mt-2">
                <span className="text-red-600 font-bold">{item.current}</span>
                <span>Min {item.min}</span>
              </div>

              <div className="h-2 bg-red-200 mt-2 rounded">
                <div
                  className="h-2 bg-red-500 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-xs text-red-600 mt-2">
                Order at least: {item.min * 3}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
