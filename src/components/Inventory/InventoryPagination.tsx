import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPageNumbers } from "../../utils/pagination";

type InventoryPaginationProps = {
  currentPage: number;
  totalPages: number;
  visibleStart: number;
  visibleEnd: number;
  filteredCount: number;
  totalCount: number;
  hasSearch: boolean;
  onPageChange: (page: number) => void;
};

function InventoryPagination({
  currentPage,
  totalPages,
  visibleStart,
  visibleEnd,
  filteredCount,
  totalCount,
  hasSearch,
  onPageChange,
}: InventoryPaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 text-xs font-medium text-gray-500 md:flex-row md:items-center md:justify-between">
      <span>
        Showing {visibleStart}-{visibleEnd} of {filteredCount} rows
        {hasSearch ? ` filtered from ${totalCount}` : ""}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-gray-700 disabled:opacity-40"
        >
          <ArrowLeft size={14} />
          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-bold ${
                currentPage === page
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <span className="text-xs font-semibold text-gray-500 sm:hidden">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-gray-700 disabled:opacity-40"
        >
          Next
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default InventoryPagination;
