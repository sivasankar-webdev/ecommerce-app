import { GREEN } from "@/constant";


export default function ViewToggleBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200"
      style={{
        background:  active ? GREEN      : "#fff",
        color:       active ? "#fff"     : "#6b7280",
        borderColor: active ? GREEN      : "#e5e7eb",
        boxShadow:   active ? `0 2px 8px rgba(98,157,35,0.3)` : "none",
      }}
    >
      {children}
    </button>
  );
}