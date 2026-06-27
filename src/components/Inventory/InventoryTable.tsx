import type { InventoryRow } from "../../utils/types";
import {
  formatColumnName,
  renderCellValue,
} from "../../utils/inventoryFormatters";

type InventoryTableProps = {
  columns: string[];
  rows: InventoryRow[];
  pageStartIndex: number;
};

function InventoryTable({
  columns,
  rows,
  pageStartIndex,
}: InventoryTableProps) {
  if (columns.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-sm font-medium text-gray-500">
        No inventory data found.
      </div>
    );
  }

  return (
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
        {rows.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
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
              {columns.map((column) => (
                <td
                  key={column}
                  className="whitespace-nowrap px-5 py-4 text-gray-700"
                >
                  {renderCellValue(column, row[column])}
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
