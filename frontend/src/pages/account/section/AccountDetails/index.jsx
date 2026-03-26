import { useState } from "react";
import Input from "../../components/InputField";
import { GREEN } from "@/constant";
import toast from "react-hot-toast";

/* ══════════════════════════════════════
   SECTION: ACCOUNT DETAILS
══════════════════════════════════════ */
export default function AccountDetails({ user }) {
  const [form, setForm] = useState({
    name:            user?.name || "",
    email:           user?.email || "",
    currentPassword: "",
    newPassword:     "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (form.newPassword && form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword     = form.newPassword;
      }
      await API.put("/user/profile", payload);
      toast.success("Account details updated successfully!");
      setForm(f => ({ ...f, currentPassword: "", newPassword: "", confirmPassword: "" }));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Details</h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
        <div className="flex flex-col gap-4">
          <Input label="Name" value={form.name} onChange={set("name")} placeholder="Your full name" required />
          <Input label="Email Address" type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" required />

          <div className="border-t border-gray-100 pt-4 mt-2">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Change Password</p>
            <div className="flex flex-col gap-4">
              <Input label="Current Password" type="password" value={form.currentPassword} onChange={set("currentPassword")} placeholder="Enter current password" required />
              <Input label="New Password" type="password" value={form.newPassword} onChange={set("newPassword")} placeholder="Enter new password" required />
              <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={set("confirmPassword")} placeholder="Repeat new password" required />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-2 w-fit px-8 py-3 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90 active:scale-[.98] disabled:opacity-60"
            style={{ background: GREEN }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
