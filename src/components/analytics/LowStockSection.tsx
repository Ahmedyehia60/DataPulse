import { useNavigate } from "react-router-dom";

type Item = {
  name: string;
  current: number;
  min: number;
  orderAtLeast?: number;
};

type Props = {
  items: Item[];
  totalCount: number;
};

export const LowStockSection = ({ items, totalCount }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-red-600 font-bold">Low Stock Alert</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showing top {items.length} of {totalCount} critical items.
          </p>
        </div>

        <button
          onClick={() => navigate("/inventory?filter=low-stock")}
          className="w-fit rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          View all low stock items
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const percent =
            item.min > 0 ? Math.min((item.current / item.min) * 100, 100) : 0;

          return (
            <div key={`${item.name}-${i}`} className="bg-red-50 p-4 rounded-xl">
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
                Order at least: {item.orderAtLeast ?? item.min * 3}
              </p>
            </div>
          );
        })}

        {items.length === 0 && (
          <p className="text-sm text-slate-500">No low stock items found.</p>
        )}
      </div>
    </div>
  );
};
