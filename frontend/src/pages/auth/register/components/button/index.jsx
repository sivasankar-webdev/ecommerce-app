import { GREEN, GREEN_DARK, GREEN_PALE } from "@/constant";
import { useState } from "react";


/* ═══════════════════════════════════════════════════
   SOCIAL BUTTON
═══════════════════════════════════════════════════ */
export default function SocialBtn({ icon, label, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-[14px] text-gray-700 transition-all duration-200 active:scale-95"
      style={{
        border:     `1.5px solid ${hov ? GREEN : "#e5e7eb"}`,
        background: hov ? GREEN_PALE : "#fff",
        boxShadow:  hov ? `0 4px 14px rgba(98,157,35,0.15)` : "none",
        transform:  hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {icon}
      <span style={{ color: hov ? GREEN_DARK : "#374151" }}>{label}</span>
    </button>
  );
}