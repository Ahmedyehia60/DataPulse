import {
  formatCurrency,
  formatOrderDate,
  statusClassName,
} from "../../utils/pagination";
import type { OrderItem } from "../../utils/types";

type OrdersTableProps = {
  orders: OrderItem[];
  totalOrders: number;
  currentPage: number;
  pageSize: number;
};

function OrdersTable({
  orders,
  totalOrders,
  currentPage,
  pageSize,
}: OrdersTableProps) {
  const columns = [
    "id",
    "transaction_number",
    "transaction_date",
    "item_name",
    "quantity",
    "price",
    "total_price",
    "status",
  ];

  const formatColumnHeader = (key: string) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace("Transaction Number", "Transaction No")
      .replace("Item Name", "Product Name")
      .replace("Total Price", "Total Cost");
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
          <tr>
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap px-6 py-4">
                {formatColumnHeader(column)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm font-medium text-gray-500 bg-white"
              >
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order, rowIndex) => (
              <tr
                key={order.id}
                className="transition hover:bg-indigo-50/30 bg-white"
              >
                {columns.map((column) => {
                  const cellValue = order[column as keyof OrderItem];

                  return (
                    <td
                      key={column}
                      className="whitespace-nowrap px-6 py-4 text-gray-700"
                    >
                      {(() => {
                        switch (column) {
                          case "id":
                            const reverseId =
                              totalOrders -
                              (currentPage - 1) * pageSize -
                              rowIndex;
                            return (
                              <span className="font-medium text-gray-400">
                                #{reverseId}
                              </span>
                            );
                          case "transaction_number":
                            return (
                              <span className="font-semibold text-gray-900">
                                {cellValue}
                              </span>
                            );
                          case "transaction_date":
                            return formatOrderDate(cellValue as string);
                          case "item_name":
                            return (
                              <span className="wrap-break-word font-medium text-gray-900 max-w-60 block truncate">
                                {cellValue}
                              </span>
                            );
                          case "quantity":
                            return cellValue;
                          case "price":
                            return formatCurrency(cellValue as number);
                          case "total_price":
                            return (
                              <span className="font-semibold text-gray-900">
                                {formatCurrency(cellValue as number)}
                              </span>
                            );
                          case "status":
                            return (
                              <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClassName(
                                  cellValue as string,
                                )}`}
                              >
                                {cellValue}
                              </span>
                            );
                          default:
                            return String(cellValue);
                        }
                      })()}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
