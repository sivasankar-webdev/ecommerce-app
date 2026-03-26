import { useEffect, useRef, useState } from "react";
import { SORT_OPTIONS } from "../data";
import { GREEN } from "@/constant";
import { ChevronDown } from "../icons";

/* ═══════════════════════════════════════════════════
   SORT DROPDOWN
═══════════════════════════════════════════════════ */
export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find(o => o.value === value);
  const ref = useRef(null);

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-[#629d23] transition-colors"
      >
        <span className="text-gray-400 font-normal">Sort:</span>
        {current?.label}
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDown/></span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 overflow-hidden"
          style={{ animation: "vendorDropIn .15s ease both" }}>
          <div className="h-0.5 bg-gradient-to-r from-green-400 to-green-600"/>
          <div className="py-1">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left transition-colors hover:bg-green-50"
                style={{ color: value === opt.value ? GREEN : "#374151", fontWeight: value === opt.value ? "700" : "400" }}
              >
                {opt.label}
                {value === opt.value && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}