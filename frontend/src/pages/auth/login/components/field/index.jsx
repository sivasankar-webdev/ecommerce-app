import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../icons";
import { GREEN } from "@/constant";

/* ═══════════════════════════════════════════════════
   FIELD COMPONENT
═══════════════════════════════════════════════════ */
export function Field({ label, type = "text", value, onChange, error }) {
  const [focused,  setFocused]  = useState(false);
  const [showPwd,  setShowPwd]  = useState(false);
  const isPassword = type === "password";
  const inputType  = isPassword ? (showPwd ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold text-gray-700 flex items-center gap-0.5">
        {label}<span className="text-red-500">*</span>
      </label>
      <div
        className="relative flex items-center bg-white rounded-xl transition-all duration-200"
        style={{
          border:    `1.5px solid ${error ? "#ef4444" : focused ? GREEN : "#e5e7eb"}`,
          boxShadow: focused
            ? `0 0 0 3px ${error ? "rgba(239,68,68,0.1)" : "rgba(98,157,35,0.12)"}`
            : "none",
        }}
      >
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 px-4 py-3.5 text-[14px] text-gray-800 outline-none bg-transparent placeholder-gray-300"
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPwd(p => !p)}
            className="px-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPwd ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        )}
      </div>
      {error && <p className="text-[12px] font-medium text-red-500">{error}</p>}
    </div>
  );
}