import { useState } from "react";
import { LogoutIcon } from "../../components/Icons";

/* ══════════════════════════════════════
   SECTION: LOGOUT
══════════════════════════════════════ */
export default function LogoutSection({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await onLogout();
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Out</h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-md">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <LogoutIcon />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-800 mb-1">Are you sure you want to log out?</p>
            <p className="text-sm text-gray-400">You'll need to sign in again to access your account and orders.</p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90 active:scale-[.98] disabled:opacity-60 bg-red-500 hover:bg-red-600"
            >
              <LogoutIcon /> {loading ? "Logging out..." : "Yes, Log Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}