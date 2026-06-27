import { useEffect, useState } from "react";
import { CalendarDays, Download, Search } from "lucide-react";

interface OrderItem {
  id: number;
  transaction_number: string;
  transaction_date: string;
  item_name: string;
  quantity: number;
  price: string | number;
  total_price: string | number;
  status: "active" | "archive";
}

const Orders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"active" | "archive">(
    "active",
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          credentials: "include",
        });
        if (response.ok) {
          const result = await response.json();
          setOrders(result.data || result);
        }
      } catch (error) {
        console.error("🚨 Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.item_name.toLowerCase().includes(search.toLowerCase()) ||
      order.transaction_number.includes(search);

    const matchesFilter = order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-sm mt-1 text-gray-500">
            Track and manage customer orders from uploaded documents.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 cursor-pointer bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50 transition-all active:scale-95 group">
          <Download
            size={20}
            className="text-gray-500 group-hover:text-blue-600"
          />
          <span className="font-semibold text-sm">Export CSV</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mt-8">
        <button
          onClick={() => setFilterStatus("active")}
          className={`cursor-pointer px-6 py-2.5 border rounded-2xl text-sm font-semibold transition-all ${filterStatus === "active" ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilterStatus("archive")}
          className={`cursor-pointer px-6 py-2.5 border rounded-2xl text-sm font-semibold transition-all ${filterStatus === "archive" ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`}
        >
          Archive
        </button>
      </div>

      <div className="mt-7 border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col md:flex-row gap-3 p-4 items-start md:items-center justify-between bg-white">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-full md:max-w-md focus-within:ring-2 focus-within:ring-gray-500">
            <Search className="text-gray-500 w-4 h-4 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or transaction number..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all active:scale-95">
            <CalendarDays size={20} className="text-gray-500" />
            <span className="font-semibold text-sm">Date Range</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 min-w-full w-max lg:w-full bg-gray-100 h-14 px-4 items-center text-sm font-bold text-gray-600 sticky top-0 z-10">
            <p>ID</p>
            <p>Transaction No</p>
            <p>Date</p>
            <p>Product Name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total Cost</p>
            <p>Status</p>
          </div>

          <div className="max-h-[calc(90vh-300px)] overflow-y-auto min-w-full w-max lg:w-full">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500 bg-white">
                No orders found.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-8 px-4 py-4 border-b border-gray-100 items-center text-sm hover:bg-gray-50 bg-white"
                >
                  <p className="font-medium text-gray-400">#{order.id}</p>
                  <p className="font-semibold text-gray-900">
                    {order.transaction_number}
                  </p>

                  <p className="text-gray-500">
                    {new Date(order.transaction_date).toLocaleDateString(
                      "en-US",
                    )}
                  </p>
                  <p className="font-medium">{order.item_name}</p>
                  <p>{order.quantity}</p>
                  <p>${Number(order.price).toFixed(2)}</p>
                  <p className="font-semibold text-gray-900">
                    ${Number(order.total_price).toFixed(2)}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                      order.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
