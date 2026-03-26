import { GREEN } from "@/constant";
import { useState } from "react";
import TrackingModal from "../../components/TrackingModel";
import { XIcon } from "../../components/Icons";

/* ══════════════════════════════════════
   SECTION: ORDER TRACKING
══════════════════════════════════════ */
export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail]     = useState("");
  const [showTracking, setShowTracking] = useState(false);

  const handleTrack = () => {
    if (!orderId.trim() || !email.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }
    setShowTracking(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Orders Tracking</h2>
      <p className="text-sm text-gray-500 mb-6">
        To keep up with the status of your order, kindly input your OrderID in the designated box below and click the "Track" button.
      </p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5 max-w-lg">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-600">Order Id</label>
          <input
            type="text"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            placeholder="Found in your order confirmation email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#629d23] focus:ring-2 focus:ring-[#629d23]/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-600">Billing email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email you use during checkout"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#629d23] focus:ring-2 focus:ring-[#629d23]/20 transition-all"
          />
        </div>

        <button
          onClick={handleTrack}
          className="w-fit px-8 py-3 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 active:scale-[.98]"
          style={{ background: GREEN }}
        >
          Track
        </button>
      </div>

      {showTracking && (
        <TrackingModal
          onClose={() => setShowTracking(false)}
          currentStep={5}
        />
      )}
    </div>
  );
}