import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "@/features/auth/authSlice";
import { DashboardIcon, OrderIcon, TrackIcon, AddressIcon, AccountIcon, LogoutIcon, MenuIcon } from "./components/Icons";
import Dashboard from "./section/dashboard";
import Orders from "./section/orders";
import TrackOrder from "./section/TrackOrder";
import MyAddress from "./section/MyAddress";
import AccountDetails from "./section/AccountDetails";
import LogoutSection from "./section/logout";
import NavItem from "./components/NavItems";

/* ══════════════════════════════════════
   MAIN MY ACCOUNT PAGE
══════════════════════════════════════ */
export default function MyAccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Clear auth state from Redux
    dispatch(logout());
    toast.success("Logged out successfully! See you soon 👋", {
      duration: 3000,
      icon: "✅",
    });

    setTimeout(() => {
       navigate("/login"); 
    }, 1500);
  };

  const NAV_ITEMS = [
    { id: "dashboard",  label: "Dashboard",      icon: <DashboardIcon /> },
    { id: "orders",     label: "Order",           icon: <OrderIcon /> },
    { id: "track",      label: "Track Your Order",icon: <TrackIcon /> },
    { id: "address",    label: "My Address",      icon: <AddressIcon /> },
    { id: "account",    label: "Account Details", icon: <AccountIcon /> },
    { id: "logout",     label: "Log Out",         icon: <LogoutIcon /> },
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard user={user} onNavigate={setActiveTab} />;
      case "orders":    return <Orders />;
      case "track":     return <TrackOrder />;
      case "address":   return <MyAddress />;
      case "account":   return <AccountDetails user={user} />;
      case "logout":    return <LogoutSection onLogout={handleLogout} />;
      default:          return <Dashboard user={user} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Mobile: hamburger header */}
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <h1 className="text-xl font-bold text-gray-800">My Account</h1>
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 bg-white shadow-sm"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Mobile: nav drawer */}
        {mobileMenuOpen && (
          <div className="flex flex-col gap-2 mb-4 sm:hidden">
            {NAV_ITEMS.map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => handleTabChange(item.id)}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-6 items-start">

          {/* ── SIDEBAR (desktop) ── */}
          <div className="hidden sm:flex flex-col gap-2.5 sticky top-8">
            {NAV_ITEMS.map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => handleTabChange(item.id)}
              />
            ))}
          </div>

          {/* ── CONTENT ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 min-h-[400px]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
