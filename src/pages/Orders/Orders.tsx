import { Download } from "lucide-react";

function Orders() {
  return (
    <div className="p-4">
      <div>
        <p className="text-3xl font-bold ">Order History</p>
        <p className="text-sm mt-1 ml-1 text-[#717182]">
          Track and manage customer orders.
        </p>
        <div className="w-40 h-15 shadow-2xl rounded-xl">
          
        <p>export</p>
          
          <Download />

        </div>
      </div>
    </div>
  );
}

export default Orders;
