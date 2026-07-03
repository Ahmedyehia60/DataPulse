import { useEffect, useState } from "react";

type ReorderItem = {
  productName: string;
  currentStock: number;
  safetyStock: number;
  avgDailyDemand: number;
  suggestedOrder: number;
  priority: "High" | "Medium" | "Low";
  reason: string;
};

const priorityClass = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-orange-100 text-orange-700",
  Low: "bg-emerald-100 text-emerald-700",
};

function SmartReorderPlan() {
  const [items, setItems] = useState<ReorderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/reorder-plan`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading reorder plan...</div>;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-950">Smart Reorder Plan</h2>
        <p className="text-sm text-gray-500">
          Suggested purchase quantities based on safety stock and demand.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No reorder suggestions needed.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-3 py-3">Product</th>
                <th className="px-3 py-3">Current</th>
                <th className="px-3 py-3">Safety</th>
                <th className="px-3 py-3">Suggested Order</th>
                <th className="px-3 py-3">Priority</th>
                <th className="px-3 py-3">Reason</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.productName}>
                  <td className="px-3 py-3 font-semibold text-gray-900">
                    {item.productName}
                  </td>
                  <td className="px-3 py-3">{item.currentStock}</td>
                  <td className="px-3 py-3">{item.safetyStock}</td>
                  <td className="px-3 py-3 font-bold">{item.suggestedOrder}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityClass[item.priority]}`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-500">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SmartReorderPlan;
