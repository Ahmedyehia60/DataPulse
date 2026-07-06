import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Download } from "lucide-react";
import type { OrderItem, OrderStatus } from "../../utils/types";
import OrdersTable from "../../components/orders/OrdersTable";
import type { OrderUpdatePayload } from "../../components/orders/OrdersTable";
import OrderStatusFilters from "../../components/orders/OrderStatusFilters";
import Toolbar from "../../components/Toolbar";
import Pagination from "../../components/Pagination";
import { downloadCSV } from "../../utils/downloadCSV";
import { readBuilderProgram } from "typescript";

const Orders = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus>("active");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingOrder, setEditingOrder] = useState<OrderItem | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<OrderItem | null>(null);
  const [orderForm, setOrderForm] = useState<OrderUpdatePayload>({
    transactionDate: "",
    quantity: 0,
    price: 0,
    status: "active",
  });
  const [modalError, setModalError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async (showLoading = false) => {
      try {
        if (showLoading) {
          setLoading(true);
        }

        const response = await fetch(`${import.meta.env.VITE_API}/api/orders`, {
          credentials: "include",
        });

        if (response.ok) {
          const result = await response.json();

          if (isMounted) {
            setOrders(result.data || result);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrders(true);

    const intervalId = window.setInterval(() => {
      fetchOrders(false);
    }, 3000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
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

  const handleOpenEditOrder = (order: OrderItem) => {
    setEditingOrder(order);
    setModalError("");
    setOrderForm({
      transactionDate: new Date(order.transaction_date)
        .toISOString()
        .slice(0, 10),
      quantity: order.quantity,
      price: Number(order.price),
      status: order.status,
    });
  };

  const handleUpdateOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingOrder) return;

    if (
      !orderForm.transactionDate ||
      !Number.isFinite(Number(orderForm.quantity)) ||
      Number(orderForm.quantity) < 0 ||
      !Number.isFinite(Number(orderForm.price)) ||
      Number(orderForm.price) < 0
    ) {
      setModalError("Enter a valid date, quantity, and price.");
      return;
    }

    try {
      setIsSaving(true);
      setModalError("");

      const response = await fetch(
        `${import.meta.env.VITE_API}/api/orders/${editingOrder.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...orderForm,
            quantity: Number(orderForm.quantity),
            price: Number(orderForm.price),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setModalError(result.message || "Could not update order.");
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder.id === editingOrder.id ? result : currentOrder,
        ),
      );
      setEditingOrder(null);
    } catch {
      setModalError("Server error while updating order.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!deletingOrder) return;

    try {
      setIsSaving(true);
      setModalError("");

      const response = await fetch(
        `${import.meta.env.VITE_API}/api/orders/${deletingOrder.id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setModalError(result.message || "Could not delete order.");
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.filter(
          (currentOrder) => currentOrder.id !== deletingOrder.id,
        ),
      );
      setDeletingOrder(null);
    } catch {
      setModalError("Server error while deleting order.");
    } finally {
      setIsSaving(false);
    }
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
          onEditOrder={handleOpenEditOrder}
          onDeleteOrder={(order) => {
            setDeletingOrder(order);
            setModalError("");
          }}
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

      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <form
            onSubmit={handleUpdateOrder}
            className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-black text-gray-950">Edit Order</h2>
              <p className="mt-1 text-sm text-gray-500">
                Update order values and keep inventory in sync.
              </p>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
                Transaction date
                <input
                  type="date"
                  readOnly
        
                  value={orderForm.transactionDate}
                  onChange={(event) =>
                    setOrderForm((form) => ({
                      ...form,
                      transactionDate: event.target.value,
                    }))
                  }
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
                Status
                <select
                  value={orderForm.status}
                  onChange={(event) =>
                    setOrderForm((form) => ({
                      ...form,
                      status: event.target.value as OrderStatus,
                    }))
                  }
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="active">Active</option>
                  <option value="archive">Archive</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
                Quantity
                <input
                  type="number"
                  min="0"
                  value={orderForm.quantity}
                  onChange={(event) =>
                    setOrderForm((form) => ({
                      ...form,
                      quantity: Number(event.target.value),
                    }))
                  }
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-semibold text-gray-700">
                Price
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={orderForm.price}
                  onChange={(event) =>
                    setOrderForm((form) => ({
                      ...form,
                      price: Number(event.target.value),
                    }))
                  }
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </label>
            </div>

            {modalError && (
              <div className="mx-6 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {modalError}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white disabled:bg-gray-300"
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {deletingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-gray-950">Delete Order</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Delete order {deletingOrder.transaction_number}? Active order
              quantity will be returned to inventory.
            </p>

            {modalError && (
              <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {modalError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingOrder(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleDeleteOrder}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:bg-gray-300"
              >
                {isSaving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
