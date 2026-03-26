import { useState } from "react";
import { MOCK_ORDERS } from "../../components/data";
import { GREEN } from "@/constant";
import OrderModal from "../../components/OrderModel";

/* ══════════════════════════════════════
   SECTION: ORDERS
══════════════════════════════════════ */
export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["ORDER","DATE","STATUS","TOTAL","ACTIONS"].map(h => (
                <th key={h} className="py-3 px-4 text-left text-xs font-bold text-gray-500 tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order, i) => (
              <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-sm font-semibold text-gray-800">{order.id}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === "Processing"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  ${order.total.toFixed(2)} for {order.itemCount} item{order.itemCount > 1 ? "s" : ""}
                </td>
                <td className="py-4 px-4">
                  <button onClick={() => setSelectedOrder(order)}
                    className="text-sm font-semibold hover:underline transition-colors"
                    style={{ color: GREEN }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-gray-800">{order.id}</p>
                <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                order.status === "Processing" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-700"
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">${order.total.toFixed(2)} · {order.itemCount} items</p>
              <button onClick={() => setSelectedOrder(order)}
                className="text-sm font-bold hover:underline"
                style={{ color: GREEN }}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}