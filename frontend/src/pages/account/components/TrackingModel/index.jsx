import { GREEN } from "@/constant";
import { TRACKING_STEPS } from "../data";
import { XIcon } from "../Icons";

/* ══════════════════════════════════════
   ORDER TRACKING MODAL
══════════════════════════════════════ */
export default function TrackingModal({ onClose, currentStep = 5 }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{ animation: "modalIn 0.25s cubic-bezier(.16,1,.3,1) both" }}>

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Order Tracking</h2>
            <p className="text-xs text-gray-400 mt-0.5">Live shipment status</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
            <XIcon />
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Estimated delivery */}
          <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl bg-green-50 border border-green-200">
            <div>
              <p className="text-xs text-gray-500">Estimated Delivery</p>
              <p className="text-sm font-bold text-gray-800">Tomorrow, March 26</p>
            </div>
            <span className="text-2xl">🚚</span>
          </div>

          {/* Steps */}
          <div className="relative flex flex-col gap-0">
            {TRACKING_STEPS.map((step, idx) => {
              const isDone    = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const isPending = step.id > currentStep;
              const isLast    = idx === TRACKING_STEPS.length - 1;

              return (
                <div key={step.id} className="flex gap-4">
                  {/* Left: dot + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all ${
                        isCurrent
                          ? "ring-4 ring-[#629d23]/30 shadow-lg"
                          : ""
                      }`}
                      style={{
                        background: isDone
                          ? GREEN
                          : isCurrent
                            ? GREEN
                            : "#f3f4f6",
                        fontSize: "18px",
                      }}
                    >
                      {isDone ? (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span style={{ filter: isPending ? "grayscale(1) opacity(0.4)" : "none" }}>
                          {step.icon}
                        </span>
                      )}

                      {/* Blinking pulse for current step */}
                      {isCurrent && (
                        <span className="absolute inset-0 rounded-full"
                          style={{
                            animation: "ping 1.5s cubic-bezier(0,0,.2,1) infinite",
                            background: GREEN,
                            opacity: 0.3,
                          }} />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 my-1"
                        style={{
                          minHeight: "24px",
                          background: isDone ? GREEN : "#e5e7eb",
                        }}
                      />
                    )}
                  </div>

                  {/* Right: text */}
                  <div className={`pb-5 ${isLast ? "pb-2" : ""}`}>
                    <p className={`text-sm font-bold leading-tight ${
                      isCurrent ? "text-gray-900" : isDone ? "text-gray-700" : "text-gray-400"
                    }`}>
                      {step.label}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold text-white uppercase tracking-wider"
                          style={{ background: GREEN }}>
                          Now
                        </span>
                      )}
                    </p>
                    <p className={`text-xs mt-0.5 leading-relaxed ${
                      isCurrent ? "text-gray-600" : isPending ? "text-gray-300" : "text-gray-400"
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes ping{75%,100%{transform:scale(2);opacity:0}}
      `}</style>
    </div>
  );
}