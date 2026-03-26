

export const MOCK_ORDERS = [
  {
    id: "#1357", date: "March 15, 2020", status: "Processing", total: 125.00, itemCount: 2,
    items: [
      { name: "Organic Fresh Salad Mix", qty: 1, price: 65.00, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&q=80" },
      { name: "Premium Mango Juice 1L", qty: 2, price: 30.00, image: "https://images.unsplash.com/photo-1534353473418-4cfa0cd45f78?w=80&q=80" },
    ],
    shipping: "3522 Interstate 75 Business Spur, Sault Ste. Marie, MI 49783",
    payment: "Credit Card ending in 4242",
  },
  {
    id: "#2468", date: "June 29, 2020", status: "Completed", total: 364.00, itemCount: 5,
    items: [
      { name: "Foster Farms Nuggets Chicken", qty: 3, price: 108.00, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=80&q=80" },
      { name: "Green salad diet pack fresh daily", qty: 2, price: 44.00, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&q=80" },
    ],
    shipping: "3522 Interstate 75 Business Spur, Sault Ste. Marie, MI 49783",
    payment: "PayPal",
  },
  {
    id: "#2366", date: "August 02, 2020", status: "Completed", total: 280.00, itemCount: 3,
    items: [
      { name: "Wild salmon fillet premium quality", qty: 2, price: 110.00, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&q=80" },
      { name: "Whole grain artisan bread loaf", qty: 1, price: 60.00, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&q=80" },
    ],
    shipping: "3522 Interstate 75 Business Spur, Sault Ste. Marie, MI 49783",
    payment: "Credit Card ending in 1234",
  },
];


export const TRACKING_STEPS = [
  { id: 1, label: "Order Placed",         desc: "Your order has been received",                  icon: "📦" },
  { id: 2, label: "Order Confirmed",      desc: "Seller has confirmed your order",               icon: "✅" },
  { id: 3, label: "Packed & Ready",       desc: "Your items are packed and ready to ship",       icon: "📫" },
  { id: 4, label: "Shipped",             desc: "Order picked up by courier partner",             icon: "🚚" },
  { id: 5, label: "In Transit – Hub",     desc: "Package arrived at regional sorting hub",       icon: "🏭" },
  { id: 6, label: "Out for Delivery",     desc: "Courier is on the way to your address",        icon: "🏍️" },
  { id: 7, label: "Delivered",           desc: "Package delivered to your doorstep",            icon: "🎉" },
];

export const STATIC_ADDRESS = {
  billing: {
    line1: "3522 Interstate",
    line2: "75 Business Spur,",
    line3: "Sault Ste.",
    city: "Marie, MI 49783",
    country: "New York",
  },
  shipping: {
    line1: "3522 Interstate",
    line2: "75 Business Spur,",
    line3: "Sault Ste.",
    city: "Marie, MI 49783",
    country: "New York",
  },
};