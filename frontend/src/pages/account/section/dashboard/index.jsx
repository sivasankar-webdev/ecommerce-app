import { MOCK_ORDERS } from "../../components/data";

/* ══════════════════════════════════════
   SECTION: DASHBOARD
══════════════════════════════════════ */
export default function Dashboard({ user, onNavigate }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-6">
        Hello, <span className="font-semibold text-gray-700">{user?.name || "User"}</span>! Here's a summary of your account.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Orders",   value: MOCK_ORDERS.length,                                color: "bg-blue-50 text-blue-600",   icon: "📦" },
          { label: "Completed",      value: MOCK_ORDERS.filter(o => o.status === "Completed").length, color: "bg-green-50 text-green-600", icon: "✅" },
          { label: "Processing",     value: MOCK_ORDERS.filter(o => o.status === "Processing").length, color: "bg-orange-50 text-orange-500", icon: "⏳" },
        ].map(card => (
          <div key={card.label} className={`rounded-xl p-5 flex items-center gap-4 ${card.color} border border-current/10`}>
            <span className="text-3xl">{card.icon}</span>
            <div>
              <p className="text-2xl font-extrabold">{card.value}</p>
              <p className="text-xs font-semibold opacity-80">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
        <p className="text-sm text-gray-500 leading-relaxed">
          From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
        </p>
      </div>
    </div>
  );
}