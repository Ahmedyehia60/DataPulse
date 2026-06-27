import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { InventoryRow } from "../../utils/types";
import InventoryPagination from "../../components/Inventory/InventoryPagination";
import InventoryTable from "../../components/Inventory/InventoryTable";
import InventoryToolbar from "../../components/Inventory/InventoryToolbar";

function Inventory() {
  const [rows, setRows] = useState<InventoryRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const pageStartIndex = (currentPage - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  const paginatedRows = filteredRows.slice(pageStartIndex, pageEndIndex);
  const visibleStart = filteredRows.length === 0 ? 0 : pageStartIndex + 1;
  const visibleEnd = Math.min(pageEndIndex, filteredRows.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, pageSize]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

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

        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-black px-4 py-2.5 text-white shadow-sm transition-all hover:bg-gray-900 active:scale-95">
          <Plus size={20} />
          <span className="text-sm font-semibold">New Item</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <InventoryToolbar
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
          />
        </div>

        <InventoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          visibleStart={visibleStart}
          visibleEnd={visibleEnd}
          filteredCount={filteredRows.length}
          totalCount={rows.length}
          hasSearch={search.trim().length > 0}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Inventory;
