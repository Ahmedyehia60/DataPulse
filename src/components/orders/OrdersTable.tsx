import {
  formatCurrency,
  formatOrderDate,
  statusClassName,
} from "../../utils/pagination";
import type { OrderItem } from "../../utils/types";

const orderGridStyle = {
  gridTemplateColumns:
    "80px 180px 160px minmax(240px, 1fr) 120px 150px 170px 130px",
};

type OrdersTableProps = {
  orders: OrderItem[];
};

function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1230px]">
        <div
          className="grid h-14 items-center gap-4 bg-gray-100 px-5 text-sm font-bold text-gray-600"
          style={orderGridStyle}
        >
          <p>ID</p>
          <p>Transaction No</p>
          <p>Date</p>
          <p>Product Name</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Total Cost</p>
          <p>Status</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-8 text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="grid min-h-16 items-center gap-4 border-b border-gray-100 bg-white px-5 py-3 text-sm hover:bg-gray-50"
              style={orderGridStyle}
            >
              <p className="font-medium text-gray-400">#{order.id}</p>

              <p className="font-semibold text-gray-900">
                {order.transaction_number}
              </p>

              <p className="text-gray-500">
                {formatOrderDate(order.transaction_date)}
              </p>

              <p className="break-words font-medium">{order.item_name}</p>

              <p>{order.quantity}</p>

              <p>{formatCurrency(order.price)}</p>

              <p className="font-semibold text-gray-900">
                {formatCurrency(order.total_price)}
              </p>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClassName(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrdersTable;
