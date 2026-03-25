import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeItem, updateQty, clearWishlist } from "./wishlistSlice";
import { addItem as addCartItem } from "@/features/cart/cartSlice";
import { resolveImage } from "@/utils/imageMap";   // ← image key resolver
import { Link } from "react-router-dom";

/* ══════════════════════════════════════
   ICONS
══════════════════════════════════════ */
const XIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
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
const HeartIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const GREEN = "#629d23";

/* ══════════════════════════════════════
   QUANTITY STEPPER
══════════════════════════════════════ */
function QtyStepper({ value, onChange }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden w-[90px]">
      <span className="flex-1 text-center text-sm font-semibold text-gray-800 py-2 select-none">
        {value}
      </span>
      <div className="flex flex-col border-l border-gray-200">
        <button onClick={() => onChange(value + 1)}
          className="px-2 py-1 hover:bg-gray-100 transition-colors flex items-center justify-center">
          <ChevronUpIcon />
        </button>
        <button onClick={() => onChange(Math.max(1, value - 1))}
          className="px-2 py-1 hover:bg-gray-100 transition-colors border-t border-gray-200 flex items-center justify-center">
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   WISHLIST ROW — desktop
   FIX 1: resolveImage(item.image) to show imageKey as real asset
══════════════════════════════════════ */
function WishlistRow({ item, onRemove, onQtyChange, onAddToCart, removing }) {
  const subtotal = (item.price * item.qty).toFixed(2);
  const imgSrc   = resolveImage(item.image);   // ✅ key → actual asset/URL

  return (
    <tr
      className="border-b border-gray-100 transition-all duration-300"
      style={{ opacity: removing ? 0 : 1, transform: removing ? "scaleY(0)" : "scaleY(1)" }}
    >
      <td className="py-5 px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => onRemove(item._id)}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm">
            <XIcon />
          </button>
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
            <img
              src={imgSrc}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = "https://placehold.co/64x64/f5f5f5/888?text=P"; }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-[#629d23] transition-colors cursor-pointer">
              {item.name}
            </p>
            <p className="text-xs text-gray-400 mt-1 font-medium">SKU: {item.sku}</p>
          </div>
        </div>
      </td>
      <td className="py-5 px-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
        ${Number(item.price).toFixed(2)}
      </td>
      <td className="py-5 px-4">
        <QtyStepper value={item.qty} onChange={qty => onQtyChange(item._id, qty)} />
      </td>
      <td className="py-5 px-4 text-sm font-bold text-gray-800 whitespace-nowrap">
        ${subtotal}
      </td>
      <td className="py-5 px-4">
        <button onClick={() => onAddToCart(item)}
          className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 hover:shadow-md active:scale-95 whitespace-nowrap"
          style={{ background: GREEN }}>
          Add to Cart <CartIcon />
        </button>
      </td>
    </tr>
  );
}

/* ══════════════════════════════════════
   WISHLIST CARD — mobile
   FIX 1: resolveImage(item.image)
══════════════════════════════════════ */
function WishlistCard({ item, onRemove, onQtyChange, onAddToCart }) {
  const subtotal = (item.price * item.qty).toFixed(2);
  const imgSrc   = resolveImage(item.image);   // ✅ key → actual asset/URL

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative">
      <button onClick={() => onRemove(item._id)}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
        <XIcon />
      </button>
      <div className="flex gap-3 mb-4">
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
          <img
            src={imgSrc}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = "https://placehold.co/80x80/f5f5f5/888?text=P"; }}
          />
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{item.name}</p>
          <p className="text-xs text-gray-400 mt-1">SKU: {item.sku}</p>
          <p className="text-sm font-bold mt-1" style={{ color: GREEN }}>${Number(item.price).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium">Qty:</span>
          <QtyStepper value={item.qty} onChange={qty => onQtyChange(item._id, qty)} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            Sub: <strong className="text-gray-800">${subtotal}</strong>
          </span>
          <button onClick={() => onAddToCart(item)}
            className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-bold rounded-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: GREEN }}>
            Add to Cart <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SKELETON LOADER (while fetching)
══════════════════════════════════════ */
function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-5 px-4">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </td>
      {[...Array(4)].map((_, i) => (
        <td key={i} className="py-5 px-4">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

/* ══════════════════════════════════════
   EMPTY STATE
══════════════════════════════════════ */
function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5 text-gray-300">
        <HeartIcon />
      </div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">Your wishlist is empty</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">Start adding items you love to your wishlist.</p>
      <Link
        to="/popular-product"
        className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 hover:shadow-md"
        style={{ background: GREEN }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
function Toast({ message, visible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ background: GREEN }}
    >
      <CartIcon />
      {message}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN WISHLIST PAGE
══════════════════════════════════════ */
export default function WishlistPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.wishlist);

  const [removing, setRemoving] = useState(null);
  const [toast, setToast]       = useState({ message: "", visible: false });

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // FIX 2: animate then dispatch — no broken setItems call
  const handleRemove = (id) => {
    setRemoving(id);
    setTimeout(() => {
      dispatch(removeItem(id));
      setRemoving(null);
    }, 280);
  };

  const handleQtyChange = (id, qty) => {
    dispatch(updateQty({ id, qty }));
  };

  const handleAddToCart = (item) => {
    dispatch(addCartItem({
      productId: item.productId,
      name:      item.name,
      price:     item.price,
      image:     item.image,
      qty:       item.qty,
    }));
    showToast(`"${item.name.slice(0, 28)}..." added to cart!`);
  };

  // FIX 3: dispatch clearWishlist thunk instead of setItems([])
  const handleClearAll = () => {
    dispatch(clearWishlist());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">My Wishlist</h1>
          {items.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {items.length} item{items.length !== 1 ? "s" : ""} saved
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Products","Price","Quantity","SubTotal","Add to Cart"].map(h => (
                    <th key={h} className="py-4 px-4 text-left text-sm font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{[1,2,3].map(i => <SkeletonRow key={i} />)}</tbody>
            </table>
          </div>
        )}

        {/* Empty */}
        {!loading && items.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <EmptyWishlist />
          </div>
        )}

        {/* Items */}
        {!loading && items.length > 0 && (
          <>
            {/* Desktop */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Products","Price","Quantity","SubTotal","Add to Cart"].map(h => (
                      <th key={h} className="py-4 px-4 text-left text-sm font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <WishlistRow
                      key={item._id}
                      item={item}
                      onRemove={handleRemove}
                      onQtyChange={handleQtyChange}
                      onAddToCart={handleAddToCart}
                      removing={removing === item._id}
                    />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end px-4 py-4 border-t border-gray-100">
                <button onClick={handleClearAll}
                  className="px-6 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 hover:shadow-md active:scale-95"
                  style={{ background: GREEN }}>
                  Clear All
                </button>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-4 md:hidden">
              {items.map(item => (
                <WishlistCard
                  key={item._id}
                  item={item}
                  onRemove={handleRemove}
                  onQtyChange={handleQtyChange}
                  onAddToCart={handleAddToCart}
                />
              ))}
              <div className="flex justify-end pt-2">
                <button onClick={handleClearAll}
                  className="px-6 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 active:scale-95"
                  style={{ background: GREEN }}>
                  Clear All
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
