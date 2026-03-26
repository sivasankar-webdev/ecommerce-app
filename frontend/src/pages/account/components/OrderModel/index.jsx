import { GREEN } from "@/constant";
import { CheckCircleIcon, XIcon } from "../Icons";

/* ══════════════════════════════════════
   ORDER DETAIL MODAL
══════════════════════════════════════ */
export default function OrderModal({ order, onClose }) {
  if (!order) return null;
  const isProcessing = order.status === "Processing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
        style={{ animation: "modalIn 0.25s cubic-bezier(.16,1,.3,1) both" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Order {order.id}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isProcessing
                ? "bg-orange-100 text-orange-600"
                : "bg-green-100 text-green-700"
            }`}>
              {order.status}
            </span>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <XIcon />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Order Items</h3>
          <div className="flex flex-col gap-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={item.image} alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                  onError={e => { e.target.src = "https://placehold.co/48x48/f5f5f5/888?text=P"; }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty}</p>
                </div>
                <span className="text-sm font-bold text-gray-800">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col gap-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span><span className="font-semibold text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-800 pt-1 border-t border-gray-100">
            <span>Total</span>
            <span style={{ color: GREEN }}>${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Shipping To</p>
            <p className="text-sm text-gray-700 leading-relaxed">{order.shipping}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Payment</p>
            <p className="text-sm text-gray-700">{order.payment}</p>
          </div>
        </div>

        {/* Status bar */}
        <div className="px-6 pb-5">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
            isProcessing ? "bg-orange-50 border border-orange-200" : "bg-green-50 border border-green-200"
          }`}>
            <CheckCircleIcon />
            <div>
              <p className={`text-sm font-bold ${isProcessing ? "text-orange-600" : "text-green-700"}`}>
                {isProcessing ? "Your order is being processed" : "Order delivered successfully"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {isProcessing ? "Estimated delivery: 3–5 business days" : "Thank you for shopping with us!"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}