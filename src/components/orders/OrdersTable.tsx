import { Pen, Trash2 } from "lucide-react";
import {
  formatCurrency,
  formatOrderDate,
  statusClassName,
} from "../../utils/pagination";
import type { OrderItem, OrderStatus } from "../../utils/types";

export type OrderUpdatePayload = {
  transactionDate: string;
  quantity: number;
  price: number;
  status: OrderStatus;
};

type OrdersTableProps = {
  orders: OrderItem[];
  totalOrders: number;
  currentPage: number;
  pageSize: number;
  onEditOrder: (order: OrderItem) => void;
  onDeleteOrder: (order: OrderItem) => void;
};

function OrdersTable({
  orders,
  totalOrders,
  currentPage,
  pageSize,
  onEditOrder,
  onDeleteOrder,
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
    "actions",
  ];

  const formatColumnHeader = (key: string) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace("Transaction Number", "Transaction No")
      .replace("Item Name", "Product Name")
      .replace("Total Price", "Total Cost")
      .replace("Actions", "Actions");
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
                  const isDataColumn = column !== "actions";
                  const cellValue = isDataColumn
                    ? order[column as keyof OrderItem]
                    : null;

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
                                {cellValue as React.ReactNode}
                              </span>
                            );
                          case "transaction_date":
                            return formatOrderDate(cellValue as string);
                          case "item_name":
                            return (
                              <span className="wrap-break-word font-medium text-gray-900 max-w-60 block truncate">
                                {cellValue as React.ReactNode}
                              </span>
                            );
                          case "quantity":
                            return cellValue as React.ReactNode;
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
                                {cellValue as React.ReactNode}
                              </span>
                            );

                          case "actions":
                            return (
                              <div className="flex items-center gap-4">
                               
                                <button
                                  onClick={() => onEditOrder(order)}
                                  className="group p-1 text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                                  title="Edit Order"
                                >
                                  <Pen
                                    size={16}
                                    className="inline-block transition-transform duration-200 ease-out group-hover:scale-115 group-hover:-translate-y-0.5"
                                  />
                                </button>

                                
                                <button
                                  onClick={() => onDeleteOrder(order)}
                                  className="group p-1 text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                                  title="Delete Order"
                                >
                                  <Trash2
                                    size={16}
                                    className="inline-block transition-transform duration-200 ease-out group-hover:scale-115 group-hover:rotate-6"
                                  />
                                </button>
                              </div>
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
