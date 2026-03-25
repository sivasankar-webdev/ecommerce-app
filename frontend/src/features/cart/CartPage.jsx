import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItem, updateQty, clearCart, applyCoupon } from "./cartSlice";
import { resolveImage } from "@/utils/imageMap";
import { Link } from "react-router-dom";

const GREEN = "#629d23";
const FREE_SHIPPING_THRESHOLD = 100;

const SHIPPING_OPTIONS = [
  { id: "free",   label: "Free Shipping", price: 0 },
  { id: "flat",   label: "Flat Rate",     price: 5.99 },
  { id: "pickup", label: "Local Pickup",  price: 0 },
];

/* ══════════════════════════════════════════════
   ICONS  (unchanged — keep your originals)
══════════════════════════════════════════════ */
const XIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ChevronUpIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const CartEmptyIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const TagIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);
const TruckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

/* ══════════════════════════════════════════════
   ✅ FIX: LOCAL QTY MAP
   We maintain a localQtyMap in CartPage so that
   ALL subtotals and the master total update instantly
   when the user clicks +/-, without waiting for the
   API round-trip. The map is kept in sync with Redux.
══════════════════════════════════════════════ */
function useLocalQtyMap(reduxItems) {
  // localQtyMap: { [itemId]: qty }
  const [localQtyMap, setLocalQtyMap] = useState(() =>
    Object.fromEntries(reduxItems.map(i => [i._id, i.qty]))
  );

  // When Redux items change (e.g. after API responds), sync only items
  // that haven't been locally overridden recently
  useEffect(() => {
    setLocalQtyMap(prev => {
      const next = { ...prev };
      reduxItems.forEach(item => {
        // Only sync from Redux if the item is new (not already in map)
        if (!(item._id in next)) next[item._id] = item.qty;
      });
      // Remove items that were deleted from Redux
      Object.keys(next).forEach(id => {
        if (!reduxItems.find(i => i._id === id)) delete next[id];
      });
      return next;
    });
  }, [reduxItems]);

  const setQty = (id, qty) => {
    setLocalQtyMap(prev => ({ ...prev, [id]: Math.max(1, qty) }));
  };

  return [localQtyMap, setQty];
}

