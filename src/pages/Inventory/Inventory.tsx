import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import type { InventoryRow } from "../../utils/types";
import InventoryTable from "../../components/Inventory/InventoryTable";
import type { InventoryUpdatePayload } from "../../components/Inventory/InventoryTable";
import Toolbar from "../../components/Toolbar";
import Pagination from "../../components/Pagination";

const MIN_DAILY_DEMAND_FOR_CRITICAL = 1;

type InventoryFormState = {
  productName: string;
  stock: string;
  price: string;
  minStock: string;
  orderAtLeast: string;
  avgDailyDemand: string;
  demand: string;
  trend: string;
};

function Inventory() {
  const [rows, setRows] = useState<InventoryRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();
  const [editingRow, setEditingRow] = useState<InventoryRow | null>(null);
  const [deletingRow, setDeletingRow] = useState<InventoryRow | null>(null);
  const [inventoryForm, setInventoryForm] = useState<InventoryFormState>({
    productName: "",
    stock: "0",
    price: "0",
    minStock: "",
    orderAtLeast: "",
    avgDailyDemand: "",
    demand: "",
    trend: "",
  });
  const [modalError, setModalError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const stockFilter = searchParams.get("filter");
  const isLowStockFilter = stockFilter === "low-stock";

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/api/inventory`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load inventory");
        }

        const result = await response.json();
        setRows(Array.isArray(result) ? result : result.data || []);
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

  const latestStockMonth = useMemo(() => {
    const months = rows
      .map((row) => String(row.stockMonth ?? row.month ?? ""))
      .filter(Boolean)
      .sort();

    return months.at(-1) ?? "";
  }, [rows]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rows.filter((row) => {
      const rowMonth = String(row.stockMonth ?? row.month ?? "");
      const isLatestMonth = !latestStockMonth || rowMonth === latestStockMonth;

      const stock = Number(row.stock ?? row.current ?? 0);
      const min = Number(row.minStock ?? row.min ?? row.min_stock ?? 10);
      const avgDailyDemand = Number(
        row.avgDailyDemand ?? row.avg_daily_demand ?? 0,
      );

      const matchesLowStock =
        !isLowStockFilter ||
        (isLatestMonth &&
          stock < min &&
          avgDailyDemand >= MIN_DAILY_DEMAND_FOR_CRITICAL);

      const matchesSearch =
        !query ||
        columns.some((column) =>
          String(row[column] ?? "")
            .toLowerCase()
            .includes(query),
        );

      return matchesLowStock && matchesSearch;
    });
  }, [columns, isLowStockFilter, latestStockMonth, rows, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const pageStartIndex = (currentPage - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  const paginatedRows = filteredRows.slice(pageStartIndex, pageEndIndex);
  const visibleStart = filteredRows.length === 0 ? 0 : pageStartIndex + 1;
  const visibleEnd = Math.min(pageEndIndex, filteredRows.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [isLowStockFilter, search, pageSize]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const handleOpenEditRow = (row: InventoryRow) => {
    setEditingRow(row);
    setModalError("");
    setInventoryForm({
      productName: String(row.productName ?? ""),
      stock: String(row.stock ?? 0),
      price: String(row.price ?? 0),
      minStock: String(row.minStock ?? row.min ?? ""),
      orderAtLeast: String(row.orderAtLeast ?? ""),
      avgDailyDemand: String(row.avgDailyDemand ?? ""),
      demand: String(row.demand ?? ""),
      trend: String(row.trend ?? ""),
    });
  };

  const parseOptionalNumber = (value: string) => {
    if (value.trim() === "") return null;
    return Number(value);
  };

  const handleUpdateRow = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingRow) return;

    const payload: InventoryUpdatePayload = {
      productName: inventoryForm.productName.trim(),
      stock: Number(inventoryForm.stock),
      price: Number(inventoryForm.price),
      minStock: parseOptionalNumber(inventoryForm.minStock),
      orderAtLeast: parseOptionalNumber(inventoryForm.orderAtLeast),
      avgDailyDemand: parseOptionalNumber(inventoryForm.avgDailyDemand),
      demand: inventoryForm.demand.trim(),
      trend: inventoryForm.trend.trim(),
    };

    if (
      !payload.productName ||
      !Number.isFinite(payload.stock) ||
      payload.stock < 0 ||
      !Number.isFinite(payload.price) ||
      payload.price < 0 ||
      Number.isNaN(payload.minStock) ||
      Number.isNaN(payload.orderAtLeast) ||
      Number.isNaN(payload.avgDailyDemand)
    ) {
      setModalError("Enter valid inventory values.");
      return;
    }

    try {
      setIsSaving(true);
      setModalError("");

      const response = await fetch(
        `${import.meta.env.VITE_API}/api/inventory/${editingRow.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setModalError(result.message || "Could not update inventory item.");
        return;
      }

      setRows((currentRows) =>
        currentRows.map((currentRow) =>
          currentRow.id === editingRow.id ? result : currentRow,
        ),
      );
      setEditingRow(null);
    } catch {
      setModalError("Server error while updating inventory item.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRow = async () => {
    if (!deletingRow) return;

    try {
      setIsSaving(true);
      setModalError("");

      const response = await fetch(
        `${import.meta.env.VITE_API}/api/inventory/${deletingRow.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setModalError(result.message || "Could not delete inventory item.");
        return;
      }

      setRows((currentRows) =>
        currentRows.filter((currentRow) => currentRow.id !== deletingRow.id),
      );
      setDeletingRow(null);
    } catch {
      setModalError("Server error while deleting inventory item.");
    } finally {
      setIsSaving(false);
    }
  };

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
            {isLowStockFilter
              ? "Showing critical low stock items with active demand."
              : "Showing the inventory data uploaded during onboarding."}
          </p>
        </div>

        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-black px-4 py-2.5 text-white shadow-sm transition-all hover:bg-gray-900 active:scale-95">
          <Plus size={20} />
          <span className="text-sm font-semibold">New Item</span>
        </button>
      </div>

      {isLowStockFilter && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Critical low stock filter active: {filteredRows.length} items found.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Toolbar
          search={search}
          pageSize={pageSize}
          onSearchChange={setSearch}
          onPageSizeChange={setPageSize}
        />

        <div className="overflow-x-auto">
          <InventoryTable
            columns={columns}
            rows={paginatedRows}
            pageStartIndex={pageStartIndex}
            onEditRow={handleOpenEditRow}
            onDeleteRow={(row) => {
              setDeletingRow(row);
              setModalError("");
            }}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          visibleStart={visibleStart}
          visibleEnd={visibleEnd}
          filteredCount={filteredRows.length}
          totalCount={rows.length}
          hasSearch={search.trim().length > 0 || isLowStockFilter}
          onPageChange={setCurrentPage}
        />
      </div>

      {editingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <form
            onSubmit={handleUpdateRow}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-black text-gray-950">
                Edit Inventory Item
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update product stock and planning values used by analytics.
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              {[
                ["productName", "Product name", "text"],
                ["stock", "Stock", "number"],
                ["price", "Price", "number"],
                ["minStock", "Minimum stock", "number"],
                ["orderAtLeast", "Order at least", "number"],
                ["avgDailyDemand", "Average daily demand", "number"],
                ["demand", "Demand", "text"],
                ["trend", "Trend", "text"],
              ].map(([key, label, type]) => {
                // Check if the current field should be read-only
                const isReadOnly = [
                  "Average daily demand",
                  "Trend",
                  "Demand",
                  "Minimum stock",
                  "Order at least",
                ].includes(label);

                return (
                  <label
                    key={key}
                    className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700"
                  >
                    {label}
                    <input
                      type={type}
                      min={type === "number" ? "0" : undefined}
                      step={type === "number" ? "0.01" : undefined}
                      value={inventoryForm[key as keyof InventoryFormState]}
                      onChange={(event) =>
                        setInventoryForm((form) => ({
                          ...form,
                          [key]: event.target.value,
                        }))
                      }
                      
                      readOnly={isReadOnly}
                      className={`rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 ${
                        isReadOnly
                          ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </label>
                );
              })}
            </div>
            {modalError && (
              <div className="mx-6 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {modalError}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setEditingRow(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white disabled:bg-gray-300"
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {deletingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-gray-950">
              Delete Inventory Item
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Delete {String(deletingRow.productName ?? "this item")}? This
              removes it from inventory views and analytics input.
            </p>

            {modalError && (
              <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {modalError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingRow(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleDeleteRow}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:bg-gray-300"
              >
                {isSaving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
