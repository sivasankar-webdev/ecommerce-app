import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem as addWishlist } from "@/features/wishlist/wishlistSlice";
import { addItem as addCartItem } from "@/features/cart/cartSlice";
import { resolveImage } from "@/utils/imageMap";

// import Groc01 from "@/assets/images/grocery/01.jpg";
// import Groc19 from "@/assets/images/grocery/19.jpg";
// import Groc20 from "@/assets/images/grocery/20.jpg";
// import Groc21 from "@/assets/images/grocery/21.jpg";
// import Groc22 from "@/assets/images/grocery/22.jpg";
// import Groc23 from "@/assets/images/grocery/23.jpg";
// import Groc24 from "@/assets/images/grocery/24.jpg";

/* ══════════════════════════════════════════
   IMAGE KEY MAP
   We store only the KEY string (e.g. "grocery/01.jpg")
   in the backend. On every page that needs to display
   the image, call resolveImage(imageKey) to get the
   actual imported asset. Export this map so WishlistPage
   (and CartPage, OrderPage, etc.) can import and use it too.
══════════════════════════════════════════ */
// export const IMAGE_MAP = {
//   "grocery/01.jpg": Groc01,
//   "grocery/19.jpg": Groc19,
//   "grocery/20.jpg": Groc20,
//   "grocery/21.jpg": Groc21,
//   "grocery/22.jpg": Groc22,
//   "grocery/23.jpg": Groc23,
//   "grocery/24.jpg": Groc24,
// };

// export const resolveImage = (key) =>
//   IMAGE_MAP[key] || "https://placehold.co/300x300/f5f5f5/999?text=Product";