/* ══════════════════════════════════════════════
   QUANTITY STEPPER
   Now calls onChangeLocal (instant UI) AND
   onChangeRemote (debounced API dispatch)
══════════════════════════════════════════════ */
function QtyStepper({ value, onChangeLocal, onChangeRemote }) {
  const timer = useRef(null);

  const update = (next) => {
    const clamped = Math.max(1, next);
    onChangeLocal(clamped);             // ← instant local update → subtotal recalculates NOW
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChangeRemote(clamped);          // ← debounced API dispatch (400ms after last click)
    }, 400);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden w-[90px]">
      <span className="flex-1 text-center text-sm font-semibold text-gray-800 py-2 select-none">
        {value}
      </span>
      <div className="flex flex-col border-l border-gray-200">
        <button
          onClick={() => update(value + 1)}
          className="px-2 py-1 hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <ChevronUpIcon />
        </button>
        <button
          onClick={() => update(value - 1)}
          className="px-2 py-1 hover:bg-gray-100 transition-colors border-t border-gray-200 flex items-center justify-center"
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SKELETON LOADERS
══════════════════════════════════════════════ */
function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-5 px-4">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-3 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </td>
      {[...Array(4)].map((_, i) => (
        <td key={i} className="py-5 px-4">
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 animate-pulse">
      <div className="flex gap-3 mb-4">
        <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2 pt-1">
          <div className="w-3/4 h-4 bg-gray-200 rounded" />
          <div className="w-1/2 h-3 bg-gray-100 rounded" />
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-20 h-8 bg-gray-100 rounded-md" />
        <div className="w-24 h-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FREE SHIPPING PROGRESS BAR
══════════════════════════════════════════════ */
function FreeShippingBar({ subtotal }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const achieved = remaining === 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 mb-5">
      <div className="flex items-center gap-2 mb-2.5">
        <TruckIcon />
        {achieved ? (
          <p className="text-sm font-semibold text-green-600">🎉 You've unlocked free shipping!</p>
        ) : (
          <p className="text-sm text-gray-600">
            Add{" "}
            <span className="font-bold" style={{ color: GREEN }}>${remaining.toFixed(2)}</span>
            {" "}to cart and get free shipping
          </p>
        )}
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg,#629d23,#8bc34a)" }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CART ROW — desktop
   ✅ FIX: receives localQty + per-row subtotal
══════════════════════════════════════════════ */
function CartRow({ item, localQty, onRemove, onChangeLocal, onChangeRemote, removing }) {
  // ✅ subtotal uses localQty (instant), not item.qty (API-lagged)
  const subtotal = (item.price * localQty).toFixed(2);
  const imgSrc = resolveImage(item.image);

  return (
    <tr
      className="border-b border-gray-100 transition-all duration-300"
      style={{
        opacity: removing ? 0 : 1,
        transform: removing ? "scaleY(0)" : "scaleY(1)",
        transformOrigin: "top",
      }}
    >
      {/* Product */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onRemove(item._id)}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm active:scale-90"
          >
            <XIcon />
          </button>
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
            <img src={imgSrc} alt={item.name} className="w-full h-full object-cover"
              onError={e => { e.target.src = "https://placehold.co/64x64/f5f5f5/888?text=P"; }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-[#629d23] transition-colors cursor-pointer">
              {item.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">SKU: {item.sku || "—"}</p>
          </div>
        </div>
      </td>

      {/* Unit price */}
      <td className="py-5 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
        ${Number(item.price).toFixed(2)}
      </td>

      {/* Quantity stepper */}
      <td className="py-5 px-4">
        <QtyStepper
          value={localQty}
          onChangeLocal={onChangeLocal}
          onChangeRemote={onChangeRemote}
        />
      </td>

      {/* ✅ Subtotal — updates instantly with localQty */}
      <td className="py-5 px-4 whitespace-nowrap">
        <span
          className="text-sm font-bold transition-all duration-200"
          style={{ color: GREEN }}
        >
          ${subtotal}
        </span>
      </td>
    </tr>
  );
}

/* ══════════════════════════════════════════════
   CART CARD — mobile
   ✅ FIX: uses localQty for instant subtotal
══════════════════════════════════════════════ */
function CartCard({ item, localQty, onRemove, onChangeLocal, onChangeRemote }) {
  const subtotal = (item.price * localQty).toFixed(2);
  const imgSrc = resolveImage(item.image);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative">
      <button
        onClick={() => onRemove(item._id)}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors active:scale-90"
      >
        <XIcon />
      </button>

      <div className="flex gap-3 mb-4">
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
          <img src={imgSrc} alt={item.name} className="w-full h-full object-cover"
            onError={e => { e.target.src = "https://placehold.co/80x80/f5f5f5/888?text=P"; }} />
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{item.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">SKU: {item.sku || "—"}</p>
          <p className="text-sm font-bold mt-1" style={{ color: GREEN }}>
            ${Number(item.price).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium">Qty:</span>
          <QtyStepper
            value={localQty}
            onChangeLocal={onChangeLocal}
            onChangeRemote={onChangeRemote}
          />
        </div>
        {/* ✅ Instant per-item subtotal */}
        <span className="text-sm font-bold text-gray-800">
          Sub:{" "}
          <span style={{ color: GREEN }}>${subtotal}</span>
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   EMPTY CART
══════════════════════════════════════════════ */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5 text-gray-300">
        <CartEmptyIcon />
      </div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">Your cart is empty</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
        Looks like you haven't added anything yet. Start shopping!
      </p>
      <Link
        to="/popular-product"
        className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 hover:shadow-md"
        style={{ background: GREEN }}
      >
        Continue Shopping <ArrowRightIcon />
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════
   COUPON SECTION
══════════════════════════════════════════════ */
function CouponSection({ onApply, appliedCoupon, couponError, couponLoading }) {
  const [code, setCode] = useState("");
  const handleSubmit = () => { if (code.trim()) onApply(code.trim()); };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <TagIcon />
        <span className="text-sm font-semibold text-gray-700">Coupon Code</span>
      </div>
      {appliedCoupon ? (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
          <CheckIcon />
          <span className="text-sm font-semibold text-green-700">
            "{appliedCoupon.code}" applied — {appliedCoupon.discount}% off!
          </span>
        </div>
      ) : (
        <div className="flex gap-2">
          <input type="text" value={code} onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#629d23] focus:ring-1 focus:ring-[#629d23] transition-colors" />
          <button onClick={handleSubmit} disabled={couponLoading}
            className="px-5 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 whitespace-nowrap"
            style={{ background: GREEN }}>
            {couponLoading ? "..." : "Apply Coupon"}
          </button>
        </div>
      )}
      {couponError && <p className="text-xs text-red-500 mt-2 font-medium">{couponError}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════
   CART TOTALS SIDEBAR
   ✅ FIX: receives localSubtotal (instant, from localQtyMap)
══════════════════════════════════════════════ */
function CartTotals({ subtotal, shipping, discount, onShippingChange, selectedShipping }) {
  const discountAmt = discount ? (subtotal * discount) / 100 : 0;
  const total = Math.max(0, subtotal + shipping - discountAmt);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-800">Cart Totals</h2>
      </div>
      <div className="px-6 py-5 flex flex-col gap-4">

        {/* Subtotal — animates when qty changes */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Subtotal</span>
          <span className="text-sm font-bold text-gray-800 transition-all duration-200">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        {discountAmt > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Discount</span>
            <span className="text-sm font-bold text-red-500">− ${discountAmt.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping options */}
        <div>
          <span className="text-sm text-gray-500 block mb-2.5">Shipping</span>
          <div className="flex flex-col gap-2">
            {SHIPPING_OPTIONS.map(opt => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    borderColor: selectedShipping === opt.id ? GREEN : "#d1d5db",
                    background:  selectedShipping === opt.id ? GREEN : "white",
                  }}
                  onClick={() => onShippingChange(opt)}
                >
                  {selectedShipping === opt.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className="text-sm transition-colors"
                  style={{
                    color:      selectedShipping === opt.id ? GREEN : "#6b7280",
                    fontWeight: selectedShipping === opt.id ? 600 : 400,
                  }}
                  onClick={() => onShippingChange(opt)}
                >
                  {opt.label}
                  {opt.price > 0 && (
                    <span className="ml-1 text-gray-400 font-normal">(+${opt.price.toFixed(2)})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2.5">Shipping options updated during checkout.</p>
        </div>

        {/* Total */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-800">Total</span>
            {/* ✅ Instant total update */}
            <span
              className="text-lg font-extrabold transition-all duration-200"
              style={{ color: GREEN }}
            >
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col gap-1.5 py-2 border-t border-gray-100">
          {[
            { icon: <ShieldIcon />, text: "Secure checkout" },
            { icon: <RefreshIcon />, text: "30-day returns" },
            { icon: <TruckIcon />,  text: "Fast delivery" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
              <span style={{ color: GREEN }}>{b.icon}</span> {b.text}
            </div>
          ))}
        </div>

        <Link
          to="/checkout"
          className="w-full flex items-center justify-center gap-2 py-3.5 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${GREEN}, #4cae4c)` }}
        >
          Proceed To Checkout <ArrowRightIcon />
        </Link>

        <Link
          to="/shop"
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl border border-gray-200 text-gray-600 hover:border-[#629d23] hover:text-[#629d23] transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════ */
function Toast({ message, visible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ background: GREEN }}
    >
      {message}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN CART PAGE
══════════════════════════════════════════════ */
export default function CartPage() {
  const dispatch = useDispatch();
  const { items, loading, coupon } = useSelector(state => state.cart);

  // ✅ localQtyMap drives ALL subtotals + master total instantly
  const [localQtyMap, setLocalQty] = useLocalQtyMap(items);

  const [removing, setRemoving]               = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [couponError, setCouponError]           = useState("");
  const [couponLoading, setCouponLoading]       = useState(false);
  const [toast, setToast]                       = useState({ message: "", visible: false });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // ✅ Master subtotal derived from localQtyMap (instant)
  const subtotal = useMemo(() =>
    items.reduce((sum, item) => sum + item.price * (localQtyMap[item._id] ?? item.qty), 0),
    [items, localQtyMap]
  );

  const handleRemove = (id) => {
    setRemoving(id);
    setTimeout(() => {
      dispatch(removeItem(id));
      setRemoving(null);
    }, 280);
  };

  // ✅ onChangeLocal: update localQtyMap → instant UI
  // ✅ onChangeRemote: dispatch to API (debounced inside QtyStepper)
  const makeQtyHandlers = (id) => ({
    onChangeLocal:  (qty) => setLocalQty(id, qty),
    onChangeRemote: (qty) => dispatch(updateQty({ id, qty })),
  });

  const handleClearAll = () => {
    dispatch(clearCart());
    showToast("Cart cleared.");
  };

  const handleApplyCoupon = async (code) => {
    setCouponLoading(true);
    setCouponError("");
    try {
      await dispatch(applyCoupon(code)).unwrap();
    } catch (err) {
      setCouponError(err?.message || "Invalid coupon code.");
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">Shopping Cart</h1>
          {items.length > 0 && !loading && (
            <p className="text-sm text-gray-400 mt-1">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 animate-pulse">
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />
                <div className="h-2 bg-gray-200 rounded-full" />
              </div>
              <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["Products","Price","Quantity","SubTotal"].map(h => (
                        <th key={h} className="py-4 px-4 text-left text-sm font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{[1,2,3].map(i => <SkeletonRow key={i} />)}</tbody>
                </table>
              </div>
              <div className="flex flex-col gap-4 md:hidden">
                {[1,2,3].map(i => <SkeletonCard key={i} />)}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse h-fit">
              <div className="h-5 w-1/2 bg-gray-200 rounded mb-6" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-100 rounded mb-4" style={{ width: `${70+i*5}%` }} />
              ))}
              <div className="h-12 bg-gray-200 rounded-xl mt-6" />
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && items.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <EmptyCart />
          </div>
        )}

        {/* Cart items + totals */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">

            {/* LEFT */}
            <div className="flex flex-col gap-5">
              <FreeShippingBar subtotal={subtotal} />

              {/* Desktop table */}
              <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["Products","Price","Quantity","SubTotal"].map(h => (
                        <th key={h} className="py-4 px-4 text-left text-sm font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => {
                      const { onChangeLocal, onChangeRemote } = makeQtyHandlers(item._id);
                      return (
                        <CartRow
                          key={item._id}
                          item={item}
                          localQty={localQtyMap[item._id] ?? item.qty}
                          onRemove={handleRemove}
                          onChangeLocal={onChangeLocal}
                          onChangeRemote={onChangeRemote}
                          removing={removing === item._id}
                        />
                      );
                    })}
                  </tbody>
                </table>

                {/* Coupon + Clear */}
                <div className="flex flex-wrap items-stretch gap-3 px-4 py-4 border-t border-gray-100">
                  <div className="flex gap-2 flex-1 min-w-[260px]">
                    <input type="text" placeholder="Coupon Code" id="desktop-coupon-input"
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#629d23] focus:ring-1 focus:ring-[#629d23] transition-colors"
                      onKeyDown={e => {
                        if (e.key === "Enter") { handleApplyCoupon(e.target.value); e.target.value = ""; }
                      }} />
                    <button
                      onClick={() => {
                        const input = document.getElementById("desktop-coupon-input");
                        if (input?.value) { handleApplyCoupon(input.value); input.value = ""; }
                      }}
                      className="px-5 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
                      style={{ background: GREEN }}
                    >
                      Apply Coupon
                    </button>
                  </div>
                  <button onClick={handleClearAll}
                    className="px-6 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 hover:shadow-md active:scale-95"
                    style={{ background: GREEN }}>
                    Clear All
                  </button>
                </div>

                {coupon && (
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg w-fit">
                      <CheckIcon />
                      <span className="text-sm font-semibold text-green-700">
                        "{coupon.code}" applied — {coupon.discount}% off!
                      </span>
                    </div>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs text-red-500 px-4 pb-3 font-medium">{couponError}</p>
                )}
              </div>

              {/* Mobile cards */}
              <div className="flex flex-col gap-4 md:hidden">
                {items.map(item => {
                  const { onChangeLocal, onChangeRemote } = makeQtyHandlers(item._id);
                  return (
                    <CartCard
                      key={item._id}
                      item={item}
                      localQty={localQtyMap[item._id] ?? item.qty}
                      onRemove={handleRemove}
                      onChangeLocal={onChangeLocal}
                      onChangeRemote={onChangeRemote}
                    />
                  );
                })}
                <CouponSection
                  onApply={handleApplyCoupon}
                  appliedCoupon={coupon}
                  couponError={couponError}
                  couponLoading={couponLoading}
                />
                <div className="flex justify-end">
                  <button onClick={handleClearAll}
                    className="px-6 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 active:scale-95"
                    style={{ background: GREEN }}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — CartTotals gets the instant localSubtotal */}
            <CartTotals
              subtotal={subtotal}
              shipping={selectedShipping.price}
              discount={coupon?.discount || 0}
              selectedShipping={selectedShipping.id}
              onShippingChange={(opt) => setSelectedShipping(opt)}
            />
          </div>
        )}
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
