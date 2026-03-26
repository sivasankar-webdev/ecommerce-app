import { GREEN } from "@/constant";
import { EyeIcon, EyeOffIcon } from "@/pages/auth/login/components/icons";
import { useState } from "react";

/* ═══════════════════════════════════════════════════
   FORM FIELD
═══════════════════════════════════════════════════ */
export default function Field({ label, type = "text", value, onChange, error, placeholder = "" }) {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === "password";
  const inputType  = isPassword ? (showPwd ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold text-gray-700">
        {label}<span className="text-red-500 ml-0.5">*</span>
      </label>
      <div
        className="relative flex items-center bg-white rounded-xl overflow-hidden transition-all duration-200"
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
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 px-4 py-3.5 text-[14px] text-gray-800 placeholder-gray-300 outline-none bg-transparent"
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPwd(p => !p)}
            className="px-4 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            {showPwd ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[12px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}