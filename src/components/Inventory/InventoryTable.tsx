import type { InventoryRow } from "../../utils/types";
import {
  formatColumnName,
  renderCellValue,
} from "../../utils/inventoryFormatters";
import { Pen, Trash2 } from "lucide-react";

export type InventoryUpdatePayload = {
  productName: string;
  stock: number;
  price: number;
  minStock: number | null;
  orderAtLeast: number | null;
  avgDailyDemand: number | null;
  demand: string;
  trend: string;
};

type InventoryTableProps = {
  columns: string[];
  rows: InventoryRow[];
  pageStartIndex: number;
  onEditRow: (row: InventoryRow) => void;
  onDeleteRow: (row: InventoryRow) => void;
};

function InventoryTable({
  columns,
  rows,
  pageStartIndex,
  onEditRow,
  onDeleteRow,
}: InventoryTableProps) {
  if (columns.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-sm font-medium text-gray-500">
        No inventory data found.
      </div>
    );
  }

  const displayColumns = [...columns, "actions"];

  return (
    <table className="min-w-full border-collapse text-left text-sm">
      <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
        <tr>
          {displayColumns.map((column) => (
            <th key={column} className="whitespace-nowrap px-5 py-4">
              {formatColumnName(column)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {rows.length === 0 ? (
          <tr>
            <td
              colSpan={displayColumns.length}
              className="px-5 py-10 text-center text-sm font-medium text-gray-500"
            >
              No matching inventory rows found.
            </td>
          </tr>
        ) : (
          rows.map((row, rowIndex) => (
            <tr
              key={String(row.id ?? pageStartIndex + rowIndex)}
              className="transition hover:bg-indigo-50/40"
            >
              {displayColumns.map((column) => (
                <td
                  key={column}
                  className="whitespace-nowrap px-5 py-4 text-gray-700"
                >
                  {column === "actions" ? (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => onEditRow(row)}
                        className="group p-1 text-blue-600 transition-colors duration-200 hover:text-blue-800"
                        title="Edit inventory item"
                      >
                        <Pen
                          size={16}
                          className="inline-block transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-115"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteRow(row)}
                        className="group p-1 text-red-500 transition-colors duration-200 hover:text-red-700"
                        title="Delete inventory item"
                      >
                        <Trash2
                          size={16}
                          className="inline-block transition-transform duration-200 ease-out group-hover:rotate-6 group-hover:scale-115"
                        />
                      </button>
                    </div>
                  ) : column.toLowerCase().trim() === "id" ? (
                    pageStartIndex + rowIndex + 1
                  ) : (
                    renderCellValue(column, row[column])
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default InventoryTable;
