import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Plus, Search } from "lucide-react";

type InventoryRow = Record<string, string | number | boolean | null>;

const formatColumnName = (column: string) =>
  column
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());

const demandClassName = (value: string) => {
  const normalized = value.trim().toLowerCase();

  if (normalized === "critical") return "bg-red-100 text-red-700 ring-red-200";
  if (normalized === "high")
    return "bg-orange-100 text-orange-700 ring-orange-200";
  if (normalized === "normal")
    return "bg-emerald-100 text-emerald-700 ring-emerald-200";

  return "bg-gray-100 text-gray-700 ring-gray-200";
};

const renderCellValue = (
  column: string,
  value: string | number | boolean | null,
) => {
  const cellValue = String(value ?? "");
  const normalizedColumn = column.toLowerCase();
  const normalizedValue = cellValue.trim().toLowerCase();

  if (normalizedColumn === "demand") {
    return (
      <span
        className={`inline-flex min-w-20 justify-center rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${demandClassName(
          cellValue,
        )}`}
      >
        {cellValue}
      </span>
    );
  }

  if (normalizedColumn === "trend") {
    if (normalizedValue === "up") {
      return (
        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
          <ArrowUpRight size={16} />
          Up
        </span>
      );
    }

    if (normalizedValue === "down") {
      return (
        <span className="inline-flex items-center gap-1.5 font-semibold text-rose-600">
          <ArrowDownRight size={16} />
          Down
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-gray-500">
        <span className="h-px w-3 bg-gray-400" />
        Stable
      </span>
    );
  }

  if (normalizedColumn === "stock") {
    const stock = Number(value);
    const isLowStock = !Number.isNaN(stock) && stock <= 20;

    return (
      <span
        className={
          isLowStock
            ? "inline-flex rounded-md bg-red-50 px-2.5 py-1 font-bold text-red-700 ring-1 ring-red-100"
            : "font-semibold text-gray-900"
        }
      >
        {cellValue}
      </span>
    );
  }

  return cellValue;
};

function Inventory() {
  const [rows, setRows] = useState<InventoryRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/inventory", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to load inventory");
        }

        const result = await response.json();
        setRows(result.data || []);
      } catch {
        setError("Could not load inventory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const columns = useMemo(() => {
    if (rows.length === 0) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) =>
      columns.some((column) =>
        String(row[column] ?? "")
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [columns, rows, search]);

  const criticalCount = rows.filter(
    (row) =>
      String(row.demand ?? "")
        .trim()
        .toLowerCase() === "critical",
  ).length;

  const trendingUpCount = rows.filter(
    (row) =>
      String(row.trend ?? "")
        .trim()
        .toLowerCase() === "up",
  ).length;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm font-semibold text-gray-500">
        Loading inventory...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">Inventory</h1>
          <p className="mt-1 text-sm text-gray-500">
            Showing the inventory data uploaded during onboarding.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 cursor-pointer bg-black border border-gray-200 text-white rounded-xl shadow-sm hover:bg-black-400 transition-all active:scale-95 group">
          <Plus size={20}/>

          <span className="font-semibold text-sm">New Item</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex h-11 w-full items-center rounded-xl bg-gray-50 px-3 ring-1 ring-gray-100 md:max-w-sm">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search inventory..."
              className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {columns.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm font-medium text-gray-500">
              No inventory data found.
            </div>
          ) : (
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
                <tr>
                  {columns.map((column) => (
                    <th key={column} className="whitespace-nowrap px-5 py-4">
                      {formatColumnName(column)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredRows.map((row, rowIndex) => (
                  <tr
                    key={String(row.id ?? rowIndex)}
                    className="transition hover:bg-indigo-50/40"
                  >
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="whitespace-nowrap px-5 py-4 text-gray-700"
                      >
                        {renderCellValue(column, row[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 text-xs font-medium text-gray-500">
          Showing {filteredRows.length} of {rows.length} rows
        </div>
      </div>
    </div>
  );
}

export default Inventory;
