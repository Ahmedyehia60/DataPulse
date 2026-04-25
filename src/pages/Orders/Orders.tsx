import { CalendarDays, Download, Search } from "lucide-react";

const Orders = () => {
  const data = [
    {
      id: "ORD-5000",
      date: "2026-04-26",
      product: "Product A-0",
      qty: 10,
      price: "$319.00",
      total: "$3190.00",
      status: "Pending",
    },
    {
      id: "ORD-5001",
      date: "2026-04-25",
      product: "Product B-1",
      qty: 7,
      price: "$266.00",
      total: "$1862.00",
      status: "Completed",
    },
    {
      id: "ORD-5002",
      date: "2026-04-24",
      product: "Product C-2",
      qty: 10,
      price: "$286.00",
      total: "$2860.00",
      status: "Completed",
    },
    {
      id: "ORD-5003",
      date: "2026-04-23",
      product: "Product D-3",
      qty: 2,
      price: "$387.00",
      total: "$774.00",
      status: "Completed",
    },
    {
      id: "ORD-5004",
      date: "2026-04-22",
      product: "Product E-4",
      qty: 1,
      price: "$16.00",
      total: "$16.00",
      status: "Completed",
    },
    {
      id: "ORD-5005",
      date: "2026-04-21",
      product: "Product F-5",
      qty: 2,
      price: "$107.00",
      total: "$214.00",
      status: "Pending",
    },
    {
      id: "ORD-5006",
      date: "2026-04-20",
      product: "Product G-6",
      qty: 9,
      price: "$433.00",
      total: "$3897.00",
      status: "Completed",
    },
    {
      id: "ORD-5007",
      date: "2026-04-19",
      product: "Product H-7",
      qty: 7,
      price: "$137.00",
      total: "$959.00",
      status: "Completed",
    },
    {
      id: "ORD-5008",
      date: "2026-04-18",
      product: "Product I-8",
      qty: 3,
      price: "$365.00",
      total: "$1095.00",
      status: "Completed",
    },
    {
      id: "ORD-5009",
      date: "2026-04-17",
      product: "Product J-9",
      qty: 8,
      price: "$158.00",
      total: "$1264.00",
      status: "Completed",
    },
    {
      id: "ORD-5010",
      date: "2026-04-16",
      product: "Product K-10",
      qty: 7,
      price: "$329.00",
      total: "$2303.00",
      status: "Pending",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
    {
      id: "ORD-5011",
      date: "2026-04-15",
      product: "Product L-11",
      qty: 3,
      price: "$227.00",
      total: "$681.00",
      status: "Completed",
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-sm mt-1 text-gray-500">
            Track and manage customer orders.
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
        <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-2xl  hover:bg-gray-200 text-sm font-semibold">
          All
        </button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-2xl  hover:bg-gray-200 text-sm font-semibold">
          Complete
        </button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-2xl  hover:bg-gray-200 text-sm font-semibold">
          Pending
        </button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-2xl  hover:bg-gray-200 text-sm font-semibold">
          Cancelled
        </button>
      </div>

      <div className="mt-7 border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col md:flex-row gap-3 p-4 items-start md:items-center justify-between bg-white">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-full md:max-w-md focus-within:ring-2 focus-within:ring-gray-500">
            <Search className="text-gray-500 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search orders..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl  hover:bg-gray-50 transition-all active:scale-95">
            <CalendarDays size={20} className="text-gray-500" />
            <span className="font-semibold text-sm">Data Range</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 min-w-full w-max lg:w-full bg-gray-100 h-14 px-4 items-center text-sm font-bold text-gray-600 sticky top-0 z-10">
            <p>Order ID</p>
            <p>Date</p>
            <p>Product Name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total Cost</p>
            <p>Status</p>
          </div>

         
          <div className="max-h-[calc(90vh-300px)] overflow-y-auto min-w-full w-max lg:w-full">
            {data.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-7 px-4 py-4 border-b border-gray-100 items-center text-sm hover:bg-gray-50 bg-white"
              >
                <p className="font-medium">{order.id}</p>
                <p className="text-gray-500">{order.date}</p>
                <p className="font-medium">{order.product}</p>
                <p>{order.qty}</p>
                <p>{order.price}</p>
                <p className="font-semibold">{order.total}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${order.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
