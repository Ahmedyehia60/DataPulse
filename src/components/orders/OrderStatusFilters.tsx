import type { OrderStatus } from "../../utils/types";

type OrderStatusFiltersProps = {
  filterStatus: OrderStatus;
  onFilterStatusChange: (status: OrderStatus) => void;
};

function OrderStatusFilters({
  filterStatus,
  onFilterStatusChange,
}: OrderStatusFiltersProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
      {(["active", "archive"] as OrderStatus[]).map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onFilterStatusChange(status)}
          className={`cursor-pointer rounded-2xl border px-6 py-2.5 text-sm font-semibold capitalize transition-all ${
            filterStatus === status
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default OrderStatusFilters;
