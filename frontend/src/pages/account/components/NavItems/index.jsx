import { GREEN } from "@/constant";

/* ══════════════════════════════════════
   SIDEBAR NAV ITEM
══════════════════════════════════════ */
export default function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all text-left"
      style={{
        background: active ? GREEN : "#fff",
        color:      active ? "#fff" : "#374151",
        border:     active ? "none" : "1px solid #f0f0f0",
        boxShadow:  active ? "0 4px 14px rgba(98,157,35,0.3)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {icon}
      {label}
    </button>
  );
}