/* ══════════════════════════════════════════
   STATIC PRODUCT DATA
══════════════════════════════════════════ */
const allProducts = {
  "Frozen Foods": [
    { id: "p1",  imageKey: "grocery/01.jpg", name: "Dalivaring business makes your profit", pack: "500g Pack", price: 63, originalPrice: 84,  discount: 25, sku: "SKU-FZ01", stock: 12, rating: 4, description: "Premium frozen food pack, flash-frozen to lock in freshness and nutrients." },
    { id: "p2",  imageKey: "grocery/19.jpg", name: "Firebase business makes your profit",   pack: "500g Pack", price: 50, originalPrice: 67,  discount: 25, sku: "SKU-FZ02", stock: 8,  rating: 4, description: "High quality frozen product for everyday family meals." },
    { id: "p3",  imageKey: "grocery/21.jpg", name: "Netlyfy business makes your profit",    pack: "500g Pack", price: 19, originalPrice: 25,  discount: 25, sku: "SKU-FZ03", stock: 20, rating: 5, description: "Best-seller frozen pack, ready in minutes." },
    { id: "p4",  imageKey: "grocery/20.jpg", name: "Details business makes your profit",    pack: "500g Pack", price: 90, originalPrice: 120, discount: 25, sku: "SKU-FZ04", stock: 5,  rating: 3, description: "Premium selection frozen food, great value for money." },
  ],
  "Diet Foods": [
    { id: "p5",  imageKey: "grocery/22.jpg", name: "Green salad diet pack fresh daily",  pack: "250g Pack", price: 22, originalPrice: 26, discount: 15, sku: "SKU-DF01", stock: 30, rating: 5, description: "Fresh daily salad mix, low calorie, high fiber diet pack." },
    { id: "p6",  imageKey: "grocery/23.jpg", name: "Berry detox smoothie mix organic",   pack: "300g Pack", price: 35, originalPrice: 44, discount: 20, sku: "SKU-DF02", stock: 15, rating: 4, description: "Organic berry blend for detox smoothies, no added sugar." },
    { id: "p7",  imageKey: "grocery/24.jpg", name: "Oatmeal power breakfast blend",      pack: "500g Pack", price: 18, originalPrice: 20, discount: 10, sku: "SKU-DF03", stock: 0,  rating: 4, description: "High-protein oatmeal breakfast blend to fuel your morning." },
    { id: "p8",  imageKey: "grocery/22.jpg", name: "Natural juice diet drink low sugar", pack: "1L Bottle", price: 12, originalPrice: 17, discount: 30, sku: "SKU-DF04", stock: 40, rating: 3, description: "Cold-pressed natural juice, low sugar, diet-friendly." },
  ],
  "Healthy Foods": [
    { id: "p9",  imageKey: "grocery/01.jpg", name: "Fresh mixed fruit basket organic",  pack: "1kg Pack",  price: 45, originalPrice: 60, discount: 25, sku: "SKU-HF01", stock: 18, rating: 5, description: "Seasonal organic mixed fruit basket, sourced from local farms." },
    { id: "p10", imageKey: "grocery/19.jpg", name: "Tropical mango lemon juice blend",  pack: "500ml",     price: 28, originalPrice: 34, discount: 18, sku: "SKU-HF02", stock: 22, rating: 4, description: "Refreshing tropical mango and lemon cold-pressed juice blend." },
    { id: "p11", imageKey: "grocery/21.jpg", name: "Whole grain artisan bread loaf",    pack: "400g Loaf", price: 8,  originalPrice: 10, discount: 22, sku: "SKU-HF03", stock: 10, rating: 4, description: "Stone-baked artisan whole grain loaf, no preservatives." },
    { id: "p12", imageKey: "grocery/20.jpg", name: "Wild salmon fillet premium quality",pack: "300g Pack", price: 55, originalPrice: 63, discount: 12, sku: "SKU-HF04", stock: 7,  rating: 5, description: "Wild-caught Atlantic salmon fillet, rich in Omega-3." },
  ],
  "Vitamin Items": [
    { id: "p13", imageKey: "grocery/22.jpg", name: "Vitamin C gummies citrus flavour",  pack: "60 Gummies", price: 15, originalPrice: 19, discount: 20, sku: "SKU-VI01", stock: 50, rating: 4, description: "Chewable Vitamin C gummies with natural citrus flavour, immunity support." },
    { id: "p14", imageKey: "grocery/23.jpg", name: "Omega 3 fish oil capsules daily",   pack: "90 Caps",    price: 30, originalPrice: 40, discount: 25, sku: "SKU-VI02", stock: 35, rating: 5, description: "High-strength Omega-3 fish oil capsules for heart and brain health." },
    { id: "p15", imageKey: "grocery/24.jpg", name: "Multivitamin complete daily dose",  pack: "120 Tabs",   price: 25, originalPrice: 28, discount: 10, sku: "SKU-VI03", stock: 28, rating: 4, description: "Complete daily multivitamin with 23 essential vitamins and minerals." },
    { id: "p16", imageKey: "grocery/22.jpg", name: "Iron & zinc mineral boost complex", pack: "60 Caps",    price: 20, originalPrice: 29, discount: 30, sku: "SKU-VI04", stock: 0,  rating: 3, description: "Iron and zinc complex for energy, immunity, and metabolic function." },
  ],
};

const GREEN = "#629d23";

/* ══════════════════════════════════════════
   ICONS
══════════════════════════════════════════ */
const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const CompareIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);
const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const ChevronUp = () => (
  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
  </svg>
);
const ChevronDown = () => (
  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
  </svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function Toast({ message, visible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ background: GREEN }}
    >
      {message}
    </div>
  );
}

