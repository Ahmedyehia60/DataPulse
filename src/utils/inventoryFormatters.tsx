import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const formatColumnName = (column: string) =>
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

export const renderCellValue = (
  column: string,
  value: string | number | boolean | null,
) => {
  const cellValue = String(value ?? "");
  const normalizedColumn = column.toLowerCase();
  const normalizedValue = cellValue.trim().toLowerCase();

  if (normalizedColumn === "demand") {
    return (
      <span
        className={`inline-flex min-w-20 justify-center rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${demandClassName(cellValue)}`}
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
