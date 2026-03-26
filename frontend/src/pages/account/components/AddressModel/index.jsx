import { useState } from "react";
import { XIcon } from "../Icons";
import Input from "../InputField";
import { GREEN } from "@/constant";

/* ══════════════════════════════════════
   ADDRESS EDIT MODAL
══════════════════════════════════════ */
export default function AddressModal({ type, address, onSave, onClose }) {
  const [form, setForm] = useState({ ...address });
  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
        style={{ animation: "modalIn 0.25s cubic-bezier(.16,1,.3,1) both" }}>

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Edit {type === "billing" ? "Billing" : "Shipping"} Address
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
            <XIcon />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <Input label="Address Line 1" value={form.line1} onChange={set("line1")} />
          <Input label="Address Line 2" value={form.line2} onChange={set("line2")} />
          <Input label="Address Line 3" value={form.line3} onChange={set("line3")} />
          <Input label="City / State / ZIP" value={form.city} onChange={set("city")} />
          <Input label="Country" value={form.country} onChange={set("country")} />
          <button onClick={() => { onSave(form); onClose(); }}
            className="w-full py-3 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90 active:scale-[.98]"
            style={{ background: GREEN }}>
            Save Address
          </button>
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}