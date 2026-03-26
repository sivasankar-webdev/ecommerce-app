import { GREEN } from "@/constant";
import { useState } from "react";

/* ══════════════════════════════════════
   PAGINATION
══════════════════════════════════════ */
function PagBtn({ label, active, disabled, onClick, isArrow }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center justify-center font-bold text-[13px]"
      style={{
        width:      isArrow ? 44 : 44,
        height:     44,
        borderRadius: "10px",
        background:  active  ? GREEN
                   : hov && !disabled ? GREEN
                   : "#fff",
        color:       active  ? "#fff"
                   : disabled ? "#d1d5db"
                   : hov && !disabled ? "#fff"
                   : "#374151",
        border:      `1.5px solid ${active ? GREEN : hov && !disabled ? GREEN : "#e5e7eb"}`,
        transform:   hov && !disabled && !active ? "translateY(-2px)" : "translateY(0)",
        transition:  "all .2s cubic-bezier(.16,1,.3,1)",
        cursor:      disabled ? "not-allowed" : "pointer",
        fontFamily:  "'Barlow',sans-serif",
        boxShadow:   active ? "0 4px 14px rgba(98,157,35,0.35)" : "none",
        opacity:     disabled ? 0.4 : 1,
      }}
    >
      {label}
    </button>
  );
}

export default function Pagination({ current, total, onChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div
      className="flex items-center justify-center gap-2 mt-10 flex-wrap"
      style={{
        opacity: 1,
        animation: "t1bpIn .4s cubic-bezier(.16,1,.3,1) .15s both",
      }}
    >
      {/* Prev */}
      <PagBtn
        label="‹"
        isArrow
        active={false}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      />

      {pages.map(p => (
        <PagBtn
          key={p}
          label={String(p).padStart(2, "0")}
          active={p === current}
          disabled={false}
          onClick={() => onChange(p)}
        />
      ))}

      {/* Next double arrow — matches ">>" in screenshots */}
      <PagBtn
        label="»"
        isArrow
        active={false}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      />
    </div>
  );
}