/* ══════════════════════════════════════════
   DISCOUNT RIBBON
══════════════════════════════════════════ */
function DiscountRibbon({ pct }) {
  if (!pct) return null;
  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col items-center">
      <div
        className="w-10 flex flex-col items-center pt-1.5 pb-0 text-white text-[10px] font-extrabold leading-tight"
        style={{
          background: "linear-gradient(135deg,#c8960c,#f5c518)",
          clipPath: "polygon(0 0,100% 0,100% 80%,50% 100%,0 80%)",
          minHeight: "44px",
        }}
      >
        <span>{pct}%</span>
        <span>Off</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HOVER ACTION BUTTON
══════════════════════════════════════════ */
function ActionBtn({ icon, label, onClick }) {
  const [tip, setTip] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        className="w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-[#629d23] hover:text-white cursor-pointer flex items-center justify-center shadow transition-all duration-200 active:scale-90"
      >
        {icon}
      </button>
      {tip && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none z-30">
          {label}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   QUANTITY SELECTOR
══════════════════════════════════════════ */
function QtySelector({ value, onChange }) {
  return (
    <div className="flex items-center border border-gray-300 rounded overflow-hidden h-9">
      <span className="px-2.5 text-sm font-semibold text-gray-700 select-none min-w-[2rem] text-center">{value}</span>
      <div className="flex flex-col border-l border-gray-300">
        <button onClick={() => onChange(value + 1)}
          className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-500 transition-colors border-b border-gray-300 flex items-center justify-center">
          <ChevronUp />
        </button>
        <button onClick={() => onChange(Math.max(1, value - 1))}
          className="px-1.5 py-0.5 hover:bg-gray-100 text-gray-500 transition-colors flex items-center justify-center">
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   STAR RATING
══════════════════════════════════════════ */
function StarRating({ rating = 4 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= Math.round(rating)} />)}
    </div>
  );
}

/* ══════════════════════════════════════════
   NO RECORDS FOUND
══════════════════════════════════════════ */
function NoProductsFound({ category }) {
  return (
    <div className="col-span-4 flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative flex items-center justify-center mb-6" style={{ width: 120, height: 120 }}>
        <div className="absolute inset-0 rounded-full" style={{ border: "2px dashed #d1d5db" }} />
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(98,157,35,0.07)" }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect x="6" y="14" width="24" height="20" rx="3" stroke="#629d23" strokeWidth="1.8" fill="rgba(98,157,35,0.08)" />
            <path d="M6 20h24" stroke="#629d23" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M6 14 Q18 10 30 14" stroke="#629d23" strokeWidth="1.5" fill="none" />
            <circle cx="32" cy="32" r="6" stroke="#9ca3af" strokeWidth="1.8" fill="white" />
            <line x1="36.2" y1="36.2" x2="40" y2="40" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="30" x2="34" y2="34" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="34" y1="30" x2="30" y2="34" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <h3 className="text-[18px] font-bold text-gray-700 mb-2">No products found</h3>
      <p className="text-[14px] text-gray-400 max-w-xs leading-relaxed mb-6">
        {category
          ? `We couldn't find any products in "${category}" right now. Check back soon or explore another category.`
          : "No products are available at the moment. Please check back later."}
      </p>
      <a
        href="/shop"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-md active:scale-95"
        style={{ background: GREEN }}
      >
        Browse All Products <ArrowRight />
      </a>
    </div>
  );
}

/* ══════════════════════════════════════════
   QUICK VIEW MODAL
══════════════════════════════════════════ */
function QuickViewModal({ product, onClose, onAddToCart, onAddToWishlist }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const image = resolveImage(product.imageKey);
  const discountedPrice = product.discount
    ? (product.originalPrice * (1 - product.discount / 100)).toFixed(2)
    : Number(product.price).toFixed(2);

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
        style={{ animation: "modalIn 0.25s cubic-bezier(.16,1,.3,1) both" }}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
          <XIcon />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 flex items-center justify-center p-8 rounded-tl-2xl rounded-bl-2xl min-h-[300px]">
            <img src={image} alt={product.name} className="max-h-64 w-full object-contain"
              onError={e => { e.target.src = "https://placehold.co/300x300/f5f5f5/999?text=Product"; }} />
          </div>

          <div className="p-8 flex flex-col gap-3">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">{product.name}</h2>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-400">(0 reviews)</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-extrabold" style={{ color: GREEN }}>${discountedPrice}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-base text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="text-sm font-semibold text-orange-500">{product.discount}% Off</span>
                </>
              )}
            </div>
            {product.pack && <p className="text-sm text-gray-500">Pack: <span className="font-medium text-gray-700">{product.pack}</span></p>}
            <p className="text-sm text-gray-500">SKU: <span className="font-medium text-gray-700">{product.sku}</span></p>
            {product.description && <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>}
            <p className="text-sm">
              <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
              </span>
            </p>
            <div className="flex items-center gap-3 mt-1">
              <QtySelector value={qty} onChange={setQty} />
              <button onClick={() => { onAddToCart(product, qty); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-white font-bold rounded-lg text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ background: GREEN }}>
                Add to Cart <CartIcon />
              </button>
            </div>
            <button onClick={() => onAddToWishlist(product)}
              className="flex items-center justify-center gap-2 w-full py-2.5 border-2 text-sm font-bold rounded-lg transition-all hover:bg-gray-50 active:scale-95"
              style={{ borderColor: GREEN, color: GREEN }}>
              <HeartIcon /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   COMPARE MODAL
══════════════════════════════════════════ */
function CompareModal({ products, onClose }) {
  if (!products || products.length === 0) return null;

  const fields = [
    { label: "Price",          fn: p => `$${p.discount ? (p.originalPrice * (1 - p.discount / 100)).toFixed(2) : p.price}` },
    { label: "Original Price", fn: p => `$${p.originalPrice || p.price}` },
    { label: "Discount",       fn: p => `${p.discount || 0}%` },
    { label: "Pack / Unit",    fn: p => p.pack || "—" },
    { label: "Rating",         fn: p => p.rating ? `${p.rating} / 5` : "—" },
    { label: "SKU",            fn: p => p.sku || "—" },
    { label: "Stock",          fn: p => p.stock != null ? (p.stock > 0 ? `${p.stock} units` : "Out of Stock") : "—" },
  ];

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
        style={{ animation: "modalIn 0.25s cubic-bezier(.16,1,.3,1) both" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Product Comparison</h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
            <XIcon />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `160px repeat(${products.length}, 1fr)` }}>
            <div />
            {products.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100">
                  <img src={resolveImage(p.imageKey)} alt={p.name} className="w-full h-full object-contain p-2"
                    onError={e => { e.target.src = "https://placehold.co/96x96/f5f5f5/999?text=P"; }} />
                </div>
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">{p.name}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-100">
            {fields.map((field, fi) => (
              <div key={fi}
                className={`grid items-center gap-4 px-4 py-3 ${fi % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                style={{ gridTemplateColumns: `160px repeat(${products.length}, 1fr)` }}>
                <span className="text-sm font-semibold text-gray-500">{field.label}</span>
                {products.map((p, i) => (
                  <span key={i} className="text-sm font-medium text-gray-800 text-center">{field.fn(p)}</span>
                ))}
              </div>
            ))}
          </div>
          {products.length === 1 && (
            <p className="text-center text-sm text-gray-400 mt-4">Hover another product and click Compare to add a second product.</p>
          )}
        </div>
      </div>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════ */
function ProductCard({ product, onQuickView, onCompare, onWishlistAdd, onCartAdd }) {
  const [hovered, setHovered] = useState(false);
  const [qty, setQty] = useState(1);

  const image = resolveImage(product.imageKey);
  const discountedPrice = product.discount
    ? (product.originalPrice * (1 - product.discount / 100)).toFixed(2)
    : Number(product.price).toFixed(2);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered ? "0 10px 36px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden" style={{ height: "220px" }}>
        <DiscountRibbon pct={product.discount} />
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          onError={e => { e.target.src = "https://placehold.co/300x300/f5f5f5/999?text=Product"; }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-3"
          style={{
            background: "rgba(76,174,76,0.92)",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <ActionBtn icon={<HeartIcon />}   label="Add to Wishlist" onClick={() => onWishlistAdd(product)} />
          <ActionBtn icon={<CompareIcon />} label="Compare"         onClick={() => onCompare(product)} />
          <ActionBtn icon={<EyeIcon />}     label="Quick View"      onClick={() => onQuickView(product)} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <h4 className="text-[16px] font-bold text-gray-900 leading-snug line-clamp-2">{product.name}</h4>
        <p className="text-[14px] text-gray-400">{product.pack}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[16px] font-extrabold" style={{ color: GREEN }}>${discountedPrice}</span>
          {product.discount > 0 && (
            <span className="text-[14px] text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 gap-2">
          <QtySelector value={qty} onChange={setQty} />
          <button onClick={() => onCartAdd(product, qty)}
            className="flex cursor-pointer items-center gap-1.5 border border-[#629d23] text-[#629d23] hover:bg-[#4cae4c] hover:text-white px-4 py-2 rounded text-sm font-bold transition-all duration-200 active:scale-95">
            Add <CartIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   POPULAR PRODUCTS — MAIN EXPORT
══════════════════════════════════════════ */
export default function PopularProducts({ title = "Popular Products" }) {
  const tabs = Object.keys(allProducts);
  const [active, setActive]             = useState(tabs[0]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [compareProducts, setCompareProducts]   = useState([]);
  const [showCompare, setShowCompare]           = useState(false);
  const [toast, setToast]                       = useState({ message: "", visible: false });

  const dispatch = useDispatch();

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleAddToWishlist = (product) => {
    dispatch(
      addWishlist({
        productId: product.id,
        name: product.name,
        price: parseFloat(
          product.discount
            ? (product.originalPrice * (1 - product.discount / 100)).toFixed(2)
            : product.price
        ),
        image: product.imageKey,  // ← KEY stored in DB, resolved on display
        sku: product.sku,
      })
    );
    showToast(`"${product.name.slice(0, 28)}..." added to wishlist!`);
  };

  const handleAddToCart = (product, qty = 1) => {
    dispatch(
      addCartItem({
        productId: product.id,
        name: product.name,
        price: parseFloat(
          product.discount
            ? (product.originalPrice * (1 - product.discount / 100)).toFixed(2)
            : product.price
        ),
        image: product.imageKey,  // ← KEY stored in DB, resolved on display
        qty,
      })
    );
    showToast(`"${product.name.slice(0, 28)}..." added to cart!`);
  };

  const handleCompare = (product) => {
    setCompareProducts(prev => {
      if (prev.find(p => p.id === product.id)) { setShowCompare(true); return prev; }
      const updated = [...prev.slice(-1), product];
      setShowCompare(true);
      return updated;
    });
  };

  const currentProducts = allProducts[active] || [];

  return (
    <section className="w-full bg-white py-10 px-4 md:px-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <style>{`
        @keyframes fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <h2 className="text-[30px] font-bold text-gray-900 tracking-tight">{title}</h2>
          <div className="flex flex-wrap items-center gap-1">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActive(tab)}
                className="px-3 py-1.5 text-[16px] cursor-pointer font-semibold transition-all duration-200"
                style={{
                  color: active === tab ? GREEN : "#6b7280",
                  background: active === tab ? "rgba(98,157,35,0.08)" : "transparent",
                  borderBottom: active === tab ? `2px solid ${GREEN}` : "2px solid transparent",
                  borderRadius: 0,
                }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          key={active}
          style={{ animation: "fadeSlide 0.25s ease both" }}
        >
          {currentProducts.length === 0 ? (
            <NoProductsFound category={active} />
          ) : (
            currentProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                onCompare={handleCompare}
                onWishlistAdd={handleAddToWishlist}
                onCartAdd={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      )}

      {showCompare && (
        <CompareModal products={compareProducts} onClose={() => setShowCompare(false)} />
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
}
