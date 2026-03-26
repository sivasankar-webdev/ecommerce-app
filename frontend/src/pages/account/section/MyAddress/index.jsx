import { useState } from "react";
import { STATIC_ADDRESS } from "../../components/data";
import { GREEN } from "@/constant";
import { EditIcon } from "../../components/Icons";
import AddressModal from "../../components/AddressModel";
import toast from "react-hot-toast";

/* ══════════════════════════════════════
   SECTION: MY ADDRESS
══════════════════════════════════════ */
export default function MyAddress() {
  const [addresses, setAddresses] = useState(STATIC_ADDRESS);
  const [editModal, setEditModal] = useState(null); // "billing" | "shipping" | null

  const handleSave = (type, newAddress) => {
    setAddresses(prev => ({ ...prev, [type]: newAddress }));
    toast.success(`${type === "billing" ? "Billing" : "Shipping"} address updated!`);
  };

  const AddressBlock = ({ type }) => {
    const addr = addresses[type];
    return (
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">
          {type === "billing" ? "Billing" : "Shipping"} Address
        </h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1">
          {[addr.line1, addr.line2, addr.line3, addr.city, addr.country].map((line, i) => (
            <p key={i} className="text-sm text-gray-600 leading-relaxed">{line}</p>
          ))}
          <button
            onClick={() => setEditModal(type)}
            className="flex items-center gap-1.5 mt-3 text-sm font-semibold hover:underline transition-colors"
            style={{ color: GREEN }}
          >
            <EditIcon /> Edit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressBlock type="billing" />
        <AddressBlock type="shipping" />
      </div>

      {editModal && (
        <AddressModal
          type={editModal}
          address={addresses[editModal]}
          onSave={(newAddr) => handleSave(editModal, newAddr)}
          onClose={() => setEditModal(null)}
        />
      )}
    </div>
  );
}