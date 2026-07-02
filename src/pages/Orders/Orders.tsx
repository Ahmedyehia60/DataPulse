import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { OrderItem, OrderStatus } from "../../utils/types";
import OrdersTable from "../../components/orders/OrdersTable";
import OrderStatusFilters from "../../components/orders/OrderStatusFilters";
import Toolbar from "../../components/Toolbar";
import Pagination from "../../components/Pagination";
import { downloadCSV } from "../../utils/downloadCSV";

const Orders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus>("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.item_name.toLowerCase().includes(query) ||
        order.transaction_number.toLowerCase().includes(query);

      const matchesFilter = order.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [filterStatus, orders, search]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const pageStartIndex = (currentPage - 1) * pageSize;
  const pageEndIndex = pageStartIndex + pageSize;
  const paginatedOrders = filteredOrders.slice(pageStartIndex, pageEndIndex);
  const visibleStart = filteredOrders.length === 0 ? 0 : pageStartIndex + 1;
  const visibleEnd = Math.min(pageEndIndex, filteredOrders.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, pageSize, search]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);
  const handleExport = () => {
    downloadCSV({
      data: filteredOrders,
      filename: "orders_report",
      columns: [
        { header: "Transaction Number", key: "transaction_number" },
        { header: "Product Name", key: "item_name" },
        { header: "Current Status", key: "status" },
      ],
    });
  };
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center font-semibold text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage customer orders from uploaded documents.
          </p>
        </div>

        <button
          className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
          onClick={handleExport}
        >
          <Download
            size={20}
            className="text-gray-500 group-hover:text-blue-600"
          />
          <span className="text-sm font-semibold">Export CSV</span>
        </button>
      </div>

      <OrderStatusFilters
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
      />

      <div className="mt-7 flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <Toolbar
          search={search}
          pageSize={pageSize}
          onSearchChange={setSearch}
          onPageSizeChange={setPageSize}
        />

        <OrdersTable
          orders={paginatedOrders}
          totalOrders={filteredOrders.length}
          currentPage={currentPage}
          pageSize={pageSize}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          visibleStart={visibleStart}
          visibleEnd={visibleEnd}
          filteredCount={filteredOrders.length}
          totalCount={orders.length}
          hasSearch={search.trim().length > 0}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Orders;
